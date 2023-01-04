import { TemplateDelegate } from 'handlebars';
import template from './Popup.hbs';
import styles from './Popup.module.css';
import BaseComponent, { ComponentProps, PropsTypes } from '@/utils/components/BaseComponent';

export type PopupProps<P> = P & { styles: typeof styles };

abstract class Popup<
  P extends PropsTypes = PropsTypes,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<PopupProps<P>> {
  constructor({ props }: O) {
    super({ props: { ...props, styles } });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Popup;
