import Viewer from 'viewerjs';

import 'viewerjs/dist/viewer.css'
import '../style/site.less';

document.querySelectorAll('img')
        .forEach((img) => new Viewer(img));

