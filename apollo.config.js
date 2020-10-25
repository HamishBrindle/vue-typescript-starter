require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'shopify',
      url: process.env.GRAPHQL_ENDPOINT,
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.ACCESS_TOKEN,
      },
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
      'src/**/*.ts',
    ],
  },
};
