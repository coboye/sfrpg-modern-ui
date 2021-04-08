import { Constants } from "./constants.js";
import { Logger } from "./logger.js";
import { Theme, Themes } from "../themes/index.js";
import { Settings, SettingsProvider } from "./settings.js";


export class UIEngine {

    static initialize() {        
        Logger.debug("UIEngine.initialize", SettingsProvider.settings.value(Constants.Settings.theme));
        UIEngine.apply();
        //Logger.debug(new Themes.starfinder().properties);
    }
    /** 
     * @param {Settings} settings
     */
    static apply() {
        const settings = SettingsProvider.settings;
        Logger.debug("UIEngine:change", settings);
        var head = document.head;
        /**
         * @type {Theme}
         */
        const theme = new (Themes[settings.value(Constants.Settings.theme)] || Themes.core)().apply(settings);      
        const title = `${Constants.MODULENAME}-${Constants.Settings.theme}`;
        const link = `link[rel="stylesheet"][title="${title}"]`

        let stylesheet = head.querySelector(`${link}`);
        if (!stylesheet) {
            stylesheet = document.createElement("link");
            stylesheet.type = "text/css";
            stylesheet.rel = "stylesheet";
            stylesheet.href = `modules/${Constants.MODULENAME}/css/main.css`;
            stylesheet.setAttribute('title', title);
            stylesheet.disabled = theme.core;
            head.appendChild(stylesheet);
        } else {
            
            stylesheet.disabled = theme.core;
        }
        Logger.debug("UIEngine:change", "stylesheet.disabled ", stylesheet.disabled, theme.toString() );
        if (!theme.core) {
            UIEngine.inject(theme);
        }
    }
    

    /**
     * 
     * @param {Theme} theme 
     */
    static inject(theme) {
        Logger.debug("UIEngine:inject", theme);
        if(!theme.core){
            let root = document.documentElement;
            const properties = theme.properties;
            Object.keys(properties).forEach(key => {
                const val = properties[key];
                root.style.setProperty('--sfmod-' + key, val);
                //Logger.debug(':root --sfmod-' + key, val);
            })
        }
    }

    constructor() {
    }

}

