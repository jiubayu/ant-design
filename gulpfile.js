// gulp 只编译但是不打包 会保留之前的目录结构层级
const gulp = require('gulp'); // 定义执行任务的
const path =require('path');
const rimraf = require('rimraf'); // rm -rf
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2'); // 合并流
const { compilerOptions} = require('./tsconfig.json');

const tsConfig = {
    moduleResolution: 'node',
    esModuleInterop: true,
    experimentalDecorators: true,
    jsx: 'preserve', // jsx如何处理 preserve：不处理 react：变成react.createElement
    noUnusedParameters: true, // 不能有未使用的参数
    noUnusedLocals: true, // 不能有未使用的本地变量
    noImplicitAny: true,
    allowSyntheticDefaultImports: true, // 允许默认导入
    target: 'es6',
    ...compilerOptions
}
const babelConfig = require('./babel.config');
// 准备好要编译的文件
// glob 文件匹配模版 类似于正则
const source = [
    'components/**/*.{js,ts,jsx,tsx}',
    '!components/**/*.stories.{js,ts,jsx,tsx}',
    '!components/**/e2e/*',
    '!components/**/unit/*',
];
// /Users/yangtianbao/learn/javascript/zhufeng/trainCamp/antd_library/ant-degign/components
const base = path.join(process.cwd(), 'components');
function getProjectPath(filePath) {
    return path.join(process.cwd(), filePath);
}
// /Users/yangtianbao/learn/javascript/zhufeng/trainCamp/antd_library/ant-degign/lib
const libDir = getProjectPath('lib');
// /Users/yangtianbao/learn/javascript/zhufeng/trainCamp/antd_library/ant-degign/es
const esDir = getProjectPath('es');
/**
 * 
 * @param {*} modules 是否转换模块
 */
function compile(modules){
    const targetDir = modules == false ? esDir : libDir;
    rimraf.sync(targetDir); // 删除老的内容
    // 把文件匹配模式传给gulp，gulp会按照这个模式把文件匹配出来
    // ts转译后会生生成一个流，一个流是js，一个流是类型声明d.ts
    const {js,dts} = gulp.src(source, {base}).pipe(ts(tsConfig));
    const dtsStream = dts.pipe(gulp.dest(targetDir));
    let jsStram = js;
    if(modules) { // 如果需要转译，就用babel进行转译
        jsStram= js.pipe(babel(babelConfig));
    }
    jsStram = jsStram.pipe(gulp.dest(targetDir));
    return merge2([jsStram, dtsStream]);
}
gulp.task('compile-with-es', (done) => {
    console.log('compile to es');
    compile(false).on('finish', done);
})
gulp.task('compile-with-lib', (done) => {
    console.log('compile to lib');
    compile(true).on('finish', done);
})
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'))
