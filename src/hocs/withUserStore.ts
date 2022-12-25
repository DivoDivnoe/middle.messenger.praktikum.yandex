import BaseComponent from '@/utils/components/BaseComponent';
import withStore from './withStore';

const mapUserStateToProps = (
  state: Record<string, unknown> & { user: { data: Record<string, unknown> } },
): { user: Record<string, unknown> } => ({
  user: state.user?.data || {},
});

const withUserStore = (Component: typeof BaseComponent) => {
  return withStore(mapUserStateToProps)(Component);
};

export default withUserStore;
