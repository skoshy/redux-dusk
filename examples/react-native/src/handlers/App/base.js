import { createHandler } from 'redux-dusk';

export const {
  nameSpace,
  types,
  actions,
  reducer,
} = createHandler({
  nameSpace: `APP`,
  initialState: {
    themeName: `light`,
  },
  types: {
    SET: {
      THEME_NAME: {
        action: [`themeName`],
        reducer: {
          reduce: [`themeName`],
        },
      },
    },
  },
});
