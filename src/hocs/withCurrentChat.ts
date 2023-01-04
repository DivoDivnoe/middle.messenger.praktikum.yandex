import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/utils/components/Store';

export type CurrentChatProps = { currentChat: number | null };

const mapCurrentChatStateToProps = (state: StateProps): CurrentChatProps => ({
  currentChat: state.currentChat.data,
});

const withCurrentChatStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & CurrentChatProps>,
) => {
  return withStore<CurrentChatProps, P>(mapCurrentChatStateToProps)(Component);
};

export default withCurrentChatStore;
