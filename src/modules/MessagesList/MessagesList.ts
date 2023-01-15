import { TemplateDelegate } from 'handlebars';
import template from './MessagesList.hbs';
import styles from './MessagesList.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ConversationBlock, {
  ConversationBlockPropsType,
} from '../ConversationBlock/ConversationBlock';
import isEqual from '@/utils/helpers/isEqual';
import withCurrentMessages from '@/hocs/withCurrentMessages';

export type MessagesListCoreProps = { className?: string; onRender?: () => void };

export type MessagesListPropsType = MessagesListCoreProps & {
  messages: ConversationBlockPropsType[];
};
export type MessagesListProps = MessagesListPropsType & { styles: typeof styles };

export class MessagesList<
  P extends MessagesListPropsType = MessagesListPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<MessagesListProps> {
  constructor({ props }: O) {
    const { className = '' } = props;

    super({ props: { ...props, styles, className } });
  }

  protected override init(): void {
    const messagesBlocks = MessagesList._initBlocks(this._props.messages);

    this.addChildren({ messagesBlocks });
  }

  private static _initBlocks(data: ConversationBlockPropsType[]): ConversationBlock[] {
    return data.map((item) => new ConversationBlock({ props: item }));
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: MessagesListProps,
    target: MessagesListProps,
  ): boolean {
    if (oldTarget.messages !== target.messages) {
      if (oldTarget.messages.length === target.messages.length) {
        oldTarget.messages.forEach((oldMessage, index) => {
          const newMessage = target.messages[index];

          if (newMessage && !isEqual(oldMessage, newMessage)) {
            this.messagesBlocks[index]?.updateProps(newMessage);
          }
        });

        this._onRender();

        return false;
      }

      const messagesBlocks = MessagesList._initBlocks(target.messages);
      this.addChildren({ messagesBlocks });
    }

    return true;
  }

  protected override componentDidRender(): void {
    this._onRender();
  }

  get messagesBlocks(): ConversationBlock[] {
    return this.getChild('messagesBlocks') as ConversationBlock[];
  }

  _onRender() {
    if (this._props.onRender) {
      this._props.onRender();
    }
  }
}

export default withCurrentMessages<MessagesListCoreProps>(MessagesList);
