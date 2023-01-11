import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';
import { ChatMessage } from '@/api/types';
import { MessagePropsType, UserMessageType } from '@/components/Message/Message';
import { ConversationBlockPropsType } from '@/modules/ConversationBlock/ConversationBlock';
import { getDate, getTime } from '@/utils/helpers/getChatTime';

export type ChatMessagesProps = { messages: ConversationBlockPropsType[] };

class Adapter {
  static format(messages: ChatMessage[], myId: number): ConversationBlockPropsType[] {
    return messages.reduce((acc, message) => {
      const { time } = message;
      const messageDate = getDate(new Date(time));
      const lastItem = acc[acc.length - 1];

      if (lastItem && lastItem.date === messageDate) {
        lastItem.messagesData.push(Adapter.convertMessageData(message, myId));
      } else {
        acc.push({ date: messageDate, messagesData: [] });
      }

      return acc;
    }, [] as ConversationBlockPropsType[]);
  }

  static convertMessageData(messageData: ChatMessage, myId: number): MessagePropsType {
    const { user_id: userId, time: dateStr, content } = messageData;

    const userType = userId === myId ? UserMessageType.DEFAULT : UserMessageType.INTERLOCUTOR;

    const date = new Date(dateStr);
    const time = getTime(date);

    return { userType, time, content };
  }
}

const withCurrentMessagesMapStateToProps = (state: StateProps): ChatMessagesProps => {
  const { currentChat, messages: stateMessages, user } = state;

  if (!currentChat.data || !stateMessages[currentChat.data]) return { messages: [] };

  const messages = Adapter.format(
    stateMessages[currentChat.data] as ChatMessage[],
    Number(user.data?.id),
  );

  console.log('new messages', messages);

  return { messages };
};

const withCurrentMessages = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & ChatMessagesProps>,
) => {
  return withStore<ChatMessagesProps, P>(withCurrentMessagesMapStateToProps)(Component);
};

export default withCurrentMessages;
