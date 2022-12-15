import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';
import router from '@/utils/components/Router';

const onClick = (): void => {
  router.back();
};

class BackArrow {
  constructor() {
    return new ArrowButton({
      props: { type: ArrowButtonType.SIDE },
      listeners: { click: [onClick] },
    });
  }
}

export default BackArrow;
