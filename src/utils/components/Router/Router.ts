import { Routes } from '@/configs/Routes';
import { BaseComponentConstructor, PropsTypes } from '../BaseComponent';
import Route from '../Route';

type RouteType = Record<string, Route<any>>;

class Router {
  private static _instance: Router | null = null;

  private _history = window.history;
  private _routes: RouteType = {};
  private _currentRoute: Route | null = null;

  constructor(private _rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }

    Router._instance = this;
  }

  public go(pathName: string): void {
    this._history.pushState({}, '', pathName);

    this._onRoute(pathName);
  }

  public forward(): void {
    this._history.forward();
  }

  public back(): void {
    this._history.back();
  }

  public use<P extends PropsTypes = PropsTypes>(
    pathname: string,
    block: BaseComponentConstructor<P>,
  ): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes[pathname] = route;

    return this;
  }

  private _onRoute(pathname: string): void {
    let route = this._routes[pathname];

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    if (!route) {
      route = this._routes[Routes.NOT_FOUND] as Route;
    }

    this._currentRoute = route;

    route.render();
  }

  public start(): void {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public destroy(): void {
    window.onpopstate = null;
    this._routes = {};
    Router._instance = null;
    this._currentRoute = null;
  }
}

export default Router;
