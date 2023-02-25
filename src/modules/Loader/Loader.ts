import { TemplateDelegate } from 'handlebars';
import template from './Loader.hbs';
import styles from './Loader.module.css';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import withLoadingStore, { LoadingStoreProps } from '@/hocs/withLoading';

type LoaderProps = LoadingStoreProps & { styles: typeof styles };

class Loader<
  P extends LoadingStoreProps = LoadingStoreProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<LoaderProps> {
  constructor({ props }: O) {
    super({ props: { ...props, styles } });

    this.hide();
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate: ComponentDidUpdateType<LoaderProps> = (
    _oldTarget,
    target,
  ) => {
    if (target.isLoading) {
      this.show();
    } else {
      this.hide();
    }

    return false;
  };
}

export default withLoadingStore<PropsTypes>(Loader);
