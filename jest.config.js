module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
    },
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[tj]s?(x)'
    ],
  };
  