
import { Constants } from "./constants.js";

const Methods = {
    DEBUG: "debug",
    LOG: "log",
    ERROR: "error",
    INFO: "info",
    WARN: "warn"
}
/**
 * 
 * @param {String} method 
 * @param  {Array<any>} args 
 */
function log(method, args) {
    console[method].apply(null, args);
}

export class Logger {

    /**
     * 
     * @param {string} method 
     * @param  {...any} args 
     */

    static message(...args) {
        log(Methods.LOG, [Constants.LOGGERNAME, ...args]);
    }
    static debug(...args) {
        log(Methods.DEBUG, [Constants.LOGGERNAME, ...args]);
    }
    static error(...args) {
        log(Methods.ERROR, [Constants.LOGGERNAME, ...args]);
    }
    static warn(...args) {
        log(Methods.WARN, [Constants.LOGGERNAME, ...args]);
    }
}