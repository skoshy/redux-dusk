export default {
  getSiteData: () => ({
    siteTitle: 'redux-dusk Example',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/pages/Trello',
      },
      {
        path: '/reddit',
        component: 'src/pages/Reddit',
      },
      {
        is404: true,
        component: 'src/pages/404',
      },
    ];
  },
  webpack: [ // array of functions that can append rules and things to webpack config
    (config, { defaultLoaders }) => {
      /* eslint-disable no-param-reassign */
      config.module.rules = [
        {
          oneOf: [
            defaultLoaders.jsLoader,
            defaultLoaders.cssLoader,
            {
              // YAML Loader
              loader: 'yml-loader',
              test: /\.ya?ml$/,
            },
            defaultLoaders.fileLoader,
          ],
        },
      ];
      return config;
      /* eslint-enable no-param-reassign */
    },
  ],
};
