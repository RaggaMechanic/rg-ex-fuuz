import { CollisionStartEvent } from 'excalibur';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export interface CollisionStartEventInstance extends EventInstance {
  type: 'collisionstart';
  event: CollisionStartEvent;
}

export interface CollisionStartActorEventHandlerInstance extends BaseEventHandlerInstance<CollisionStartEvent> {
  type: 'collisionstart';
}
