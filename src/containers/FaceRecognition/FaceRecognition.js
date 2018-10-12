import Controls from '../../components/Controls/Controls';
import ImageHolder from '../../components/ImageHolder/ImageHolder';
import TrimBase64 from '../../helpers/TrimBase64';
import FloatToPercent from '../../helpers/FloatToPercent';
import * as CONSTANTS from '../../helpers/ConstantVars';
import { isPresent } from '../../handlers/errors/ErrorHandlers';
import classes from './FaceRecognition.css';

class FaceRecognition {
    constructor(config){

        isPresent([
            { name: '[Config Object]', property: config },
            { name: '[Javascript Client]', property: config.hasOwnProperty('client') },
            { name: '[Client Model]', property: config.hasOwnProperty('appModel') },
            { name: '[Bootstrap Node]', property: config.hasOwnProperty('bootstrap') }
        ]);

        this.config = config;
        this.onChange = this.onChange.bind(this);
        this.render();
    }

    get bootstrap(){
        return this.config.bootstrap;
    }

    get appModel(){
        return this.config.appModel;
    }

    get addCanvas(){
        const canvas = document.createElement('main');
        canvas.setAttribute('class', classes.Canvas);
        canvas.innerHTML = Controls() + ImageHolder();

        return canvas;
    }

    removeScanningState(){
        const scanning = document.getElementsByClassName(classes.Scanning);
        scanning[0].remove();
    }

    addScanningState(){
        const holder = document.getElementById(CONSTANTS.IMAGE_HOLDER);
        const scanning = document.createElement('div');
        scanning.setAttribute('class', classes.Scanning);
        scanning.innerHTML = '<span>Scanning</span>'
        holder.append(scanning);
    }

    drawPolygons(boundingBoxes){
        const holder = document.getElementById(CONSTANTS.IMAGE_HOLDER);

        boundingBoxes.forEach((coordinates, index) => {
            const polygon = document.createElement('div');
            polygon.setAttribute('class', classes.BoundingBox);
            polygon.style.clipPath = `polygon(${ coordinates })`;
            polygon.style.zIndex = `${ 100 + index + 1 }`;
            holder.append(polygon);
        })
    }

    mapBoundingBoxes(array) {
        return array.map(box => {
            const boxObj = {
                lc: box.region_info.bounding_box.left_col,
                tr: box.region_info.bounding_box.top_row,
                rc: box.region_info.bounding_box.right_col,
                br: box.region_info.bounding_box.bottom_row
            }
            const topLeft = `${FloatToPercent(boxObj.lc)} ${FloatToPercent(boxObj.tr)},`;
            const topRight = `${FloatToPercent(boxObj.rc)} ${FloatToPercent(boxObj.tr)},`;
            const bottomRight = `${FloatToPercent(boxObj.rc)} ${FloatToPercent(boxObj.br)},`;
            const bottomLeft = `${FloatToPercent(boxObj.lc)} ${FloatToPercent(boxObj.br)}`;

            return topLeft + topRight + bottomRight + bottomLeft;
        });
    }

    setCount(array) {
        const count = document.getElementById(CONSTANTS.FACE_COUNT);
        if(array.length){
            count.innerHTML = array.length;
        } else {
            count.innerHTML = 0;
        }
    }

    predict(model = null, payload = null){
        if(!this.config.client.models.predict){
            isPresent([
                { name: '[Predict Model]', property: false }
            ])
        }
        if(!model || !payload){
            isPresent([
                { name: '[Predict Model or Payload]', property: false }
            ])
        }

        return this.config.client.models.predict(model, payload);
    }

    send(bytes){
        this.setCount([]);
        this.addScanningState();

        this.predict(this.appModel, bytes)
            .then(
                response => {
                    const regions = response.outputs[0].data.regions;
                    this.removeScanningState();
                    this.setCount(regions);
                    this.drawPolygons(this.mapBoundingBoxes(regions));
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    scan(file = null) {
        if(!file){
            isPresent([
                { name: '[Image File]', property: false }
            ])
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = event => {
            const image = new Image();
            const holder = document.getElementById(CONSTANTS.IMAGE_HOLDER);
            const imgSrc = event.target.result;

            image.onload = () => {
                holder.innerHTML = '';
                holder.style.width = `${ image.width }px`;
                holder.style.height = `${ image.height }px`;
                holder.append(image);

                this.send(TrimBase64(imgSrc));
            }

            image.src = imgSrc;
        }
    }

    onChange(event) {
        if(event.target.getAttribute('id') === CONSTANTS.IMPORT_IMG_BUTTON){
            const inputFile = event.srcElement.files[0];
            this.scan(inputFile);
        }
    }

    render(){
        this.bootstrap.append(this.addCanvas);
        this.bootstrap.addEventListener('change', this.onChange);
    }
}

export default FaceRecognition;