import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper('not', (condition) => !condition);
