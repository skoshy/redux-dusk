import { createHandler } from 'redux-dusk';

export const {
  nameSpace,
  types,
  actions,
  reducer,
} = createHandler({
  nameSpace: 'COMMUNITY',
  initialState: {
    name: '',
  },
  types: {
    SET: {
      NAME: {
        action: ['name'],
        reducer: {
          reduce: ['name'],
        },
      },
    },
  },
});
