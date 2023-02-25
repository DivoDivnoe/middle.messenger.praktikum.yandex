import { TemplateDelegate } from 'handlebars';
import template from './ChatUserOptions.hbs';
import styles from './ChatUserOptions.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ChatAddUserOption from '../ChatAddUserOption';
import ChatRemoveUserOption from '../ChatRemoveUserOption';

export type ChatUserOptionsCoreType = {
  className?: string;
  onClick: () => void;
};

export type ChatUserOptionsType = ChatUserOptionsCoreType;
export type ChatUserOptionsProps = ChatUserOptionsType & { styles: typeof styles };

class ChatUserOptions<
  P extends ChatUserOptionsType = ChatUserOptionsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatUserOptionsProps> {
  constructor({ props }: O) {
    const { className = '' } = props;
    super({ props: { ...props, className, styles } });

    this.hide();
  }

  protected override init(): void {
    const { onClick } = this._props;

    const addUserOption = new ChatAddUserOption({ props: { onClick } });
    const removeUserOption = new ChatRemoveUserOption({ props: { onClick } });

    this.addChildren({ addUserOption, removeUserOption });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ChatUserOptions;
