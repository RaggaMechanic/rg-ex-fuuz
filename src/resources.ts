import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import startButtonBg from './images/ui/btn-start-bg.png';
import startButtonBgHover from './images/ui/btn-start-bg-hover.png';
/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    StartButtonBackground: new ImageSource(startButtonBg),
    StartButtonHovered: new ImageSource(startButtonBgHover),
}

export { Resources }
