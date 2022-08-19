import template from './index.hbs';
import buttonStyles from './src/components/button';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  app.innerHTML = template({ content: 'content', buttonStyles });
});
