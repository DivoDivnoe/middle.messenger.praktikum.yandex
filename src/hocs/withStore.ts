import {
  BaseComponentConstructor,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import store, { StateProps, StoreEvent } from '@/utils/components/Store';
import isEqual from '@/utils/helpers/isEqual';

const withStore = <T>(mapStateToProps: (state: StateProps) => T) => {
  return <P extends PropsTypes = PropsTypes>(Component: BaseComponentConstructor<P>) => {
    let currentState: T;

    return class extends Component {
      constructor(options: ComponentProps<P>) {
        const { props, listeners = {} } = options;
        currentState = mapStateToProps(store.getState());

        super({ props: { ...props, ...currentState }, listeners });

        store.on(StoreEvent.UPDATED, () => {
          const state = mapStateToProps(store.getState());

          if (!isEqual(currentState, state)) {
            this.updateProps({ ...state } as P & T);
            currentState = state;
          }
        });
      }
    };
  };
};

export default withStore;
