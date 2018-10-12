import Controls from '../../components/Controls/Controls';
import ImageHolder from '../../components/ImageHolder/ImageHolder';
import TrimBase64 from '../../helpers/TrimBase64';
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
        this.predict(this.appModel, bytes)
            .then(
                response => {
                    console.log('Response', response)
                }
            )
            .catch(
                error => console.log(error);
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
        console.log('Render Face Recognition');
        this.bootstrap.append(this.addCanvas);
        this.bootstrap.addEventListener('change', this.onChange);

        // this.predict(this.appModel, 'https://face-negotiationtheory.weebly.com/uploads/4/2/1/6/4216257/1771161.jpg')
        //     .then(
        //         response => {
        //             console.log('Response', response)
        //         },
        //         error => {
        //             console.log('error', error)
        //         }
        //     )
    }
}

export default FaceRecognition;