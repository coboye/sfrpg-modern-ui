import { Color, ColorStep, LinearGradient } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme {

    constructor() {
        super("illusive-man");

        this.colorPrimary = new Color("#fc952e");
        this.colorPrimaryLight = new Color("#ffc68c");
        this.colorPrimaryVariant = new Color("#ff6600");
        this.colorPrimaryGradient = new LinearGradient("25deg", [new ColorStep("#ff6600", "0%"), new ColorStep("#fc952e", "40%"), new ColorStep("#ffba26", "60%"), new ColorStep("#ff6600", "100%")]);

        this.colorSecondary = new Color("#00ff1d");
        this.colorSecondaryLight = new Color("#8ae494");
        this.colorSecondaryGradient = new LinearGradient("25deg", [new ColorStep("#267c30", "0%"), new ColorStep("#00ff1d", "40%"), new ColorStep("#8ae494", "60%"), new ColorStep("#267c30", "100%")]);

        this.colorSelection = new Color("#00ff1d");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#090502");
        this.colorBackground = new Color("#121212");

        this.textOnBackground = new Color("#c7c2ee");
        this.textOnPrimary = new Color("#000000");
        this.textOnSecondary = new Color("#000000");
        this.textOnBackgroundLight = new Color("#ffffff");
        this.textOnError = new Color("#ffffff");
        this.textOnSurface = new Color("#f7f2ee");
        this.textOnSelection = new Color("#ffffff");

        this.borderOnBackground = new Color("#c05711");
        this.borderOnBackgroundLight = new Color("#ec9743");
    }

}
