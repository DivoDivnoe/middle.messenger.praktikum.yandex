import Route from './Route';
import BaseComponent from '../BaseComponent';
import { TemplateDelegate } from 'handlebars';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Route component', () => {
  it('is rendered correctly', () => {
    const ROOT_ID = 'app';
    const rootQuery = `#${ROOT_ID}`;

    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);

    const mockTemplate: TemplateDelegate = (): string => `<div class="content">some content</div>`;

    class MockComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const PATH_NAME = '/';

    const route = new Route(PATH_NAME, MockComponent, { rootQuery });
    route.render();

    expect(document.querySelector('.content')?.textContent).toBe('some content');
  });

  it('match method works correctly', () => {
    const ROOT_ID = 'app';
    const rootQuery = `#${ROOT_ID}`;

    const mockTemplate: TemplateDelegate = (): string => `<div class="content">some content</div>`;

    class MockComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const PATH_NAME = '/';

    const route = new Route(PATH_NAME, MockComponent, { rootQuery });

    expect(route.match(PATH_NAME)).toBe(true);
    expect(route.match('/somepath')).toBe(false);
  });

  it('navigate method works correctly', () => {
    const ROOT_ID = 'app';
    const rootQuery = `#${ROOT_ID}`;

    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);

    const mockTemplate: TemplateDelegate = (): string => `<div class="content">some content</div>`;

    class MockComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const PATH_NAME = '/';

    const route = new Route(PATH_NAME, MockComponent, { rootQuery });
    expect(document.querySelector('.content')).toBe(null);

    route.navigate('/somepath');
    expect(document.querySelector('.content')).toBe(null);

    route.navigate(PATH_NAME);
    expect(document.querySelector('.content')?.textContent).toBe('some content');
  });

  it('leave method works correctly', () => {
    const ROOT_ID = 'app';
    const rootQuery = `#${ROOT_ID}`;

    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);

    const mockTemplate: TemplateDelegate = (): string => `<div class="content">some content</div>`;

    class MockComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const PATH_NAME = '/';

    const route = new Route(PATH_NAME, MockComponent, { rootQuery });
    route.navigate(PATH_NAME);

    expect(document.querySelector('.content')?.textContent).toBe('some content');

    route.leave();

    const content = document.querySelector('.content') as HTMLElement | null;
    expect(content?.hidden).toBe(true);
  });
});
