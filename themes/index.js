

import { default as AbstractTheme } from "./theme.js"
import { default as StarfinderTheme } from "./specs/starfinder.js";
import { default as NeonTheme } from "./specs/neon.js";
import { default as TerminalTheme } from "./specs/terminal.js";
import { default as IllusiveManTheme } from "./specs/illusive-man.js";
import { default as UnitologistTheme } from "./specs/unitologist.js";

export { default as Theme } from "./theme.js"

export const Themes = {
    core: AbstractTheme,
    starfinder: StarfinderTheme,
    neon: NeonTheme,
    terminal: TerminalTheme,
    illusive_man: IllusiveManTheme,
    unitologist: UnitologistTheme
}