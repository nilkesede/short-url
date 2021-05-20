module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-underscore-dangle': [
      'error',
      { allow: ['_getData', '_getHeaders', '_getRedirectUrl'] }
    ]
  }
}
