import { ScreenElement, vec } from 'excalibur';
import { Emitter } from '../actors/core/emitor';
import { Resources } from '../resources';

export class RButton extends ScreenElement {
  constructor(x: number, y: number) {
    super({
      pos: vec(x, y),
      width: 128,
      height: 64,
    });
  }

  onInitialize() {
    this.graphics.add('default', Resources.StartButtonBackground.toSprite());
    this.graphics.add('hover', Resources.StartButtonHovered.toSprite());

    const emitter = new Emitter(this);
    emitter.addEvent({
      type: 'pointerdown',
      handler: () => {
        console.log('pointerdown', this.graphics.getNames());
      },
    });
    emitter.addEvent({
      type: 'pointerup',
      handler: () => {
        console.log('pointerup');
      },
    });
    emitter.addEvent({
      type: 'pointerenter',
      handler: () => {
        this.graphics.show('hover');
      },
    });
    emitter.addEvent({
      type: 'pointerleave',
      handler: () => {
        this.graphics.show('default');
      },
    });
  }
}
