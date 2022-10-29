import { Eventable, GameEvent } from 'excalibur';
import { Any } from './common/common.types';
import { EventInstance, EventHandlerInstance } from './events/events.types';

export class Emitter {
  constructor(private readonly actor: Eventable) {}
  addEvent(eventHandlerInstance: EventHandlerInstance): void {
    this.actor.on(
      eventHandlerInstance.type.toString(),
      eventHandlerInstance.handler as (event: GameEvent<Any, Any>) => void
    );
  }

  emitEvent(event: EventInstance) {
    this.actor.emit(event.type.toString(), event.event as GameEvent<Any, Any>);
  }
}
