import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/utils/components/Store';
import { ChatMainDataType } from '@/api/types';

export type DeletedChatMainDataProps = { deletedChat: ChatMainDataType | null };

const mapDeletedChatMainDataStateToProps = (state: StateProps): DeletedChatMainDataProps => ({
  deletedChat: state.chats.data.find((chat) => chat.id === state.deletedChat) || null,
});

const withDeletedChatMainDataStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & DeletedChatMainDataProps>,
) => {
  return withStore<DeletedChatMainDataProps, P>(mapDeletedChatMainDataStateToProps)(Component);
};

export default withDeletedChatMainDataStore;
