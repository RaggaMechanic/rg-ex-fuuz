import { Bullet } from '../../../entities/bullet/bullet';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export interface DamageEvent {
  bullet: Bullet;
}

export interface DamageEventInstance extends EventInstance {
  type: 'damage';
  event: DamageEvent;
}

export interface DamageActorEventHandlerInstance extends BaseEventHandlerInstance<DamageEvent> {
  type: 'damage';
}
