import { Input } from 'excalibur';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export type PressEvent = Input.KeyEvent;

export interface PressEventInstance extends EventInstance {
  type: 'press';
  event: PressEvent;
}

export interface PressEventHandlerInstance extends BaseEventHandlerInstance<PressEvent> {
  type: 'press';
}
