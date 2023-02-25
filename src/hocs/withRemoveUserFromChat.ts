import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';

export type RemoveUserFromChatStoreProps = { removeUserFromChat: boolean };

const mapRemoveUserFromChatStateToProps = (state: StateProps): RemoveUserFromChatStoreProps => ({
  removeUserFromChat: state.removeUserFromChat,
});

const withRemoveUserFromChat = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & RemoveUserFromChatStoreProps>,
) => {
  return withStore<RemoveUserFromChatStoreProps, P>(mapRemoveUserFromChatStateToProps)(Component);
};

export default withRemoveUserFromChat;
