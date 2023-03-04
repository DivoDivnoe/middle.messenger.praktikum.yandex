import renderDOM from '../helpers/renderDOM';
import BaseComponent, {
  BaseComponentConstructor,
  IBaseComponent,
  PropsTypes,
} from './BaseComponent';

type RouteProps = {
  rootQuery: string;
};

class Route<P extends PropsTypes = PropsTypes> {
  private _block: IBaseComponent<P> | null = null;

  constructor(
    private _pathname: string,
    private readonly _blockClass: BaseComponentConstructor<P>,
    private _props: RouteProps,
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    console.log('render route');
    console.log('check block', this._block);
    if (!this._block) {
      console.log('init block');
      this._block = new this._blockClass({ props: {} as P });
      console.log('block', this._block);
      renderDOM(this._props.rootQuery, this._block as BaseComponent);
      this._block.dispatchComponentDidMount();
      return;
    }

    this._block.show();
  }
}

export default Route;
