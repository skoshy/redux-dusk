export default {
  getSiteData: () => ({
    siteTitle: `redux-dusk Example`,
  }),
  getRoutes: async () => {
    return [
      {
        path: `/`,
        component: `src/pages/Trello`,
      },
      {
        path: `/reddit`,
        component: `src/pages/Reddit`,
      },
      {
        is404: true,
        component: `src/pages/404`,
      },
    ];
  },

  /*
  ** there are some issues with customizing webpack for react-static currently.
  ** see this if you get an error about extract-text-webpack-plugin
  ** - https://github.com/nozzle/react-static/issues/601#issuecomment-429574588
  **
    webpack: [ // array of functions that can append rules and things to webpack config
      (config, { defaultLoaders }) => {
        // eslint-disable no-param-reassign
        config.module.rules = [
          {
            oneOf: [
              defaultLoaders.cssLoader,
              defaultLoaders.jsLoader,
              defaultLoaders.fileLoader,
            ],
          },
        ];

        return config;
        // eslint-enable no-param-reassign
      },
    ],
  **
  **
  */
};
