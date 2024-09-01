const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier', // 禁用与prettier冲突的规则  'prettier' 及之后的配置要放到原来添加的配置的后面，这样才能让 prettier 禁用之后与其冲突的规则
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolve': {
      node: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      },
      typescript: {},
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // 对象的最后一个可以增加【,】
    '@typescript-eslint/comma-dangle': OFF,
    // 单引号关闭
    '@typescript-eslint/quotes': OFF,
    // 需要分号
    '@typescript-eslint/semi': OFF,
    // 不允许使用var
    'no-var': ERROR,
    // 函数不需要ts标注返回类型
    '@typescript-eslint/explicit-function-return-type': OFF,
    'no-tabs': OFF,
    '@typescript-eslint/indent': OFF,
  },
  // 忽略文件
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '**/*.js',
  ],
};
