// https://clarifai.com/developer/guide/predict#images
import Clarifai from 'clarifai';
import './index.css';

const app = new Clarifai.App({
    apiKey: '0675b1655d95447b95caaf6ac602428c'
});

app.models.predict(Clarifai.FACE_DETECT_MODEL, 'https://face-negotiationtheory.weebly.com/uploads/4/2/1/6/4216257/1771161.jpg')
    .then(
        response => {
            console.log('Response', response)
        },
        error => {
            console.log('error', error)
        }
    )