import { TemplateDelegate } from 'handlebars';
import template from './ChatUserOption.hbs';
import styles from './ChatUserOption.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export type ChatUserOptionType = { addUser: boolean };
export type ChatUserOptionsProps = ChatUserOptionType & { styles: typeof styles };

class ChatUserOption<
  P extends ChatUserOptionType = ChatUserOptionType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatUserOptionsProps> {
  constructor({ props, listeners = {} }: O) {
    super({ props: { ...props, styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ChatUserOption;
