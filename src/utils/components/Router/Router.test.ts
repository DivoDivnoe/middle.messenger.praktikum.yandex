import Router from './Router';
import BaseComponent from '../BaseComponent';
import { TemplateDelegate } from 'handlebars';
import { Routes } from '@/configs/Routes';

const setLocation = () => {
  let pathname = '/';

  Object.defineProperty(window, 'location', {
    value: {
      get pathname() {
        return pathname;
      },

      set pathname(newPath: string) {
        pathname = newPath;
      },
    },
  });
};

afterEach(() => {
  document.body.replaceChildren();
});

setLocation();

describe('Router component', () => {
  it('is singleton', () => {
    const rootQuery = 'body';

    const router1 = new Router(rootQuery);
    const router2 = new Router(rootQuery);

    expect(router1).toBe(router2);

    router1.destroy();
  });

  it('destroy method works correctly', () => {
    const rootQuery = 'body';

    const router1 = new Router(rootQuery);
    router1.destroy();

    const router2 = new Router(rootQuery);

    expect(router1).not.toBe(router2);

    router2.destroy();
  });

  it('start method works correctly', () => {
    const rootQuery = 'body';
    const PATH_NAME = '/';

    const mockTemplate: TemplateDelegate = (): string => `<div class="content">some content</div>`;

    class MockComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    window.location.pathname = PATH_NAME;

    const router = new Router(rootQuery);
    router.use(PATH_NAME, MockComponent);

    expect(document.querySelector('.content')).toBeNull();

    router.start();
    expect(document.querySelector('.content')?.textContent).toBe('some content');

    router.destroy();
  });

  it('show not found route correctly', () => {
    const rootQuery = 'body';
    const PATH_NAME = '/';

    const mockTemplate: TemplateDelegate = (): string => `<div id="not-found">404</div>`;

    class MockComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    window.location.pathname = PATH_NAME;

    const router = new Router(rootQuery);
    router.use(Routes.NOT_FOUND, MockComponent);

    router.start();
    expect(document.querySelector('#not-found')?.textContent).toBe('404');

    router.destroy();
  });

  it('go method works correctly', () => {
    const rootQuery = 'body';
    const PATH_NAME_1 = '/page';
    const PATH_NAME_2 = '/page2';

    const mockTemplate1: TemplateDelegate = (): string => `<div id="page1">page1</div>`;
    const mockTemplate2: TemplateDelegate = (): string => `<div id="page2">page2</div>`;

    class MockComponent1 extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate1;
      }
    }

    class MockComponent2 extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate2;
      }
    }

    window.location.pathname = PATH_NAME_1;

    const router = new Router(rootQuery);
    router.use(PATH_NAME_1, MockComponent1).use(PATH_NAME_2, MockComponent2);

    router.start();
    expect(document.querySelector('#page1')?.textContent).toBe('page1');
    expect(document.querySelector('#page2')).toBeNull();

    router.go(PATH_NAME_2);

    const page1 = document.querySelector('#page1') as HTMLElement | null;
    expect(page1?.hidden).toBe(true);
    expect(document.querySelector('#page2')?.textContent).toBe('page2');

    router.destroy();
  });
});
