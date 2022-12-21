import { isObject } from './isObject';

type FuncType = (...props: any[]) => void;
type PrimitiveType = string | number | undefined | boolean | null | bigint;
type ObjType = Record<string, unknown>;

const isEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 === 'function') {
    return areEqualFunctions(obj1 as FuncType, obj2 as FuncType);
  }

  if (Array.isArray(obj1)) {
    if (Array.isArray(obj2)) {
      return areEqualArrays(obj1, obj2);
    } else {
      return false;
    }
  }

  if (isObject(obj1)) {
    if (isObject(obj2)) {
      return areEqualObjects(obj1 as ObjType, obj2 as ObjType);
    } else {
      return false;
    }
  }

  return arePrimitivesEqual(obj1 as PrimitiveType, obj2 as PrimitiveType);
};

const areEqualArrays = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!isEqual(arr1[i], arr2[i])) return false;
  }

  return true;
};

const areEqualObjects = (obj1: ObjType, obj2: ObjType) => {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  if (entries1.length !== entries2.length) return false;

  let equal = true;

  for (let i = 0; i < entries1.length && equal; i++) {
    const [key1, value1] = entries1[i] as [string, unknown];
    const [key2, value2] = entries2[i] as [string, unknown];

    equal = key1 === key2 && isEqual(value1, value2);
  }

  return equal;
};

const areEqualFunctions = (func1: FuncType, func2: FuncType): boolean => {
  return func1.toString() === func2.toString();
};

const arePrimitivesEqual = (first: PrimitiveType, second: PrimitiveType): boolean => {
  return first === second;
};

export default isEqual;
