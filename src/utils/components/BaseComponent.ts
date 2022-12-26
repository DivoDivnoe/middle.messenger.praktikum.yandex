import { TemplateDelegate } from 'handlebars';
import deepClone from '../helpers/deepClone';
import EventEmitter, { CallbackType } from './EventEmitter';
import { nanoid } from 'nanoid';

enum EventType {
  INIT = 'init',
  RENDER = 'render',
  MOUNT = 'mount',
  UPDATE = 'update',
}

export type PropsTypes = Record<string, unknown>;
export type ListenersType = Record<string, CallbackType[]>;

export interface ComponentProps<T = Record<string, never>> {
  props: T;
  listeners?: ListenersType;
}

type ChildrenType = Record<string, IBaseComponent | IBaseComponent[]>;

export interface IBaseComponent<P extends PropsTypes = PropsTypes> {
  id: string;

  getContent: () => HTMLElement;
  updateProps: <T extends Partial<P>>(newProps: T) => void;
  dispatchComponentDidMount: () => void;
  getChildren: () => ChildrenType;
  show: () => void;
  hide: () => void;
}
export interface BaseComponentConstructor<
  P extends PropsTypes = PropsTypes,
  O extends ComponentProps<P> = ComponentProps<P>,
> {
  new (data: O): IBaseComponent<P>;
}

class BaseComponent<
  P extends PropsTypes = PropsTypes,
  O extends ComponentProps<P> = ComponentProps<P>,
> implements IBaseComponent<P>
{
  private _eventEmitter: EventEmitter;
  private _template: TemplateDelegate;
  private _element: HTMLElement;
  private _listeners: ListenersType;
  private _children: ChildrenType;
  protected _props: P;
  public id = nanoid(6);

  constructor({ props = {} as P, listeners = {} as ListenersType }: O) {
    this._template = this.getTemplate();
    this._listeners = listeners;
    this._children = {};

    this._initEventEmitter();
    this._eventEmitter.emit(EventType.INIT, props);
  }

  private _init = (props: P): void => {
    this._initProps(props);
    this.init();

    this._eventEmitter.emit(EventType.RENDER);
  };

  // eslint-disable-next-line
  protected init(): void {}

  _initProps(props: P): void {
    this._props = this._makePropsProxy(props);
  }

  private _render = (): void => {
    const children = {} as Record<string, string | string[]>;

    for (const [name, component] of Object.entries(this._children)) {
      if (Array.isArray(component)) {
        children[name] = [] as string[];

        for (const item of component) {
          (children[name] as string[]).push(`<span data-id="${item.id}"></span>`);
        }
      } else {
        children[name] = `<span data-id="${component.id}"></span>`;
      }
    }

    // create element
    const div = document.createElement('div');
    div.innerHTML = this._template({ ...this._props, ...children });

    const newElement = div.firstElementChild as HTMLElement;

    // paste children
    for (const child of Object.values(this._children)) {
      if (Array.isArray(child)) {
        for (const item of child) {
          const curSpan = newElement.querySelector(`[data-id="${item.id}"]`)!;
          curSpan.replaceWith(item.getContent());
        }
      } else {
        const curSpan = newElement.querySelector(`[data-id="${child.id}"]`)!;
        curSpan.replaceWith(child.getContent());
      }
    }

    if (this._element) {
      this._subscribe(false);
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._subscribe();
  };

  private _makePropsProxy(props: P) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = deepClone(target);

        target[prop as keyof P] = value;

        this._eventEmitter.emit(EventType.UPDATE, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _componentDidMount = (): void => {
    this.componentDidMount();
  };

  private _componentDidUpdate = (oldTarget: P, target: P): void => {
    if (this.componentDidUpdate(oldTarget, target)) {
      this._eventEmitter.emit(EventType.RENDER);
    }
  };

  private _initEventEmitter(): void {
    this._eventEmitter = new EventEmitter();

    this._eventEmitter.on(EventType.INIT, this._init);
    this._eventEmitter.on(EventType.RENDER, this._render);
    this._eventEmitter.on(EventType.MOUNT, this._componentDidMount);
    this._eventEmitter.on(EventType.UPDATE, this._componentDidUpdate);
  }

  private _subscribe(addListeners = true): void {
    const events = Object.keys(this._listeners);

    for (const evt of events) {
      const callbacks = this._listeners[evt]!;

      const method = addListeners ? 'addEventListener' : 'removeEventListener';

      for (const callback of callbacks) {
        this._element[method](evt, callback);
      }
    }
  }

  public getContent(): HTMLElement {
    return this._element;
  }

  public updateProps<T extends Partial<P>>(newProps: T): void {
    Object.assign(this._props, newProps);
  }

  protected getTemplate(): TemplateDelegate {
    throw new Error('now template defined');
  }

  // eslint-disable-next-line
  protected componentDidMount(): void {}

  protected componentDidUpdate(_oldTarget: P, _target: P): boolean {
    return true;
  }

  public dispatchComponentDidMount(): void {
    this._eventEmitter.emit(EventType.MOUNT);

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        for (const item of child) {
          item.dispatchComponentDidMount();
        }
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  protected getChild(key: string): IBaseComponent | IBaseComponent[] | null {
    return this._children[key] || null;
  }

  public getChildren(): ChildrenType {
    return this._children;
  }

  protected addChildren(children: ChildrenType) {
    this._children = {
      ...this._children,
      ...children,
    };
  }

  show() {
    this.getContent().hidden = false;
  }

  hide() {
    this.getContent().hidden = true;
  }
}

export default BaseComponent;
