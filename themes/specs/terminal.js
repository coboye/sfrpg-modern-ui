import { Color, ColorStep, LinearGradient } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme{

    constructor(){
        super("terminal");        

        this.colorPrimary = new Color("#39C21D");
        this.colorPrimaryLight = new Color("#4AF626");
        this.colorPrimaryVariant = new Color("#407535");
        this.colorPrimaryGradient = new LinearGradient("25deg", [new ColorStep("#407535", "0%"), new ColorStep("#39C21D", "40%"), new ColorStep("#4AF626", "60%"), new ColorStep("#407535", "100%")]);

        this.colorSecondary = new Color("#86F76F");
        this.colorSecondaryLight = new Color("#d6ffce");
        this.colorSecondaryGradient = new LinearGradient("25deg", [new ColorStep("#000e02", "0%"), new ColorStep("#227512", "40%"), new ColorStep("#86F76F", "60%"), new ColorStep("#000e02", "100%")]);

        this.colorSelection = new Color("#4AF626");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#000a00");
        this.colorBackground = new Color("#000a00");

        this.textOnBackground = new Color("#c8fbbd");
        this.textOnPrimary = new Color("#0a3f00");
        this.textOnSecondary = new Color("#0a3f00");
        this.textOnBackgroundLight = new Color("#eeffee");
        this.textOnError = new Color("#eeffee");
        this.textOnSurface = new Color("#4AF626");
        this.textOnSelection = new Color("#ffffff");

        this.borderOnBackground = new Color("#0a3f00");
        this.borderOnBackgroundLight = new Color("#188801");
    }
    
}
