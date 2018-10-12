// https://clarifai.com/developer/guide/predict#images
// https://github.com/Clarifai/clarifai-javascript
// https://clarifai.com/developer/account/applications
import FaceRecognition from './containers/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import * as CONSTANTS from './helpers/ConstantVars';
import './index.css';

const ClarifaiFR = new FaceRecognition({ // eslint-disable-line no-unused-vars
    client : new Clarifai.App({ apiKey : CONSTANTS.API_KEY }),
    appModel : Clarifai.FACE_DETECT_MODEL,
    bootstrap : document.getElementById(CONSTANTS.APP_ROOT)
});