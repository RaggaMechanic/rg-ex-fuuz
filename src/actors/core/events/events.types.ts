import { CollisionStartEvent } from 'excalibur';
import { CollisionStartActorEventHandlerInstance, CollisionStartEventInstance } from './objects/collision-start.event';
import { DamageActorEventHandlerInstance, DamageEvent, DamageEventInstance } from './objects/damage.event';
import { KillEventInstance, KillUnitActorEventHandlerInstance, KillUnitEvent } from './objects/kill-unit.event';
import { MovedActorEventHandlerInstance, MovedActorEventInstance, MovedEvent } from './objects/moved.event';
import {
  PostupdateActorEventHandlerInstance,
  PostupdateActorEventInstance,
  PostupdateEvent,
} from './objects/postupdate.event';
import { PointerEventHandlerInstance, PointerEventInstance } from './ui/pointer.event';
import { PressEvent, PressEventHandlerInstance, PressEventInstance } from './ui/press.event';
import { ReleaseEvent, ReleaseEventHandlerInstance, ReleaseEventInstance } from './ui/release.event';

export type ObjectEventType = 'damage' | 'kill-unit' | 'collisionstart' | 'postupdate' | 'moved';
export type UiPointerType = 'pointerdown' | 'pointerup' | 'hover' | 'pointerleave' | 'pointerenter';
export type UiEventType = 'press' | 'release' | UiPointerType;
export type EventType = ObjectEventType | UiEventType;

export type ObjectEventHandlerInstance =
  | DamageActorEventHandlerInstance
  | CollisionStartActorEventHandlerInstance
  | KillUnitActorEventHandlerInstance
  | PostupdateActorEventHandlerInstance
  | MovedActorEventHandlerInstance;

export type UiEventHandlerInstance =
  | PressEventHandlerInstance
  | ReleaseEventHandlerInstance
  | PointerEventHandlerInstance;

export type EventHandlerInstance = ObjectEventHandlerInstance | UiEventHandlerInstance;

export type SystemEvent = CollisionStartEvent;
export type ObjectEvent = SystemEvent | DamageEvent | KillUnitEvent | PostupdateEvent | MovedEvent;
export type UiEvent = PressEvent | ReleaseEvent;
export type GameEvent = ObjectEvent | UiEvent;

export type ObjectEventInstance =
  | DamageEventInstance
  | CollisionStartEventInstance
  | KillEventInstance
  | PostupdateActorEventInstance
  | MovedActorEventInstance;

export type UiEventInstance = PressEventInstance | ReleaseEventInstance | PointerEventInstance;
export type EventInstance = ObjectEventInstance | UiEventInstance;
