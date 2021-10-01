module.exports = {
    presets: [
        '@babel/preset-react', // 把react编译成es5
        [
            '@babel/preset-env', // 把es6编译成es5
            {
                modules: 'auto',
                targets: {
                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
                },
            },
        ],
    ],
    plugins: [
        [ // 支持typescript
            '@babel/plugin-transform-typescript',
            {
                isTSX: true,
            },
        ], // 提供一些编译运行时帮助方法
        ['@babel/plugin-transform-runtime'],
    ],
};