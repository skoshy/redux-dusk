import { createHandler } from '../../lib';

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'APP',
  initialState: {
    firstName: '',
  },
  types: {
    SET: {
      FIRST_NAME: {
        action: ['newFirstName'],
        reducer: [{ newFirstName: 'firstName' }],
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
