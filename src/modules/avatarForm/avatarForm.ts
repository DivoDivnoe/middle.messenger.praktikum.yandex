import { TemplateDelegate } from 'handlebars';
import template from './AvatarForm.hbs';
import styles from './AvatarForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import '../../utils/helpers/condition';

export type AvatarFormProps = {
  isError?: boolean;
  onSubmit: (value: FormDataEntryValue) => void;
};

class AvatarForm extends BaseComponent {
  constructor({ props }: ComponentProps<AvatarFormProps>) {
    const { isError = false, onSubmit } = props;

    super({
      props: { styles, isError, onSubmit },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            const formData = new FormData(this.getContent().querySelector('form')!);
            onSubmit(formData.get('file') as FormDataEntryValue);
          },
        ],
      },
    });
  }

  protected override init(): void {
    const button = AvatarForm._initButton();
    const input = AvatarForm._initInput();

    this.addChildren({ button, input });
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
        required: false,
      },
    });

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default AvatarForm;
