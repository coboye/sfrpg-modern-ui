import { registerSettings } from "./module/settings.js";
import { Constants} from "./module/constants.js";
import { ThemeManager} from "./module/theme.js";

Hooks.once('init', async function () {
    console.log(Constants.LOGGERNAME + '| Initializing ' + Constants.MODULENAME);
    // Assign custom classes and constants here
    // Register custom module settings
    registerSettings();    
    ThemeManager.initialize();
});
