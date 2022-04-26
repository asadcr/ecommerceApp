import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event: Events, fn: any) => eventEmitter.on(event as any, fn),
  emit: (event: Events, payload: any = null) => eventEmitter.emit(event as any, payload),
}

Object.freeze(Emitter);

export default Emitter;

export enum Events {
    onCartUpdate,
}  