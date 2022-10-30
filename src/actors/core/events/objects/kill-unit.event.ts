import { Actor } from 'excalibur';
import { Player } from '../../../entities/player/player.service';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export interface KillUnitEvent {
  unit: Player;
  killer: Actor;
  bullet: Actor;
}

export interface KillEventInstance extends EventInstance {
  type: 'kill-unit';
  event: KillUnitEvent;
}

export interface KillUnitActorEventHandlerInstance extends BaseEventHandlerInstance<KillUnitEvent> {
  type: 'kill-unit';
}
