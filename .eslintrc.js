module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'jest/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:cypress/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': { 'jsx': true },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0,
        'react/prop-types': 0
    },
    'plugins': ['react', 'jest'],
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
}