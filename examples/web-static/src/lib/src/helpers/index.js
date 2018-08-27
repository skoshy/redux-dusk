export const isArray = (obj) => {
  return Array.isArray(obj);
};

export const isFunction = (obj) => {
  return typeof obj === 'function';
};

export const isObject = (obj) => {
  // this checks if the given param is a javascript object {}
  // this returns false for [], null, etc. Must be something like {}.

  return obj === Object(obj) && !isArray(obj) && !isFunction(obj);
};
