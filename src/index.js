// https://clarifai.com/developer/guide/predict#images
// https://github.com/Clarifai/clarifai-javascript
// https://clarifai.com/developer/account/applications
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