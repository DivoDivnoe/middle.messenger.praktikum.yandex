import { IBaseComponent } from '../components/BaseComponent/BaseComponent';

const renderDOM = (query: string, block: IBaseComponent): Element => {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`no element ${query}`);
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};

export default renderDOM;
