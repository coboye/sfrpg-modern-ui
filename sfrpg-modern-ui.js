import { SettingsProvider } from "./module/settings.js";
import { Constants} from "./module/constants.js";
import { UIEngine} from "./module/engine.js";

Hooks.once('init', async function () {
    console.log(Constants.LOGGERNAME + '| Initializing ' + Constants.MODULENAME);
    SettingsProvider.initialize();        
    UIEngine.initialize();
});

Hooks.on("renderSettingsConfig", (sheet, html, data) => {
    SettingsProvider.watch();    
})
