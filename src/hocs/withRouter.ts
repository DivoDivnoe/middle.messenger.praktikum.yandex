import BaseComponent, { ComponentProps, PropsTypes } from '@/utils/components/BaseComponent';
import router from '@/utils/components/Router';

export type RouterProps = {
  router: typeof router;
};

export type WithRouter<T> = T & RouterProps;

const withRouter = <P extends PropsTypes = PropsTypes>(Component: typeof BaseComponent) => {
  return class WithRouter extends Component<P, ComponentProps<P> & RouterProps> {
    constructor(options: ComponentProps<P>) {
      super({ ...options, router });
    }
  };
};

export default withRouter;
