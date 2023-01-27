module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
