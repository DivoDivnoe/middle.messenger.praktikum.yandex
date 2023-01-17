import {
  BaseComponentConstructor,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import store, { StateProps, StoreEvent } from '@/store/Store';
import deepClone from '@/utils/helpers/deepClone';
import isEqual from '@/utils/helpers/isEqual';

const withStore = <T, P extends PropsTypes = PropsTypes>(
  mapStateToProps: (state: StateProps) => T,
) => {
  return (Component: BaseComponentConstructor<P & T>): BaseComponentConstructor<P> => {
    return class extends Component {
      private _currentState: T;

      constructor(options: ComponentProps<P>) {
        const { props, listeners = {} } = options;
        const currentState = deepClone(mapStateToProps(store.getState()));

        super({ props: { ...props, ...currentState }, listeners });

        this._currentState = currentState;

        store.on(StoreEvent.UPDATED, () => {
          const state = deepClone(mapStateToProps(store.getState()));

          if (!isEqual(this._currentState, state)) {
            this.updateProps(state as P & T);
            this._currentState = state;
          }
        });
      }
    };
  };
};

export default withStore;
