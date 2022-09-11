import styles from './500.module.css';
import ErrorMessage from '@/modules/ErrorMessage/ErrorMessage';
import renderDOM from '@/utils/helpers/renderDOM';

window.addEventListener('DOMContentLoaded', () => {
  const errorMessage = new ErrorMessage({ props: { errorCode: 500, errorText: 'Мы уже фиксим' } });
  const app = renderDOM('#app', errorMessage);

  app.classList.add(String(styles.serverErrorPage));
});
