import { TemplateDelegate } from 'handlebars';
import template from './Avatar.hbs';
import styles from './Avatar.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum AvatarSize {
  SMALL = 'small',
  LARGE = 'large',
}

export type AvatarProps = {
  className?: string;
  size?: AvatarSize;
  src?: string;
  isEditable?: boolean;
};

class Avatar extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<AvatarProps>) {
    const { className = '', size = AvatarSize.SMALL, isEditable = false } = props;
    const avatarProps = {
      ...props,
      styles,
      className,
      size,
      isEditable,
    };

    super({ props: avatarProps, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Avatar;
