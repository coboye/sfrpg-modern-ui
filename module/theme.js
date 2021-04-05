import { Constants, Settings } from "./constants.js";
import { Logger } from "./logger.js";

export const Themes = {
    core: "core",
    starfinder: "starfinder",
    neon: "neon",
    terminal_amber: "terminal-amber",
    terminal_cyan: "terminal-cyan",
    terminal_green: "terminal-green"
}

export class ThemeConfiguration {
    constructor() {
        this.backgroundAlpha = (conf(Settings.background_alpha) / 100).toFixed(2);
        this.blurRadius = conf(Settings.blur_radius) + "px";

        function conf(key) {
            return game.settings.get(Constants.MODULENAME, key)
        }
    }

    get properties() {
        return Object.keys(this).reduce((map, key) => {
            let dashed = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
            map[dashed] = this[key];
            return map;
        }, {});
    }
}

export class ThemeManager {

    static initialize() {
        const conf = game.settings.get(Constants.MODULENAME, Settings.theme);
        Logger.debug("ThemeManager.initialize", conf);
        ThemeManager.toggleStylesheet(conf || Themes.starfinder);
        ThemeManager.apply(new ThemeConfiguration());
    }

    static change(theme) {
        Logger.debug("ThemeManage:change", theme);
        ThemeManager.toggleStylesheet(theme)
    }

    static edit(property, value) {
        Logger.debug("ThemeManage:edit", property, value);
        ThemeManager.apply(new ThemeConfiguration());
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

    static toggleStylesheet(theme) {
        Logger.debug("ThemeManage:toggleStylesheet", theme);
        var head = document.head;
        var link = document.createElement("link");

        head.querySelectorAll('link[rel="stylesheet"][title="sfrpg-modern-ui-theme"]').forEach(stylesheet => stylesheet.remove());
        theme = Themes[theme] || Themes.core;

        if (theme != Themes.core) {
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = "modules/sfrpg-modern-ui/css/themes/" + theme + ".css";
            link.setAttribute('title', 'sfrpg-modern-ui-theme');
            head.appendChild(link);
        }
    }
    
    constructor() {
    }

}

