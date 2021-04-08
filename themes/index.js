

import { default as AbstractTheme } from "./theme.js"
import { default as StarfinderTheme } from "./specs/starfinder.js";
import { default as NeonTheme } from "./specs/neon.js";
import { default as TerminalAmberTheme } from "./specs/terminal_amber.js";
import { default as TerminalCyanTheme } from "./specs/starfinder.js";
import { default as TerminalGreenTheme } from "./specs/starfinder.js";
import { default as IllusiveManTheme } from "./specs/starfinder.js";
import { default as UnitologistTheme } from "./specs/starfinder.js";

export { default as Theme } from "./theme.js"

export const Themes = {
    core: AbstractTheme,
    starfinder: StarfinderTheme,
    neon: NeonTheme,
    terminal_amber: TerminalAmberTheme,
    terminal_cyan: TerminalCyanTheme,
    terminal_green: TerminalGreenTheme,
    illusive_man: IllusiveManTheme,
    unitologist: UnitologistTheme
}