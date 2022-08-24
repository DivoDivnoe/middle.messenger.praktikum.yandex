// declaration.d.ts

// import type { Transformer } from 'handlebars/types/index';

declare module '*.module.css' {
  const content: any;
  export default content;
}

declare module '*.hbs' {
  const content: any;
  export default content;
}
