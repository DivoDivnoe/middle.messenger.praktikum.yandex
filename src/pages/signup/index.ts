import styles from './signup.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import SignupForm from '@/modules/SignupForm';

window.addEventListener('DOMContentLoaded', () => {
  const signupForm = new SignupForm({ props: {} });
  const app = renderDOM('#app', signupForm);

  app.classList.add(String(styles.signupPage));
});
