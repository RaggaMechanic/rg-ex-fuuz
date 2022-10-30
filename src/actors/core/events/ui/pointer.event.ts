import { Input } from 'excalibur';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';
import { UiPointerType } from '../events.types';

export type PointerEvent = Input.KeyEvent;

export interface PointerEventInstance extends EventInstance {
  type: UiPointerType;
  event: PointerEvent;
}

export interface PointerEventHandlerInstance extends BaseEventHandlerInstance<PointerEvent> {
  type: UiPointerType;
}
