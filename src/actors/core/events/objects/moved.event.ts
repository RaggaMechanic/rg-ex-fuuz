import { Vector } from 'excalibur';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export type MovedEvent = Vector;

export interface MovedActorEventInstance extends EventInstance {
  type: 'moved';
  event: MovedEvent;
}

export interface MovedActorEventHandlerInstance extends BaseEventHandlerInstance<MovedEvent> {
  type: 'moved';
}
