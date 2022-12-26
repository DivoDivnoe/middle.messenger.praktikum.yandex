import { TemplateDelegate } from 'handlebars';
import template from './Avatar.hbs';
import styles from './Avatar.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum AvatarSize {
  SMALL = 'small',
  LARGE = 'large',
}

export type AvatarPropsType = {
  className?: string;
  size?: AvatarSize;
  src: string;
  isEditable?: boolean;
};

export type AvatarProps = AvatarPropsType & { styles: typeof styles };

class Avatar<
  P extends AvatarPropsType = AvatarPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<AvatarProps> {
  constructor({ props, listeners = {} }: O) {
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
