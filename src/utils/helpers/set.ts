import { isObject, isObjectOrArray } from './isObject';

type Indexed = Record<string, unknown>;

const merge = (left: Indexed, right: Indexed): Indexed => {
  for (const key in right) {
    if (!Object.prototype.hasOwnProperty.call(right, key)) {
      continue;
    }

    try {
      if (isObject(right[key])) {
        left[key] = merge(left[key] as Indexed, right[key] as Indexed);
      } else {
        left[key] = right[key];
      }
    } catch (e) {
      left[key] = right[key];
    }
  }

  return left;
};

const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (!isObjectOrArray(object)) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object as Indexed, result);
};

export default set;
