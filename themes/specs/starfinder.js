import { Color, ColorStep, LinearGradient } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme {

    constructor() {
        super("starfinder");

        this.colorPrimary = new Color("#45afeb");
        this.colorPrimaryLight = new Color("#5fc4ff");
        this.colorPrimaryVariant = new Color("#1d4e8c");
        this.colorPrimaryGradient = new LinearGradient("25deg", [new ColorStep("#1d4e8c", "0%"), new ColorStep("#45afeb", "40%"), new ColorStep("#2b6abb", "60%"), new ColorStep("#1d4e8c", "100%")]);

        this.colorSecondary = new Color("#f49045");
        this.colorSecondaryLight = new Color("#efa26b");
        this.colorSecondaryGradient = new LinearGradient("25deg", [new ColorStep("#bd6e33", "0%"), new ColorStep("#f49045", "40%"), new ColorStep("#b74706", "60%"), new ColorStep("#692600", "100%")]);

        this.colorSelection = new Color("#45afeb");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#121212");
        this.colorBackground = new Color("#121212");

        this.textOnBackground = new Color("#cfcfcf");
        this.textOnPrimary = new Color("#ffffff");
        this.textOnSecondary = new Color("#ffffff");
        this.textOnBackgroundLight = new Color("#eaeaea");
        this.textOnError = new Color("#ffffff");
        this.textOnSurface = new Color("#869096");
        this.textOnSelection = new Color("#ffffff");

        this.borderOnBackground = new Color("#475258");
        this.borderOnBackgroundLight = new Color("#7a7971");
    }

}
