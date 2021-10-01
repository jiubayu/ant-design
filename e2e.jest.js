module.exports = {
    verbose: true, // 显示详细过程
    testEnvironment: 'jest-environment-puppeteer',
    setupFiles: ['./tests/setup.js'],
    preset: 'jest-puppeteer',
    testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx'],
};