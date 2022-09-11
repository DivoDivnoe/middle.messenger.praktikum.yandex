import styles from './signup.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import SignupForm from '@/modules/SignupForm';
import { SubmitDataProps } from '@/modules/SignupForm/SignupForm';

window.addEventListener('DOMContentLoaded', () => {
  const signupForm = new SignupForm({
    props: { onSubmit: (data: SubmitDataProps) => console.log(data) },
  });
  const app = renderDOM('#app', signupForm);

  app.classList.add(String(styles.signupPage));
});
