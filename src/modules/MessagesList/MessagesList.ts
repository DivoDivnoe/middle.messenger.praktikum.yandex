import { TemplateDelegate } from 'handlebars';
import template from './MessagesList.hbs';
import styles from './MessagesList.module.css';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
} from '@/utils/components/BaseComponent';
import ConversationBlock, {
  ConversationBlockPropsType,
} from '../ConversationBlock/ConversationBlock';
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

  protected override componentDidUpdate: ComponentDidUpdateType<MessagesListProps> = (
    oldTarget,
    target,
  ) => {
    if (oldTarget.messages !== target.messages) {
      const messagesBlocks = MessagesList._initBlocks(target.messages);
      this.addChildren({ messagesBlocks });
    }

    return true;
  };

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
