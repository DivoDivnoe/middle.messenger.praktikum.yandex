import { BaseComponentConstructor, PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';
import { User } from '@/api/types';

export type UserProps = { user: User };

const mapUserStateToProps = (state: StateProps): UserProps => ({
  user: state.user.data as User,
});

const withUserStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & UserProps>,
) => {
  return withStore<UserProps, P>(mapUserStateToProps)(Component);
};

export default withUserStore;
