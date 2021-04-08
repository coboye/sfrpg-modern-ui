import { Color, ColorStep, LinearGradient } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme{

    constructor(){
        super("neon");        

        this.colorPrimary = new Color("#aa45cf");
        this.colorPrimaryLight = new Color("#ea00d9");
        this.colorPrimaryVariant = new Color("#772ca3");
        this.colorPrimaryGradient = new LinearGradient("25deg", [new ColorStep("#772ca3", "0%"), new ColorStep("#ea00d9", "40%"), new ColorStep("#aa45cf", "60%"), new ColorStep("#772ca3", "100%")]);

        this.colorSecondary = new Color("#03b5be");
        this.colorSecondaryLight = new Color("#0abdc6");
        this.colorSecondaryGradient = new LinearGradient("25deg", [new ColorStep("#197277", "0%"), new ColorStep("#03b5be", "40%"), new ColorStep("#059097", "60%"), new ColorStep("#197277", "100%")]);

        this.colorSelection = new Color("#ea00d9");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#091833");
        this.colorBackground = new Color("#091833");

        this.textOnBackground = new Color("#ffffff");
        this.textOnPrimary = new Color("#ffffff");
        this.textOnSecondary = new Color("#ffffff");
        this.textOnBackgroundLight = new Color("#eaeaea");
        this.textOnError = new Color("#ffffff");
        this.textOnSurface = new Color("#869096");
        this.textOnSelection = new Color("#ffffff");

        this.borderOnBackground = new Color("#91bcbe");
        this.borderOnBackgroundLight = new Color("#a0899b");
    }
    
}
