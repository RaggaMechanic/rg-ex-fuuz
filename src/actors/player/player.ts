import { Actor, Color, Engine, Input, CollisionStartEvent, vec } from 'excalibur';
import { Bullet } from './bullet';
// import { Resources } from '../../resources';

export class Player extends Actor {

  public health : number = 300;
  public velocity : number = 150;

  constructor() {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255)
    });

    this.on('damage', (event) => {
      this.health -= event['bullet'].damage;
      if (this.health <= 0) {
        this.actions.clearActions();
        this.color = Color.Gray;
        this.actions.rotateBy(30, 130).die();
        this.scene.emit('kill-unit', { unit: this });
      }
    });
  }

  public shoot() : void {
    const pointer = this.scene.engine.input.pointers.primary.lastWorldPos;
    if (pointer != null) {
      const bullet = new Bullet(this.pos, pointer);
      bullet.on('collisionstart', (event: CollisionStartEvent) => {
        if (event.other.id !== this.id) {
          event.other.emit('damage', { bullet });
          bullet.die();
        }
      });
      this.scene.add(bullet);
    }
  }
}
