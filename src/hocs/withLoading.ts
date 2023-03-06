import {
  BaseComponentConstructor,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import withStore from './withStore';
import { StateProps } from '@/store/Store';

export type LoadingStoreProps = { isLoading: boolean };

const mapLoadingStateToProps = (state: StateProps): LoadingStoreProps => ({
  isLoading: state.isLoading,
});

const withLoadingStore = <P extends PropsTypes = PropsTypes>(
  Component: BaseComponentConstructor<P & LoadingStoreProps>,
) => {
  return withStore<LoadingStoreProps, P>(mapLoadingStateToProps)(Component);
};

export default withLoadingStore;
