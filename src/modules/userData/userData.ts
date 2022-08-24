import Handlebars from 'handlebars';
import template from './userData.hbs';

Handlebars.registerHelper('not', (condition: boolean): boolean => !condition);
Handlebars.registerPartial('userData', template);
