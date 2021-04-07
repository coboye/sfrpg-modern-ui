import { Constants, Settings } from "./constants.js";
import { Logger } from "./logger.js";

export const Themes = {
    core: "core",
    starfinder: "starfinder",
    neon: "neon",
    terminal_amber: "terminal-amber",
    terminal_cyan: "terminal-cyan",
    terminal_green: "terminal-green",
    illusive_man: "illusive-man",
    unitologist: "unitologist"
}

export class ThemeConfiguration {
    constructor() {
        this._backgroundAlpha = (conf(Settings.background_alpha) / 100).toFixed(2);
        this._blurRadius = conf(Settings.blur_radius) + "px";

        function conf(key) {
            return !!game && !!game.settings && game.settings.get(Constants.MODULENAME, key);
        }
    }
    /**
     * 
     * @param {String} key 
     * @param {String} value 
     */
    setProperty(key, value) {
        this[key.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); })] = value;
    }
    
    set backgroundAlpha(value) {
        Logger.debug("ThemeConfiguration.backgroundAlpha", value);
        value = parseFloat(value);
        if (!isNaN(value)) {
            if (value > 1.0) {
                value = value / 100;
            }
            this._backgroundAlpha = value.toFixed(2);
        }
    }

    set blurRadius(value) {
        Logger.debug("ThemeConfiguration.blurRadius", value);
        value = parseInt(value);
        if (!isNaN(value)) {
            this._blurRadius = value + "px";
        }
    }

    get properties() {
        return Object.keys(this).reduce((map, key) => {
            let dashed = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
            map[dashed.replace(/^_/, '')] = this[key];
            return map;
        }, {});
    }

}

/**
 * @type {ThemeConfiguration}
 */
let themeConfiguration = new ThemeConfiguration();
export class ThemeManager {

    static initialize() {
        const conf = game.settings.get(Constants.MODULENAME, Settings.theme);
        Logger.debug("ThemeManager.initialize", conf);
        ThemeManager.toggleStylesheet(conf || Themes.starfinder);
        themeConfiguration = new ThemeConfiguration();
        ThemeManager.apply(themeConfiguration);
    }
    /**
     * 
     * @param {String} theme 
     */
    static change(theme) {
        Logger.debug("ThemeManage:change", theme);
        ThemeManager.toggleStylesheet(theme)
    }

    /**
     * 
     * @param {String} property 
     * @param {String} value 
     */
    static edit(property, value) {
        Logger.debug("ThemeManage:edit", property, value);
        themeConfiguration.setProperty(property, value);
        ThemeManager.apply(themeConfiguration);
    }

    /**
     * 
     * @param {ThemeConfiguration} themeConfiguration
     */
    static apply(themeConfiguration) {
        Logger.debug("ThemeManage:apply", themeConfiguration);
        let root = document.documentElement;
        const properties = themeConfiguration.properties;
        Object.keys(properties).forEach(key => {
            const val = properties[key];
            root.style.setProperty('--sfmod-config-' + key, val);
            Logger.debug(':root --sfmod-config-' + key, val);
        })
    }
    /**
     * 
     * @param {String} theme 
     */
    static toggleStylesheet(theme) {
        Logger.debug("ThemeManage:toggleStylesheet", theme);
        var head = document.head;
        const title = `${Constants.MODULENAME}-${Settings.theme}`;
        const link = `link[rel="stylesheet"][title="${title}"]`
        theme = Themes[theme] || Themes.core;
        if (theme != Themes.core) {
            let stylesheet = head.querySelector(`${link}[data-theme-name="${theme}"]`);
            if (!stylesheet) {
                stylesheet = document.createElement("link");
                stylesheet.type = "text/css";
                stylesheet.rel = "stylesheet";
                stylesheet.href = `modules/${Constants.MODULENAME}/css/themes/${theme}.css`;
                stylesheet.setAttribute('title', title);
                stylesheet.setAttribute('data-theme-name', theme);
                head.appendChild(stylesheet);
            } else {
                stylesheet.disabled = false;
            }
        }
        head.querySelectorAll(`${link}:not([data-theme-name="${theme}"])`).forEach(stylesheet => stylesheet.disabled = true);
    }

    constructor() {
    }

}

