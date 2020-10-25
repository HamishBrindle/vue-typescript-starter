require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'shopify',
      url: process.env.SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT,
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
      'src/**/*.ts',
    ],
  },
};
