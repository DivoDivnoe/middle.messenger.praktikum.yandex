import { TemplateDelegate } from 'handlebars';
import deepClone from '../helpers/deepClone';
import EventEmitter, { CallbackType } from './EventEmitter';
import { nanoid } from 'nanoid';

export type DefaultProps = Record<string, unknown>;

export type ListenersType = Record<string, CallbackType[]>;
type ChildrenType = Record<string, BaseComponent>;

export interface ComponentProps<PropsTypes = Record<string, never>> {
  props: PropsTypes;
  listeners?: ListenersType;
}

enum EventType {
  INIT = 'init',
  RENDER = 'render',
  MOUNT = 'mount',
  UPDATE = 'update',
}

class BaseComponent<PropsTypes extends DefaultProps = Record<string, never>> {
  private _eventEmitter: EventEmitter;
  private _template: TemplateDelegate;
  private _element: Element;
  private _props: PropsTypes;
  private _listeners: ListenersType;
  private _children: ChildrenType;

  constructor({
    props = {} as PropsTypes,
    listeners = {} as ListenersType,
  }: ComponentProps<PropsTypes>) {
    this._template = this.getTemplate();
    this._listeners = listeners;

    this._initPropsAndChildren(props);
    this._initEventEmitter();

    this._eventEmitter.emit(EventType.INIT);
  }

  private _initPropsAndChildren(props: PropsTypes) {
    this._props = {} as PropsTypes;
    this._children = {} as ChildrenType;

    for (const [key, value] of Object.entries(props)) {
      if (value instanceof BaseComponent) {
        const id = nanoid();

        this._props = {
          ...this._props,
          [key]: `<span data-id="${id}"></span>`,
        };

        this._children = {
          ...this._children,
          [id]: value,
        };
      } else {
        this._props = {
          ...this._props,
          [key]: value,
        };
      }
    }

    this._props = this._makePropsProxy(this._props);
  }

  private _render(): void {
    // create element
    const div = document.createElement('div');
    div.innerHTML = this._template({ ...this._props });

    const newElement = div.firstElementChild!;

    // paste children
    for (const [id, child] of Object.entries(this._children)) {
      const curSpan = newElement.querySelector(`[data-id="${id}"]`)!;
      curSpan.replaceWith(child.getContent());
    }

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._eventEmitter.emit(EventType.RENDER);
  }

  private _makePropsProxy(props: PropsTypes) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as keyof PropsTypes];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = deepClone(target);

        target[prop as keyof PropsTypes] = value;

        this._eventEmitter.emit(EventType.UPDATE, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _componentDidInit = (): void => {
    this.componentDidInit();

    this._render();
  };

  private _componentDidRender = (): void => {
    this._subscribe();

    this.componentDidRender();
  };

  private _componentDidMount = (): void => {
    this.componentDidMount();
  };

  private _componentDidUpdate = (oldTarget: PropsTypes, target: PropsTypes): void => {
    this.componentDidUpdate(oldTarget, target);

    this._render();
  };

  private _initEventEmitter(): void {
    this._eventEmitter = new EventEmitter();

    this._eventEmitter.on(EventType.INIT, this._componentDidInit);
    this._eventEmitter.on(EventType.RENDER, this._componentDidRender);
    this._eventEmitter.on(EventType.MOUNT, this._componentDidMount);
    this._eventEmitter.on(EventType.UPDATE, this._componentDidUpdate);
  }

  private _subscribe(): void {
    const events = Object.keys(this._listeners);

    for (const evt of events) {
      const callbacks = this._listeners[evt]!;

      for (const callback of callbacks) {
        this._element.addEventListener(evt, callback);
      }
    }
  }

  public getContent(): Element {
    return this._element;
  }

  public updateProps(newProps: PropsTypes): void {
    Object.assign(this._props, newProps);
  }

  protected getTemplate(): TemplateDelegate {
    throw new Error('now template defined');
  }

  // eslint-disable-next-line
  protected componentDidInit(): void {}

  // eslint-disable-next-line
  protected componentDidRender(): void {}

  // eslint-disable-next-line
  protected componentDidMount(): void {}

  protected componentDidUpdate(oldTarget: PropsTypes, target: PropsTypes): void {
    console.log(oldTarget, target);
  }

  public dispatchComponentDidMount(): void {
    this._eventEmitter.emit(EventType.MOUNT);

    Object.values(this._children).forEach((child) => child.dispatchComponentDidMount());
  }
}

export default BaseComponent;
