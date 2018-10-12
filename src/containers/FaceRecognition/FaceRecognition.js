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

        console.log(config);

        this.config = config;

        this.state = {
            messages: [],
            messagesUI: [],
            pageToken: null,
            loading: true
        }
        this.render();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
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
        //section.innerHTML = this.buildMessageUI(messages);

        return canvas;
        //return `<div class="${ classes.Canvas }"></div>`
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

    

    render(){
        console.log('Render Face Recognition');
        this.bootstrap.append(this.addCanvas);

        this.predict(this.appModel, 'https://face-negotiationtheory.weebly.com/uploads/4/2/1/6/4216257/1771161.jpg')
            .then(
                response => {
                    console.log('Response', response)
                },
                error => {
                    console.log('error', error)
                }
            )
    }
}

export default FaceRecognition;