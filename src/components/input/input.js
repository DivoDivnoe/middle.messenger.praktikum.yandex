import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './input.hbs';
import '../../helpers/condition';

Handlebars.registerPartial('input', template);
