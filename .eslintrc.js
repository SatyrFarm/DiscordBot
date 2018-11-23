module.exports = {
  'extends': [
    'eslint:recommended', 'google'
  ],
  'rules': {
    // Additional, per-project rules...
    'no-undef': 'error',
    'no-console': 'off',
    'no-extend-native': 'off',
    'arrow-parens': 'off',
    "max-len": [
      2, {
        "code": 250,
        "tabWidth": 4,
        "ignoreUrls": true
      }
    ],
    "require-jsdoc": [
      "error", {
        "require": {
          "FunctionDeclaration": false,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false,
          "FunctionExpression": false
        }
      }
    ]
  },
  'env': {
    'node': true,
    'es6': true
  },
  'parserOptions': {
    'ecmaVersion': 2017
  }
}
