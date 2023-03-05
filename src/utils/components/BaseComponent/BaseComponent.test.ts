import { TemplateDelegate } from 'handlebars';
import BaseComponent, { ComponentDidUpdateType, ComponentProps } from './BaseComponent';

describe('BaseComponent', () => {
  it('getContent method returns correct content', () => {
    const mockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;

    class MockBaseComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const mockComponent = new MockBaseComponent({ props: { content: 'some-content' } });

    expect(mockComponent.getContent().outerHTML).toBe('<div>some-content</div>');
  });

  it('updateProps method works correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;

    class MockBaseComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const mockComponent = new MockBaseComponent({ props: { content: 'some-content' } });
    expect(mockComponent.getContent().outerHTML).toBe('<div>some-content</div>');

    mockComponent.updateProps({ content: 'another-content' });
    expect(mockComponent.getContent().outerHTML).toBe('<div>another-content</div>');
  });

  it('dispatchComponentDidMount method works correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;
    const componentDidMount = jest.fn();

    class MockBaseComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }

      protected override componentDidMount(): void {
        componentDidMount();
      }
    }

    const mockComponent = new MockBaseComponent({ props: { content: 'some-content' } });
    mockComponent.dispatchComponentDidMount();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
  });

  it('hide method works correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div id="mock">${context.content}</div>`;

    const componentWasHidden = jest.fn();

    class MockBaseComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }

      public override componentWasHidden(): void {
        componentWasHidden();
      }
    }

    const mockComponent = new MockBaseComponent({ props: { content: 'some-content' } });
    mockComponent.hide();

    expect(mockComponent.getContent().hidden).toEqual(true);
    expect(componentWasHidden).toHaveBeenCalledTimes(1);
  });

  it('show method works correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div id="mock">${context.content}</div>`;

    const componentWasShown = jest.fn();

    class MockBaseComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }

      public override componentWasShown(): void {
        componentWasShown();
      }
    }

    const mockComponent = new MockBaseComponent({ props: { content: 'some-content' } });
    mockComponent.hide();

    expect(mockComponent.getContent().hidden).toEqual(true);

    mockComponent.show();

    expect(mockComponent.getContent().hidden).toEqual(false);
    expect(componentWasShown).toHaveBeenCalledTimes(1);
  });

  it('renders children correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { child1: string; child2: string }): string =>
      `<div>${context.child1}${context.child2}</div>`;

    const childOneMockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;

    const childTwoMockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;

    class MockChild1 extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return childOneMockTemplate;
      }
    }

    class MockChild2 extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return childTwoMockTemplate;
      }
    }

    const mockChild1 = new MockChild1({ props: { content: 'child1-content' } });
    const mockChild2 = new MockChild2({ props: { content: 'child2-content' } });

    class MockBaseComponent extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }

      protected override init(): void {
        this.addChildren({ child1: mockChild1, child2: mockChild2 });
      }
    }

    const mockComponent = new MockBaseComponent({ props: {} });

    const expected = '<div><div>child1-content</div><div>child2-content</div></div>';
    expect(mockComponent.getContent().outerHTML).toEqual(expected);
    expect(mockComponent.getChildren()).toStrictEqual({
      child1: mockChild1,
      child2: mockChild2,
    });
  });

  it('updates children correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { child1: string; child2: string }): string =>
      `<div>${context.child1}${context.child2}</div>`;

    const childOneMockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;

    const childTwoMockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div>${context.content}</div>`;

    class MockChild1 extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return childOneMockTemplate;
      }
    }

    class MockChild2 extends BaseComponent {
      protected override getTemplate(): TemplateDelegate {
        return childTwoMockTemplate;
      }
    }

    let mockChild1: MockChild1;
    let mockChild2: MockChild2;

    type IProps = {
      child1Content: string;
      child2Content: string;
    };

    class MockBaseComponent<
      P extends IProps = IProps,
      O extends ComponentProps<P> = ComponentProps<P>,
    > extends BaseComponent<IProps> {
      constructor({ props }: O) {
        super({ props });
      }

      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }

      protected override init(): void {
        mockChild1 = new MockChild1({ props: { content: this._props.child1Content } });
        mockChild2 = new MockChild2({ props: { content: this._props.child2Content } });

        this.addChildren({ child1: mockChild1, child2: mockChild2 });
      }

      protected override componentDidUpdate: ComponentDidUpdateType<IProps> = (
        oldTarget,
        target,
      ) => {
        if (oldTarget.child1Content !== target.child2Content) {
          (this.getChild('child1') as MockChild1).updateProps({
            content: target.child1Content,
          });
        }

        if (oldTarget.child2Content !== target.child2Content) {
          (this.getChild('child2') as MockChild2).updateProps({
            content: target.child2Content,
          });
        }

        return true;
      };
    }

    const mockComponent = new MockBaseComponent({
      props: { child1Content: 'child1-content', child2Content: 'child2-content' },
    });

    mockComponent.updateProps({ child1Content: 'child1-content-updated' });

    const updatedExpected = '<div><div>child1-content-updated</div><div>child2-content</div></div>';
    expect(mockComponent.getContent().outerHTML).toEqual(updatedExpected);
  });

  it('handles listeners correctly', () => {
    const mockTemplate: TemplateDelegate = (context: { content: string }): string =>
      `<div id="mock">${context.content}</div>`;
    const clickHandler1 = jest.fn();
    const clickHandler2 = jest.fn();

    type ContentType = { content: string };

    class MockBaseComponent<
      P extends ContentType = ContentType,
      O extends ComponentProps<P> = ComponentProps<P>,
    > extends BaseComponent<ContentType> {
      constructor({ props }: O) {
        super({
          props,
          listeners: {
            click: [clickHandler1, clickHandler2],
          },
        });
      }
      protected override getTemplate(): TemplateDelegate {
        return mockTemplate;
      }
    }

    const mockComponent = new MockBaseComponent({ props: { content: 'some-content' } });

    expect(clickHandler1).toHaveBeenCalledTimes(0);
    expect(clickHandler2).toHaveBeenCalledTimes(0);

    mockComponent.getContent().click();

    expect(clickHandler1).toHaveBeenCalledTimes(1);
    expect(clickHandler2).toHaveBeenCalledTimes(1);
  });
});
