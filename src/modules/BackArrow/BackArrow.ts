import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';
import router from '@/utils/components/Router';

class BackArrow {
  constructor() {
    const onClick = (): void => {
      router.back();
    };

    return new ArrowButton({
      props: { type: ArrowButtonType.SIDE },
      listeners: { click: [onClick] },
    });
  }
}

export default BackArrow;
