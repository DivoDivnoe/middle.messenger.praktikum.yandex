// check is item object or array
export const isObject = (item: unknown): boolean => {
  return typeof item === 'object' && item !== null;
};

const deepClone = <T>(obj: T): T => {
  if (!isObject(obj)) return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as typeof obj;
  }

  const entries = Object.entries(obj as Record<string, unknown>) as [string, unknown][];

  return entries.reduce((acc, [key, value]) => {
    acc = {
      ...acc,
      [key]: deepClone(value),
    };

    return acc;
  }, {} as T);
};

export default deepClone;
