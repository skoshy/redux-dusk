// import axios from 'axios';

export default {
  getSiteData: () => ({
    title: 'redux-dusk Example',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/pages/Reddit',
      },
      {
        path: '/trello',
        component: 'src/pages/Trello',
      },
      {
        is404: true,
        component: 'src/pages/404',
      },
    ];
  },
};
