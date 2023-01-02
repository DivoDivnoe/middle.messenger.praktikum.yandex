import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/utils/components/Store';
import { ChatType } from '@/api/types';

export type ChatsProps = { chats: ChatType[] };

const mapUserStateToProps = (state: StateProps): ChatsProps => ({
  chats: state.chats.data || [],
});

const withChatsStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & ChatsProps>,
) => {
  return withStore<ChatsProps, P>(mapUserStateToProps)(Component);
};

export default withChatsStore;
