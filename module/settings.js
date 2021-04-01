import { Constants, Settings } from "./constants.js";
import { Logger } from "./logger.js";
import { Themes, ThemeManager } from "./theme.js";
export const registerSettings = function () {
    // Register any custom module settings here   

    /**
     * @param {String} key 
     * @param {String} attribute 
     * @returns {String}
     */
    const localize = (key, attribute) => {
        return game.i18n.localize(Constants.MODULENAME + ".settings." + key + "." + attribute);
    }

    let themes = Object.keys(Themes).reduce((map, key) => {
        map[key] = game.i18n.localize(Constants.MODULENAME + ".theme." + key) || key;
        return map;
    }, {});

    game.settings.register(Constants.MODULENAME, Settings.theme, {
        name: localize(Settings.theme, "label"),
        hint: localize(Settings.theme, "hint"),
        scope: "client",
        type: String,
        choices: themes,
        default: Themes.starfinder,
        config: true,
        onChange: ThemeManager.change
    });

    game.settings.register(Constants.MODULENAME, Settings.background_alpha, {
        name: localize(Settings.background_alpha, "label"),
        hint: localize(Settings.background_alpha, "hint"),
        scope: "client",
        type: Number,
        range: {             // If range is specified, the resulting setting will be a range slider
            min: 0,
            max: 100,
            step: 1
        },
        default: 40,
        config: true,
        onChange: (v) => ThemeManager.edit(Settings.background_alpha, v)
    });

    game.settings.register(Constants.MODULENAME, Settings.blur_radius, {
        name: localize(Settings.blur_radius, "label"),
        hint: localize(Settings.blur_radius, "hint"),
        scope: "client",
        type: Number,
        range: {
            min: 0,
            max: 50,
            step: 1
        },
        default: 10,
        config: true,
        onChange: (v) => ThemeManager.edit(Settings.blur_radius, v)
    });

};
