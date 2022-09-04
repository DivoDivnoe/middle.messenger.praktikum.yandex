// declaration.d.ts

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';

  const content: TemplateDelegate;
  export default content;
}

declare module 'handlebars/dist/handlebars.runtime' {
  import Handlebars from 'handlebars';

  export default Handlebars;
}
