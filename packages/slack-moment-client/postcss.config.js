const env = process.env.NODE_ENV || 'development';

module.exports = {
  root: './src/css',
  plugins: {
    development: {
      'postcss-easy-import': {},
      autoprefixer: {}
    },
    production: {
      'postcss-easy-import': {},
      autoprefixer: {},
      csswring: {}
    }
  }[env],
  'local-plugins': true,
  map: 'file',
  'postcss-easy-import': {
    root: './src/css',
    glob: true,
    onImport: sources => {
      global.watchCSS(sources, this.from);
    }
  },
  autoprefixer: {
    browsers: ['last 2 versions']
  }
};
