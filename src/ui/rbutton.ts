import { ScreenElement, vec } from 'excalibur';
import { Resources } from '../resources';

export class RButton extends ScreenElement {
  constructor(x: number, y: number) {
    super({
      pos: vec(x, y),
      width: 128,
      height: 64,
    })
  }

  onInitialize() {
    this.graphics.add('default', Resources.StartButtonBackground.toSprite());
    this.graphics.add('hover', Resources.StartButtonHovered.toSprite());

    this.on('pointerdown', () => {
      console.log('pointerdown', this.graphics.getNames());
    });
    this.on('pointerup', () => {
      console.log('pointerup');
    });
    this.on('pointerenter', () => { 
      this.graphics.show('hover');
    });
    this.on('pointerleave', () => {
      this.graphics.show('default');
    });
  }
}