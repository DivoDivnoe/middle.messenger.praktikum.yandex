import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';

export type AddUserToChatStoreProps = { addUserToChat: boolean };

const mapAddUserToChatStateToProps = (state: StateProps): AddUserToChatStoreProps => ({
  addUserToChat: state.addUserToChat,
});

const withAddUserToChat = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & AddUserToChatStoreProps>,
) => {
  return withStore<AddUserToChatStoreProps, P>(mapAddUserToChatStateToProps)(Component);
};

export default withAddUserToChat;
