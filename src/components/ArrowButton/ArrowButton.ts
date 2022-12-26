import { TemplateDelegate } from 'handlebars';
import template from './ArrowButton.hbs';
import styles from './ArrowButton.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum ArrowButtonSide {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ArrowButtonType {
  DEFAULT = 'default',
  SIDE = 'side',
}

type ArrowButtonPropsType = {
  type?: ArrowButtonType;
  side?: ArrowButtonSide;
  isSubmit?: boolean;
};

type ArrowButtonProps = ArrowButtonPropsType & { styles: typeof styles };

class ArrowButton<
  P extends ArrowButtonPropsType = ArrowButtonPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ArrowButtonProps> {
  constructor({
    props: { type = ArrowButtonType.DEFAULT, side = ArrowButtonSide.LEFT, isSubmit = false },
    listeners = {},
  }: O) {
    super({ props: { type, side, styles, isSubmit }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ArrowButton;
