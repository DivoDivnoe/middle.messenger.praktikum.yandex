import {
  BaseComponentConstructor,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import store, { StateProps, StoreEvent } from '@/utils/components/Store';
import deepClone from '@/utils/helpers/deepClone';
import isEqual from '@/utils/helpers/isEqual';

const withStore = <T, P extends PropsTypes = PropsTypes>(
  mapStateToProps: (state: StateProps) => T,
) => {
  return (Component: BaseComponentConstructor<P & T>): BaseComponentConstructor<P> => {
    let currentState: T;

    return class extends Component {
      constructor(options: ComponentProps<P>) {
        const { props, listeners = {} } = options;
        currentState = deepClone(mapStateToProps(store.getState()));

        super({ props: { ...props, ...currentState }, listeners });

        store.on(StoreEvent.UPDATED, () => {
          const state = deepClone(mapStateToProps(store.getState()));

          console.log('update', currentState, state);

          if (!isEqual(currentState, state)) {
            this.updateProps(state as P & T);
            currentState = state;
          }
        });
      }
    };
  };
};

export default withStore;
