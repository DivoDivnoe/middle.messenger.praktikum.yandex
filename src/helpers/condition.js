import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper('condition', (condition, value) => (condition ? value : ''));
