import { TemplateDelegate } from 'handlebars';
import template from './ArrowButton.hbs';
import styles from './ArrowButton.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum ArrowButtonSide {
  LEFT = 'left',
  RIGHT = 'right',
}

enum ArrowButtonType {
  DEFAULT = 'default',
  SIDE = 'side',
}

type ArrowButtonProps = {
  type?: ArrowButtonType;
  side?: ArrowButtonSide;
};

class ArrowButton extends BaseComponent {
  constructor({
    props: { type = ArrowButtonType.DEFAULT, side = ArrowButtonSide.LEFT },
    listeners = {},
  }: ComponentProps<ArrowButtonProps>) {
    super({ props: { type, side, styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ArrowButton;
