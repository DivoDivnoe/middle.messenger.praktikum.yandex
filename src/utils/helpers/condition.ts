import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper('condition', (condition: boolean, value: string) =>
  condition ? value : '',
);
