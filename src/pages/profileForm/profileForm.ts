import { TemplateDelegate } from 'handlebars';
import template from './profileForm.hbs';
import styles from './profileForm.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import ProfileForm from '@/modules/ProfileForm';
import BackArrow from '@/modules/BackArrow/BackArrow';

type ProfileFormPageProps = { styles: typeof styles };

class ProfileFormPage extends BaseComponent<ProfileFormPageProps> {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const profileFormComp = new ProfileForm({ props: {} });
    const arrowButton = new BackArrow();

    this.addChildren({ profileFormComp, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ProfileFormPage;
