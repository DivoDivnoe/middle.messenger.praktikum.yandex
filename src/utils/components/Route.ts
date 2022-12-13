import renderDOM from '../helpers/renderDOM';
import BaseComponent from './BaseComponent';

type RouteProps = {
  rootQuery: string;
};

class Route {
  private _block: BaseComponent | null = null;

  constructor(
    private _pathname: string,
    private readonly _blockClass: typeof BaseComponent,
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
    if (!this._block) {
      this._block = new this._blockClass({ props: {} });
      renderDOM(this._props.rootQuery, this._block as BaseComponent);
      return;
    }

    this._block.show();
  }
}

export default Route;
