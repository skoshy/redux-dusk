import { isArray } from '../helpers';

export const getPartFromHandlers = (handlers, part) => {
  let combinedPart;
  const handlersKeys = Object.keys(handlers);

  handlersKeys.forEach((handlerKey) => {
    const handler = handlers[handlerKey];

    if (handler[part]) {
      // determine what we should make the combined part be
      if (typeof combinedPart === `undefined`) {
        combinedPart = {};
        if (isArray(handler[part])) {
          combinedPart = [];
        }
      }

      if (isArray(combinedPart)) {
        combinedPart.push(...handler[part]);
      } else {
        combinedPart[handlerKey] = handler[part];
      }
    }
  });

  return combinedPart;
};

export default getPartFromHandlers;
