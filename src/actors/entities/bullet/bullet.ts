import { Actor, CollisionType, Vector } from 'excalibur';
import { Maybe } from '../../core/common/common.types';
import { Player } from '../player/player.service';
import {
  DEFAULT_BULLET_DAMAGE,
  DEFAULT_BULLET_DISTANCE,
  DEFAULT_BULLET_VELOCITY,
  DEFAULT_BULLET_TARGET_POS,
  DEFAULT_BULLET_HEIGHT,
  DEFAULT_BULLET_WIDTH,
  DEFAULT_BULLET_COLOR,
} from './bullet.constants';
// import { Resources } from '../../resources';

export class Bullet extends Actor {
  public velocity = DEFAULT_BULLET_VELOCITY;
  public distance = DEFAULT_BULLET_DISTANCE;
  public damage = DEFAULT_BULLET_DAMAGE;
  public bulletOwner: Player;
  public bulletType: Maybe<any>; // todo: realese bullet type

  constructor(pos: Vector, targetPos: Vector = DEFAULT_BULLET_TARGET_POS, owner: Player) {
    super({
      pos: pos,
      width: DEFAULT_BULLET_WIDTH,
      height: DEFAULT_BULLET_HEIGHT,
      color: DEFAULT_BULLET_COLOR,
    });

    this.bulletOwner = owner;
    // calc shoot point
    const shootVector = targetPos.sub(pos).normalize().scaleEqual(this.distance);
    const target = pos.add(shootVector);

    // if distance to cursor lower then distance to target, use cursor position
    if (pos.distance(target) > pos.distance(targetPos)) target.setTo(targetPos.x, targetPos.y);

    this.actions.moveTo(target, this.velocity).die();
  }

  public die() {
    this.actions.clearActions();
    // this.actions.die();
    // hit effect:
    this.body.collisionType = CollisionType.PreventCollision;
    this.actions.die();
  }
}
