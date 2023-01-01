import { TemplateDelegate } from 'handlebars';
import template from './AvatarForm.hbs';
import styles from './AvatarForm.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import '../../utils/helpers/condition';
import isEqual from '@/utils/helpers/isEqual';

export type AvatarFormProps = {
  isError?: boolean;
  isUploadError?: boolean;
  fileName: string | null;
  styles: typeof styles;
};

class AvatarForm extends BaseComponent<AvatarFormProps> {
  constructor() {
    super({
      props: { styles, isError: false, isUploadError: false, fileName: null },
      listeners: {
        submit: [
          async (evt) => {
            evt.preventDefault();

            await this._onSubmit();
          },
        ],
      },
    });

    this._subscribeForm();
  }

  protected override init(): void {
    const button = AvatarForm._initButton();
    const input = AvatarForm._initInput();

    this.addChildren({ button, input });
  }

  private static _initButton(): Button {
    return new Button({ props: { content: 'Поменять', type: ButtonType.SUBMIT } });
  }

  private static _initInput(): Input {
    return new Input({ props: { name: 'file', type: InputType.FILE, required: false } });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  private async _onSubmit() {
    const formData = new FormData(this.getContent().querySelector('form') as HTMLFormElement);
    const fileData = formData.get('file') as FormDataEntryValue;

    console.log('file', fileData);

    if (fileData instanceof File) {
      const { name: fileName } = fileData;

      this.updateProps({ isError: !!fileName.length });

      if (!fileName.length) {
        this.updateProps({ isError: true });
      }
    }

    // await userController.updateAvatar(formData.get('file') as FormDataEntryValue);
  }

  protected override componentDidUpdate(
    oldTarget: AvatarFormProps,
    target: AvatarFormProps,
  ): boolean {
    return !isEqual(oldTarget, target);
  }

  _subscribeForm() {
    (this.getContent().querySelector('input') as HTMLInputElement).addEventListener(
      'input',
      (evt) => {
        const { files } = evt.target as HTMLInputElement;

        if (files) {
          const fileName = files[0]?.name;

          if (fileName) {
            this.updateProps({ fileName, isError: false });
          }
        }
      },
    );
  }
}

export default AvatarForm;
