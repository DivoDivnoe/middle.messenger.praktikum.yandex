import BaseComponent, { PropsTypes } from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/utils/components/Store';

type UserProps = { user: StateProps['user']['data'] };

const mapUserStateToProps = (state: StateProps): UserProps => ({
  user: state.user.data,
});

const withUserStore = <P extends PropsTypes = PropsTypes>(Component: typeof BaseComponent<P>) => {
  return withStore<UserProps>(mapUserStateToProps)(Component);
};

export default withUserStore;
