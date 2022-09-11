import styles from './404.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ErrorMessage from '@/modules/ErrorMessage/ErrorMessage';

window.addEventListener('DOMContentLoaded', () => {
  const errorMessage = new ErrorMessage({ props: { errorCode: 404, errorText: 'Не туда попали' } });
  const app = renderDOM('#app', errorMessage);

  app.classList.add(String(styles.notFoundPage));
});
