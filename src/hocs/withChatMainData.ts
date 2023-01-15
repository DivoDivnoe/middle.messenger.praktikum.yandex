import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';
import { ChatMainDataType } from '@/api/types';

export type ChatMainDataProps = { chat: ChatMainDataType | null };

const mapChatMainDataStateToProps = (state: StateProps): ChatMainDataProps => ({
  chat: state.chats.find((chat) => chat.id === state.currentChat) || null,
});

const withChatMainDataStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & ChatMainDataProps>,
) => {
  return withStore<ChatMainDataProps, P>(mapChatMainDataStateToProps)(Component);
};

export default withChatMainDataStore;
