import { TemplateDelegate } from 'handlebars';
import template from './AvatarForm.hbs';
import styles from './AvatarForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import '../../utils/helpers/condition';

type AvatarFormProps = {
  isError?: boolean;
};

class AvatarForm extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<AvatarFormProps>) {
    const { isError = false } = props;
    const button = AvatarForm._initButton();
    const input = AvatarForm._initInput();

    super({ props: { styles, button, input, isError }, listeners });
  }

  private static _initButton(): Button {
    const button = new Button({
      props: {
        content: 'Поменять',
        type: ButtonType.SUBMIT,
      },
    });

    return button;
  }

  private static _initInput(): Input {
    const input = new Input({
      props: {
        name: 'file',
        type: InputType.FILE,
        required: true,
      },
    });

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default AvatarForm;
