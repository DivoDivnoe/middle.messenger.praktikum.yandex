import { BaseComponentConstructor, PropsTypes } from './BaseComponent';
import Route from './Route';

type RouteType = Record<string, Route<any>>;

class Router {
  private static _instance: Router;

  private _history = window.history;
  private _routes: RouteType = {};
  private _currentRoute: Route | null = null;

  constructor(private _rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }

    Router._instance = this;
  }

  public go(pathName: string) {
    this._history.pushState({}, '', pathName);

    this._onRoute(pathName);
  }

  public forward() {
    this._history.forward();
  }

  public back() {
    this._history.back();
  }

  use<P extends PropsTypes = PropsTypes>(pathname: string, block: BaseComponentConstructor<P>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes[pathname] = route;

    return this;
  }

  _onRoute(pathname: string) {
    const route = this._routes[pathname];

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }
}

const router = new Router('#app');
export default router;
