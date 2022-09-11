import { TemplateDelegate } from 'handlebars';
import template from './ContactsBlock.hbs';
import styles from './ContactsBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import ChatItem from '../ChatItem';
import { ChatItemProps } from '../ChatItem/ChatItem';

export type FriendsBlockProps = {
  users?: ChatItemProps[];
};

class ContactsBlock extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<FriendsBlockProps>) {
    const { users = [] } = props;

    super({
      props: { users, styles },
      listeners,
    });
  }

  protected override init(): void {
    const contacts = ContactsBlock._initContacts(this._props.users as ChatItemProps[]);

    this.addChildren({ contacts });
  }

  private static _initContacts(users: ChatItemProps[]): ChatItem[] {
    const contacts = users.map((user) => {
      const contact = new ChatItem({
        props: user,
      });

      return contact;
    });

    return contacts;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: FriendsBlockProps,
    target = [] as FriendsBlockProps,
  ): boolean {
    if (oldTarget.users !== target.users) {
      const contacts = ContactsBlock._initContacts(target.users as ChatItemProps[]);
      this.addChildren({ contacts });
    }

    return true;
  }
}

export default ContactsBlock;
