import styles from './passwordForm.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import PasswordForm from '../../modules/PasswordForm';
import ArrowButton from '../../components/ArrowButton';
import { ArrowButtonType } from '../../components/ArrowButton/ArrowButton';

window.addEventListener('DOMContentLoaded', () => {
  const passwordForm = new PasswordForm({
    props: {
      onSubmit: (...args) => {
        console.log(...args);
      },
    },
  });
  const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });

  const app = renderDOM('#app', passwordForm);
  renderDOM('#app', arrowButton);

  app.classList.add(String(styles.passwordFormPage));
});
