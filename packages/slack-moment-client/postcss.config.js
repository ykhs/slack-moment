const env = process.env.NODE_ENV || 'development';

module.exports = {
  root: './src/',
  use: {
    development: ['postcss-easy-import', 'autoprefixer', 'postcss-reporter'],
    production: [
      'postcss-easy-import',
      'autoprefixer',
      'csswring',
      'postcss-reporter'
    ]
  }[env],
  'local-plugins': true,
  input: './src/css/main.css',
  output: './public/css/bundle.css',
  map: 'file',
  'postcss-easy-import': {
    root: './src/',
    glob: true,
    onImport: sources => {
      global.watchCSS(sources, this.from);
    }
  },
  autoprefixer: {
    browsers: ['last 2 versions', 'IE 11']
  }
};
