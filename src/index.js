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
  <script>
    const upload = document.getElementById('file-upload');
    upload.addEventListener('change', event => {
      var reader = new FileReader();
       reader.readAsDataURL(event.srcElement.files[0]);
       reader.onload = function () {
       var fileContent = reader.result;
        var getIndex = fileContent.indexOf('base64');
       console.log('base64', getIndex);
       console.log('You uploaded a file', fileContent.slice(getIndex + 7));
     }
    })
  </script>*/