import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';
import { ChatType } from '@/api/types';

export type ChatsProps = { chats: ChatType[] };

const mapUserStateToProps = (state: StateProps): ChatsProps => ({
  chats: state.chats || [],
});

const withChatsStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & ChatsProps>,
) => {
  return withStore<ChatsProps, P>(mapUserStateToProps)(Component);
};

export default withChatsStore;
