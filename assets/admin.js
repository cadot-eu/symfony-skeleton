const $ = require("jquery");
global.$ = global.jQuery = $;
import "bootstrap";

import "bootstrap/dist/css/bootstrap.css";

require("@fortawesome/fontawesome-free/css/all.min.css");
require("@fortawesome/fontawesome-free/js/all.js");

// start the Stimulus application
//import "./bootstrap";
import "./styles/app.scss";
import "./styles/admin.scss";

require("../assets/js/bigpicture")
require("../assets/js/customfileinput")
require("../assets/js/flash_message")
require("../assets/js/template.js")
require("../assets/js/bigpicture.js")

import a2lix_lib from './js/collection.min';
a2lix_lib.sfCollection.init({
    collectionsSelector: 'form div[data-prototype]',
    manageRemoveEntry: true,
    lang: {
        add: 'Ajouter',
        remove: 'Retirer'
    }
})
