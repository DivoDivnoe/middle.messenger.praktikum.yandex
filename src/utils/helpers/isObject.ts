export const isObjectOrArray = (item: unknown): boolean => {
  return typeof item === 'object' && item !== null;
};

export const isObject = (item: unknown): boolean => {
  return isObjectOrArray(item) && !Array.isArray(item);
};
