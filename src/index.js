import FaceRecognition from './containers/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import * as CONSTANTS from './helpers/ConstantVars';
import './index.css';

/*
Config Requirements:
    client: Clarafai Javascript Client,
    appModel: Clarafai Face Detect Model,
    bootstrap: DOM element the app will bootstrap to
*/

const ClarifaiFR = new FaceRecognition({ // eslint-disable-line no-unused-vars
    client : new Clarifai.App({ apiKey : CONSTANTS.API_KEY }),
    appModel : Clarifai.FACE_DETECT_MODEL,
    bootstrap : document.getElementById(CONSTANTS.APP_ROOT)
});