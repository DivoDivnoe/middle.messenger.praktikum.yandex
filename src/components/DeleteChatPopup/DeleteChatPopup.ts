import { TemplateDelegate } from 'handlebars';
import template from './DeleteChatPopup.hbs';
import styles from './DeleteChatPopup.module.css';
import BaseComponent from '@/utils/components/BaseComponent';

export type DeleteChatProps = { styles: typeof styles };

class DeleteChatPopup extends BaseComponent<DeleteChatProps> {
  constructor({ listeners = {} }) {
    super({ props: { styles }, listeners });

    this.hide();
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default DeleteChatPopup;
