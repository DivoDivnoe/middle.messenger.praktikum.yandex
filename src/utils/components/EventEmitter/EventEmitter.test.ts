import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  it('handles single callback correctly', () => {
    const eventEmitter = new EventEmitter();
    const callback = jest.fn();
    const EVENT = 'some-event';
    const args = [1, 'something'];

    eventEmitter.on(EVENT, callback);
    eventEmitter.emit(EVENT, ...args);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(...args);
  });

  it('handles multiple callbacks correctly', () => {
    const eventEmitter = new EventEmitter();
    const callback_1 = jest.fn();
    const callback_2 = jest.fn();
    const EVENT = 'some-event';
    const args = [1, 'something'];

    eventEmitter.on(EVENT, callback_1);
    eventEmitter.on(EVENT, callback_2);
    eventEmitter.emit(EVENT, ...args);

    expect(callback_1).toHaveBeenCalledTimes(1);
    expect(callback_1).toHaveBeenCalledWith(...args);
    expect(callback_2).toHaveBeenCalledTimes(1);
    expect(callback_2).toHaveBeenCalledWith(...args);
  });

  it('removes callback correctly', () => {
    const eventEmitter = new EventEmitter();
    const callback_1 = jest.fn();
    const callback_2 = jest.fn();
    const EVENT = 'some-event';

    eventEmitter.on(EVENT, callback_1);
    eventEmitter.on(EVENT, callback_2);
    eventEmitter.emit(EVENT);

    eventEmitter.off(EVENT, callback_1);
    eventEmitter.emit(EVENT);

    expect(callback_1).toHaveBeenCalledTimes(1);
    expect(callback_2).toHaveBeenCalledTimes(2);
  });
});
