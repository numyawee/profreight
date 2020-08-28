// use this format since .eslintrc is deprecated.
// You can logically derive this format.

module.exports = {
    extends: [
        'plugin:flowtype/recommended',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'eslint-config-airbnb',
        'prettier',
        'prettier/flowtype',
        'prettier/react',
    ],
    plugins: [
        'react',
        'redux-saga',
        'jest',
        'flowtype',
        'prettier',
        'compat',
        'import',
    ],
    env: {
        es6: true,
        browser: true,
        node: true,
        'jest/globals': true,
        'shared-node-browser': true,
    },
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        jsx: true,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    },
    settings: {
        polyfills: ['promises'],
        flowtype: {
            onlyFilesWithFlowAnnotation: false,
        }
    }
}