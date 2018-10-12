import FileInput from './FileInput/FileInput';
import * as CONSTANTS from '../../helpers/ConstantVars';
import classes from './Controls.css';

const controls = () => {

    return `<header class="${ classes.Header }">
                <hgroup class="${ classes.HeaderTitles }">
                    <h1 class="${ classes.Title }">How Many Faces?</h1>
                    <h2 class="${ classes.CountTitle }">Currently <span id="${ CONSTANTS.FACE_COUNT }" class="${ classes.Highlight }">0</span> Face(s)</h2>
                </hgroup>
                <div class="${ classes.Controls }">
                    ${ FileInput() }
                </div>
            </header>`;
}

export default controls;