import { Actor, Color, Engine, Vector, CollisionStartEvent, vec } from 'excalibur';
import { Bullet } from './bullet';
// import { Resources } from '../../resources';

export class PlayerArgs {
  public health : number = 300;
  public velocity : number = 150;

  constructor(health : number = 300, velocity : number = 150) {
    this.velocity = velocity;
    this.health = health;
  }
}

export class Player extends Actor {

  public savedOpts : PlayerArgs;
  public health : number;
  public velocity : number;

  constructor(opts : PlayerArgs = new PlayerArgs) {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255)
    });

    this.savedOpts = opts;
    this.velocity = opts.velocity;
    this.health = opts.health;

    this.on('damage', (event) => {
      const bullet : Bullet = event['bullet'];
      this.health -= bullet.damage;
      if (this.health <= 0) {
        // emit die to scene
        this.scene.emit('kill-unit', { 
          unit: this, 
          killer: bullet.bulletOwner, 
          bullet 
        });
        this.die();
        return;
      }

      this.actions.meet(bullet.bulletOwner, this.velocity).toPromise();
    });
  }

  public die() {
    const deathAnimationSpeed = 100;
    const deathRotation = 30;

    this.color = Color.Gray;
    this.actions.clearActions();
    this.actions.rotateBy(deathRotation, deathAnimationSpeed).die();
  }

  public shoot(target : Vector) : void {
    if (target == null) 
      return;

    const bullet = new Bullet(this.pos, target, this);
    bullet.on('collisionstart', (event: CollisionStartEvent) => {
      if (event.other.id !== this.id) {
        // emit damage to target
        event.other.emit('damage', { bullet });
        bullet.die();
      }
    });
    this.scene.add(bullet);
  }
}
