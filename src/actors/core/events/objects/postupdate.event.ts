import { PostUpdateEvent } from 'excalibur';
import { BaseEventHandlerInstance, EventInstance } from '../common.interfaces';

export type PostupdateEvent = PostUpdateEvent;

export interface PostupdateActorEventInstance extends EventInstance {
  type: 'postupdate';
  event: PostupdateEvent;
}

export interface PostupdateActorEventHandlerInstance extends BaseEventHandlerInstance<PostupdateEvent> {
  type: 'postupdate';
}
