import { TemplateDelegate } from 'handlebars';
import template from './ArrowButton.hbs';
import styles from './ArrowButton.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

class ArrowButton extends BaseComponent {
  constructor({ listeners = {} }: ComponentProps) {
    super({ props: { styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ArrowButton;
