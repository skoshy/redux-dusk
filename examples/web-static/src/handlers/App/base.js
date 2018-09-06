import { createHandler } from '../../lib';

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'APP',
  initialState: {
    user: {
      firstName: '',
    },
  },
  types: {
    SET: {
      USER: {
        action: [],
        reducer: [{ loading: true }],
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
