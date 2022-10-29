import { GameEvent, EventType } from './events.types';

export interface EventInstance {
  type: EventType;
  event: GameEvent;
}

export interface BaseEventHandlerInstance<T extends GameEvent> {
  type: EventType;
  handler: (event: T) => void;
}
