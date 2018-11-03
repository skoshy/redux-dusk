export const devLog = (...toLog) => {
  if (__DEV__) {           // eslint-disable-line no-undef
    console.log(...toLog); // eslint-disable-line no-console
  }
};

export const isObject = (item) => {
  return (
    typeof item === `object`
    && !Array.isArray(item)
  );
};
