module.exports = {
  parser: 'babel-eslint',
  extends: [
    'vue',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['prettier', 'vue', 'import', 'promise'],
  rules: {
    'prefer-const': 2,
    'no-duplicate-imports': 0,
    'promise/param-names': 0
  }
};
