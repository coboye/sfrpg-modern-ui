import { Constants } from "./constants.js";
import { Logger } from "./logger.js";
import { Theme, Themes, Integrations} from "../themes/index.js";
import { Settings, SettingsProvider } from "./settings.js";


export class UIEngine {

    static initialize() {        
        Logger.debug("UIEngine.initialize", SettingsProvider.settings.value(Constants.Settings.theme));
        UIEngine.apply();
    }
    /** 
     * @param {Settings} settings
     */
    static apply() {
        const settings = SettingsProvider.settings;
        Logger.debug("UIEngine:change", settings);
        /**
         * @type {Theme}
         */
        const theme = new (Themes[settings.value(Constants.Settings.theme)] || Themes.core)().apply(settings);      
        const title = `${Constants.MODULENAME}-${Constants.Settings.theme}`;
        const link = `link[rel="stylesheet"][title="${title}"]`;

        document.body.classList[theme.compactMode ?  'add': 'remove']("sfmod-compact");

        let stylesheet = document.head.querySelector(`${link}`);
        if (!stylesheet) {
             [...game.modules.values()].filter(mod => mod.active).map(mod => mod.id).forEach(mod =>{
                 if(Integrations.includes(mod)){
                   let modstylesheet = document.createElement("link");
                   modstylesheet.type = "text/css";
                   modstylesheet.rel = "stylesheet";
                   modstylesheet.href = `modules/${Constants.MODULENAME}/css/mods/${mod}.css`;                  
                   modstylesheet.disabled = theme.core;
                   modstylesheet.media = "all";
                   modstylesheet = document.head.appendChild(modstylesheet);
                   modstylesheet.setAttribute('data-sfmod', mod);
                 }
            });
            stylesheet = document.createElement("link");
            stylesheet.type = "text/css";
            stylesheet.rel = "stylesheet";
            stylesheet.href = `modules/${Constants.MODULENAME}/css/main.css`;
            stylesheet.setAttribute('title', title);
            stylesheet.disabled = theme.core;
            stylesheet.media = "all";
            document.head.appendChild(stylesheet);
          
        } else {
            stylesheet.disabled = theme.core;
            try{
                document.head.querySelectorAll(`link[rel="stylesheet"][data-sfmod]:not([data-sfmod=""]`).forEach(mod => mod.disabled = theme.core)
            }catch(e){}
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
            })
        }
    }

    constructor() {
    }

}

