import BaseComponent, { ComponentProps, PropsTypes } from '@/utils/components/BaseComponent';
import store, { StoreEvent } from '@/utils/components/Store';
import isEqual from '@/utils/helpers/isEqual';

const withStore = (
  mapStateToProps: (state: Record<string, unknown>) => Record<string, unknown>,
) => {
  return (Component: typeof BaseComponent) => {
    let currentState: Record<string, unknown>;

    return class WithStore extends Component {
      constructor(options: ComponentProps<PropsTypes>) {
        const { props, listeners = {} } = options;
        currentState = mapStateToProps(store.getState());

        super({ props: { ...props, ...currentState }, listeners } as ComponentProps<PropsTypes>);

        store.on(StoreEvent.UPDATED, () => {
          const state = mapStateToProps(store.getState());

          if (!isEqual(currentState, state)) {
            this.updateProps({ ...state });
          }
        });
      }
    };
  };
};

export default withStore;
