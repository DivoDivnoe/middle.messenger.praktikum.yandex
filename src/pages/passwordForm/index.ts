import renderDOM from '@/utils/helpers/renderDOM';
import PasswordFormBlock from '@/modules/PasswordFormBlock';

window.addEventListener('DOMContentLoaded', () => {
  const passwordFormBlock = new PasswordFormBlock({
    props: {
      onSubmit: (...args) => {
        console.log(...args);
      },
    },
  });

  renderDOM('#app', passwordFormBlock);
});
