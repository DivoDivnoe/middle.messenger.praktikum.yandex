import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonPropsType, ArrowButtonType } from '@/components/ArrowButton/ArrowButton';
import router from '@/utils/components/Router';

class BackArrow extends ArrowButton<ArrowButtonPropsType> {
  constructor() {
    const onClick = (): void => router.back();

    super({
      props: { type: ArrowButtonType.SIDE },
      listeners: { click: [onClick] },
    });
  }
}

export default BackArrow;
