import Popup from '@/components/Popup';
import {
  BaseComponentConstructor,
  ComponentProps,
  IBaseComponent,
  PropsTypes,
} from '@/utils/components/BaseComponent';

const withPopup = <
  P extends PropsTypes = PropsTypes,
  O extends ComponentProps<P> = ComponentProps<P>,
>(
  Component: BaseComponentConstructor<P>,
) => {
  return class extends Popup<P> {
    constructor({ props }: O) {
      super({ props });

      this.hide();
    }

    protected override init(): void {
      const content = new Component({ props: this._props });

      content.show = () => {
        this.show();
        content.componentWasShown();
      };
      content.hide = () => {
        this.hide();
        content.componentWasHidden();
      };

      this.addChildren({ content });
    }

    public get content() {
      return this.getChild('content') as IBaseComponent<P>;
    }
  };
};

export default withPopup;
