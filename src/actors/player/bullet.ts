import { Actor, Color, vec, Vector } from 'excalibur';
// import { Resources } from '../../resources';

export class Bullet extends Actor {

  public velocity : number = 650;
  public distance : number = 300;
  public damage : number = 100;

  constructor(pos : Vector, targetPos : Vector = vec(1, 0)) {
    super({
      pos: pos,
      width: 5,
      height: 5,
      color: Color.Yellow
    });

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
    this.actions
      .callMethod(() => this.color = Color.Orange)
      .scaleBy(vec(0, 10), 200)
      .callMethod(() => this.color = Color.Red).die();
  }
}
