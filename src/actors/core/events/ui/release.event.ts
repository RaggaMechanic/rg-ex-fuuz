import { Input } from 'excalibur';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export type ReleaseEvent = Input.KeyEvent;

export interface ReleaseEventInstance extends EventInstance {
  type: 'release';
  event: ReleaseEvent;
}

export interface ReleaseEventHandlerInstance extends BaseEventHandlerInstance<ReleaseEvent> {
  type: 'release';
}
