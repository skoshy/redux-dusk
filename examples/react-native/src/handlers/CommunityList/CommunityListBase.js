import { createHandler } from 'redux-dusk';

export const {
  nameSpace,
  types,
  actions,
  reducer,
} = createHandler({
  nameSpace: 'COMMUNITY_LIST',
  initialState: {
    communities: [
      {
        name: 'SW - AB/CW',
      },
      {
        name: 'Otter Development',
      },
    ],
  },
  types: {
    
  },
});
