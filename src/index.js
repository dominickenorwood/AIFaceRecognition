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

/*<input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png">
  <div id="canvas"></div>
  <script>
    const upload = document.getElementById('file-upload');
    const canvas = document.getElementById('canvas');

    upload.addEventListener('change', event => {
      const file = event.srcElement.files[0]
      if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const renderedImg = new Image();
          renderedImg.onload = (event) => {
            canvas.innerHTML = '';
            console.log(renderedImg.width, 'x', renderedImg.height)
            console.log(event.target);
            canvas.append(renderedImg);
          }
          renderedImg.src = event.target.result
          // const trimLength = reader.result.indexOf('base64');
          // const trimedResult = reader.result.slice(trimLength + 7)
          // renderedImg.src = trimedResult;
        }
    }
  })
<\/script>*/