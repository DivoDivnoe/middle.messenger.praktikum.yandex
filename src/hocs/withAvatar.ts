import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';
import { User } from '@/api/types';

export type AvatarStoreProps = { src: string | null };

const mapUserStateToProps = (state: StateProps): AvatarStoreProps => ({
  src: (state.user as User).avatar,
});

const withAvatarStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & AvatarStoreProps>,
) => {
  return withStore<AvatarStoreProps, P>(mapUserStateToProps)(Component);
};

export default withAvatarStore;
