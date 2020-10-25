const webpack = require('webpack');
const path = require('path');
const S3Plugin = require('webpack-s3-plugin');
const shell = require('shelljs');
const marked = require('marked');
const CreateFileWebpack = require('./build/CreateFileWebpack');
const s3Config = require('./build/s3.config');
const constants = require('./src/constants.json');

const deploy = (process.env.AWS_S3_DEPLOY !== undefined);

// Get a commit tag for tracking version of static site
const { stdout: commit } = shell.exec('git rev-parse HEAD', { silent: true });

const plugins = [
  // Create file with current commit
  new CreateFileWebpack({
    path: './dist',
    fileName: '.commit',
    content: commit,
  }),
  new webpack.ProvidePlugin({
    _: 'lodash',
  }),
];

if (deploy) {
  const s3Deployment = new S3Plugin(s3Config);
  plugins.push(s3Deployment);
}

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: process.env.VUE_APP_PORT || 8118,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader');

    config
      .plugin('html')
      .tap((args) => {
        let title = constants.appName;
        if (process.env.VUE_APP_ENV !== 'production') {
          title = `[${process.env.VUE_APP_ENV}] ${title}`;
        }
        // eslint-disable-next-line no-param-reassign
        args[0].title = title;
        return args;
      });

    config.module.rule('md')
      .test(/\.md/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .options({ renderer: new marked.Renderer() });
    // Note: In the future, we can use option `baseUrl` and pull in
    // docs specific to a deployment so all links in the markdown
    // are relative to it
  },
  configureWebpack: {
    plugins,
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.vue', '.ts', '.json'],
      alias: {
        '@': `${__dirname}/src`,
      },
    },
  },
  transpileDependencies: [
    'vuetify',
    'vuex-persist',
    '@vuex-orm/core',
  ],
};
