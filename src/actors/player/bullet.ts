import { Actor, Color, CollisionType, Vector, vec } from 'excalibur';
import { Player } from './player';
// import { Resources } from '../../resources';

export class Bullet extends Actor {

  public velocity : number = 650;
  public distance : number = 300;
  public damage : number = 100;
  public bulletOwner : Player = null;
  public bulletType : any = null; // todo: realese bullet type

  constructor(pos : Vector, targetPos : Vector = vec(1, 0), owner : Player = null) {
    super({
      pos: pos,
      width: 5,
      height: 5,
      color: Color.Yellow,

    });

    this.bulletOwner = owner;
    // calc shoot point
    const shootVector = targetPos.sub(pos).normalize();
    shootVector.size = this.distance;
    const target = pos.add(shootVector);

    // if distance to cursor lower then distance to target, use cursor position
    if (pos.distance(target) > pos.distance(targetPos))
      target.setTo(targetPos.x, targetPos.y);

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
