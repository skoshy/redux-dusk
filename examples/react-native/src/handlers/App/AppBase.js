import { createHandler } from 'redux-dusk';

export const {
  nameSpace,
  types,
  actions,
  reducer,
} = createHandler({
  nameSpace: 'APP',
  initialState: {
    theme: 'light',
  },
  types: {
    SET: {
      THEME: {
        action: ['theme'],
        reducer: {
          reduce: ['theme'],
        },
      },
    },
  },
});
