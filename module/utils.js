import { Constants } from "./constants.js";
import { Logger } from "./logger.js";

export const Utils = {
    camelToDash: (camel) =>{
        return camel && camel.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    },
    dashToCamel: (dash) =>{
        return dash && dash.replace(/_([a-z])/g, m => m[1].toUpperCase());;
    },
    localize:(key) => {
        key = Constants.MODULENAME + "." + key;
        try {
            return (game && game.i18n.localize(key));   
        } catch (error) {
            Logger.warn(`cannot localize "${key}"`, error)
            return null;
        }

    }
}