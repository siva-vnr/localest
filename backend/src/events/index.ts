class registerEvents {
  eventEmitter: NodeJS.EventEmitter;
  constructor(emitter: NodeJS.EventEmitter) {
    this.eventEmitter = emitter;
  }

  registerOnEvent(name: string, callback: (...args: any[]) => void) {
    this.eventEmitter.on(name, callback);
  }
}
export default registerEvents;
