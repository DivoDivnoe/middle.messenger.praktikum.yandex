import { TemplateDelegate } from 'handlebars';
import template from './ArrowButton.hbs';
import * as styles from './ArrowButton.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum ArrowButtonSide {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ArrowButtonType {
  DEFAULT = 'default',
  SIDE = 'side',
}

type ArrowButtonProps = {
  type?: ArrowButtonType;
  side?: ArrowButtonSide;
  isSubmit?: boolean;
};

class ArrowButton extends BaseComponent {
  constructor({
    props: { type = ArrowButtonType.DEFAULT, side = ArrowButtonSide.LEFT, isSubmit = false },
    listeners = {},
  }: ComponentProps<ArrowButtonProps>) {
    super({ props: { type, side, styles, isSubmit }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ArrowButton;
