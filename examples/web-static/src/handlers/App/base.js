import { createHandler } from '../../lib';

const initialState = {
  firstName: ``,
};

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: `APP`,
  initialState,
  types: {
    SET: {
      FIRST_NAME: {
        action: [`newFirstName`],
        reducer: [{ newFirstName: `firstName` }],
      },
    },
    RESET: {
      ALL: {
        action: [],
        reducer: {
          reset: true,
        },
      },
    },
  },
});
