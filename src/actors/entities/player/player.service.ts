import { Actor, Vector, CollisionStartEvent } from 'excalibur';
import { Emitter } from '../../core/emitor';
import { Bullet } from '../bullet/bullet';
import { PlayerArgs } from './player.interfaces';
import {
  PLAYER_DEATH_ROTATION,
  DEFAULT_PLAYER_ARGS,
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_HEIGHT,
  DEFAULT_PLAYER_WIDTH,
  PLAYER_ANIMATION_SPEED,
  PLAYER_COLOR,
  PLAYER_START_POSITION,
} from './player.constants';
import {
  DamageActorEventHandlerInstance,
  DamageEvent,
  DamageEventInstance,
} from '../../core/events/objects/damage.event';

export class Player extends Actor {
  public health: number;
  public velocity: number;

  constructor(public readonly savedOpts: PlayerArgs = DEFAULT_PLAYER_ARGS) {
    super({
      pos: PLAYER_START_POSITION,
      width: DEFAULT_PLAYER_WIDTH,
      height: DEFAULT_PLAYER_HEIGHT,
      color: DEFAULT_PLAYER_COLOR,
    });

    this.velocity = this.savedOpts.velocity;
    this.health = this.savedOpts.health;

    // TODO: damage - это видимо общее свойство с типичным обработчиком - должно быть в базовом
    const damageHandlerInstance: DamageActorEventHandlerInstance = {
      type: 'damage',
      handler: (event: DamageEvent): void => {
        const bullet = event.bullet;
        this.health -= bullet.damage;
        if (this.health <= 0) {
          // emit die to scene
          new Emitter(this.scene).emitEvent({
            type: 'kill-unit',
            event: {
              unit: this,
              killer: bullet.bulletOwner,
              bullet,
            },
          });
          this.die();
          return;
        }

        // TODO: висящий в воздухе Promise, никто его не дожидается
        this.actions.meet(bullet.bulletOwner, this.velocity).toPromise();
      },
    };
    new Emitter(this).addEvent(damageHandlerInstance);
  }

  public die() {
    this.color = PLAYER_COLOR;
    this.actions.clearActions();
    this.actions.rotateBy(PLAYER_DEATH_ROTATION, PLAYER_ANIMATION_SPEED).die();
  }

  public shoot(target: Vector): void {
    if (!target) return;

    // TODO: Возможно нужна фабрика для bullet, которая будет сразу вешать последующее событие
    const bullet = new Bullet(this.pos, target, this);
    new Emitter(bullet).addEvent({
      type: 'collisionstart',
      handler: (event: CollisionStartEvent) => {
        if (event.other.id !== this.id) {
          // emit damage to target
          const damageEvent: DamageEventInstance = { type: 'damage', event: { bullet } };
          new Emitter(event.other).emitEvent(damageEvent);
          bullet.die();
        }
      },
    });
    this.scene.add(bullet);
  }
}
