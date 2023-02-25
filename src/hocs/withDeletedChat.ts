import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';

export type DeletedChatStoreProps = { deletedChat: number | null };

const mapDeletedChatStateToProps = (state: StateProps): DeletedChatStoreProps => ({
  deletedChat: state.deletedChat,
});

const withDeletedChatStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & DeletedChatStoreProps>,
) => {
  return withStore<DeletedChatStoreProps, P>(mapDeletedChatStateToProps)(Component);
};

export default withDeletedChatStore;
