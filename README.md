# Serverless Typescript AWS

This is a Serverless Framework Boiler Plate project using Typescript, Eslint, Prettier, and VScode debugger that is ready for developing [AWS Lambdas](https://aws.amazon.com/lambda)

## Stack

- [Node.js](https://nodejs.org/en/) 12x
- [Serverless](https://serverless.com/framework/docs/)
- [Typescript](https://www.typescriptlang.org/) (> 3.8) for type checking.

---

# Getting Started

### 1. Credentials setup

You need to have an AWS account that has developer access to use lambda. (if you are the admin of the AWS account then you can use those credentials but its not recommended)

You also need to setup your AWS credentials in your local AWS credentials file in order to communicate with AWS services and deploy your lambda to AWS.

- In your local AWS credentials file, setup your credentials, for example... if you have 2 accounts (1 personal and 1 for your job) then you can specify in the credentials. This way you can make sure you only run/deploy your lambda against the appropriate account. The [default] will not require `--aws-profile` when using sls deploy since it will take it by default. The other accounts will require `--aws-profile` in order to use.

  if you don't know where your credentials file is, then use this resource: [Location of the shared config and credentials files](https://docs.aws.amazon.com/credref/latest/refdocs/file-location.html)

  ```txt
  [default]
  aws_access_key_id=personal_XXXXXXXXXXXX
  aws_secret_access_key=11111_XXXXXXXXXX

  [FunPersonalSandBox]
  aws_access_key_id=personal_XXXXXXXXXX
  aws_secret_access_key=11111_XXXXXXXXXX

  [CompanyAWSProfile]
  aws_access_key_id=company_XXXXXXXXXXXXXXXXXX
  aws_secret_access_key=2222_XXXXXXXXX
  ```

### 2. Install Serverless Framework Globally

npm install -g serverless

### 3. clone boilerplate and install dependencies using npm/yarn

```bash
git clone https://github.com/Z11/Serverless-Typescript-AWS-Boilerplate.git
--------------------------
npm install

or

yarn

```

### 4. IDE Setup

[VSCode](https://code.visualstudio.com/) is highly preferred. Please ensure you have installed these extensions:

- Prettier
- Eslint

### 5. Local testing

- Option 1:

  ```bash
  sls invoke local -f handler

  ##or (if you have a specific aws account you want to use, for example your job aws account)
  sls invoke local -f handler --aws-profile CompanyAWSProfile
  ```

- Option 2: (best option since you can use breakpoints and have hot reloads)

  Click F5 to start the debugger and use the terminal output in VScode to find the URLs that hit your local lambda. Use Postman to hit the provided URLs with a POST.

### 6. Deploy to AWS

--aws-profile

```bash
sls deploy

##or (if you have a specific aws account you want to use, for example your job aws account)
sls deploy --aws-profile CompanyAWSProfile
```

### 7. (Only needed if you want to remove your lambda from AWS)

```bash
sls remove -v
```

---

## Resources

1. Use the AWS API DOCs !!! they are super helpful !!!! definitely needed if you want your lambda to communicate with AWS services like S3, SQS, DynamoDb, and etc... [AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

2. [Search for questions you may have on Serverless Framework](https://www.serverless.com/framework/docs/)

---

## Steps to configure your own project with Eslint and Prettier

### Add ESLint with Typescript support

[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint/)

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- Create `.eslintrc.js`

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

- Create `.eslintignore` :

```text
node_modules
.serverless
.vscode
*.config.js
.webpack
**/*.js
```

### Add Prettier

[Prettier with linters](https://prettier.io/docs/en/integrating-with-linters.html)

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

- Create `.prettierrc.js`

```js
module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
};
```

- Create `.prettierignore`

```text
node_modules
.serverless
.webpack
```

- Update `.eslintrc.js` rules

```js
extends: [
  "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
],
```

### Webpack

Enable Webpack plugin that runs TypeScript type checker on a separate process.

Update `webpack.config.js`

```js
plugins: [
  new ForkTsCheckerWebpackPlugin({
    eslint: true,
    eslintOptions: {
      cache: true,
    },
  }),
],
```
