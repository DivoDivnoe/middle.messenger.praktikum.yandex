import { TemplateDelegate } from 'handlebars';
import template from './profile.hbs';
import styles from './profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Profile from '@/modules/Profile';
import BackArrow from '@/modules/BackArrow/BackArrow';

type ProfilePageProps = {
  styles: typeof styles;
};

export class ProfilePage extends BaseComponent<ProfilePageProps> {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const profile = new Profile();
    const arrowButton = new BackArrow();

    this.addChildren({ profile, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ProfilePage;
