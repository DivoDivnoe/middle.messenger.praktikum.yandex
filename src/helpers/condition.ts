import Handlebars from 'handlebars';

Handlebars.registerHelper('condition', (condition: boolean, value: string) =>
  condition ? value : '',
);
