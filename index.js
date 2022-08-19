import template from './index.hbs';
import buttonStyles from './src/components/button';
import inputStyles from './src/components/input';
import loginStyles from './src/modules/loginForm';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  app.innerHTML = template({ content: 'content', buttonStyles, inputStyles, loginStyles });
});
