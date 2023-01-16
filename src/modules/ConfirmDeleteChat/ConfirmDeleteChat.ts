import { TemplateDelegate } from 'handlebars';
import template from './ConfirmDeleteChat.hbs';
import styles from './ConfirmDeleteChat.module.css';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import Button from '@/components/Button';
import { ButtonTheme } from '@/components/Button/Button';
import withDeletedChatMainDataStore, {
  DeletedChatMainDataProps,
} from '@/hocs/withDeletedChatMainData';
import withPopup from '@/hocs/withPopup';
import chatsController from '@/controllers/ChatsController';

export type ConfirmDeleteChatProps = DeletedChatMainDataProps & { styles: typeof styles };

class ConfirmDeleteChat<
  P extends DeletedChatMainDataProps = DeletedChatMainDataProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ConfirmDeleteChatProps> {
  constructor({ props }: O) {
    super({ props: { ...props, styles } });
  }

  protected override init(): void {
    const confirmButton = new Button({
      props: { content: 'Удалить' },
      listeners: {
        click: [
          () => {
            if (this._props.deletedChat) {
              chatsController.delete(this._props.deletedChat.id);
            }
          },
        ],
      },
    });
    const cancelButton = new Button({
      props: { theme: ButtonTheme.SECONDARY, content: 'Отмена' },
      listeners: {
        click: [
          () => {
            chatsController.selectDeletedChat(null);
          },
        ],
      },
    });

    this.addChildren({ confirmButton, cancelButton });
  }

  protected override componentDidUpdate: ComponentDidUpdateType<ConfirmDeleteChatProps> = (
    oldTarget,
    target,
  ) => {
    if (!!oldTarget.deletedChat && target.deletedChat === null) {
      this.hide();
    } else if (oldTarget.deletedChat === null && !!target.deletedChat) {
      this.show();
    }

    return true;
  };

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

const WithDeletedChatMainDataConfirm = withDeletedChatMainDataStore<PropsTypes>(ConfirmDeleteChat);
export default withPopup(WithDeletedChatMainDataConfirm);
