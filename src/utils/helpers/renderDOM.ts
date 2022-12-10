import BaseComponent from '../components/BaseComponent';

const renderDOM = (query: string, block: BaseComponent): Element => {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`no element ${query}`);
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};

export default renderDOM;
