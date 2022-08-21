import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './userData.hbs';

Handlebars.registerHelper('not', (condition) => !condition);
Handlebars.registerPartial('userData', template);
