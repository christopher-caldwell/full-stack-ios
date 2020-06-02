module.exports = {
    'env': {
			'es6': true
    },
    'extends': [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended'
    ],
    'globals': {
			'Atomics': 'readonly',
			'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
			'ecmaVersion': 2018,
			'sourceType': 'module'
    },
    'plugins': [
			'@typescript-eslint'
    ],
    'rules': {
			'no-console': 'off',
			'quotes': [ 2, 'single', { 'avoidEscape': true } ],
			'semi': [ 2, 'never' ],
			'comma-dangle': [ 0, 'always' ],
			'arrow-parens': 'off',
			'import/no-extraneous-dependencies': 'off',
			'space-before-blocks': 'off',
			'keyword-spacing': 'off',
			'object-curly-newline': 'off',
			'arrow-body-style': 'off',
			'padded-blocks': 'off',
			'array-bracket-spacing': [ 2, 'always' ],
			'import/prefer-default-export': 'off'
    },
    'ignorePatterns': [ 'node_modules/', '*/*.js' ]
}