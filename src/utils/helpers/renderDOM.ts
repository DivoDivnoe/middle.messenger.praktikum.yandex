import BaseComponent, { DefaultProps } from '../components/BaseComponent';

const renderDOM = <T extends DefaultProps>(query: string, block: BaseComponent<T>): Element => {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`no element ${query}`);
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};

export default renderDOM;
