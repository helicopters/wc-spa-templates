const webpack = require('webpack');
const webpackConfig = require('./webpack.scp');

const rm = require('rimraf');
const cp = require('shelljs').cp;
const mkdir = require('shelljs').mkdir;

const path = require('path');
const chalk = require('chalk');

const src = path.resolve(process.cwd(), 'static');
const target = path.resolve(process.cwd(), 'dist/static');

rm(path.resolve(process.cwd(), 'dist'), err => {

    if (err) {
        console.log(err)
    } else {
        webpack(webpackConfig, function(err, stats) {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');

            // 拷贝目录
            cp('-R', src + '/*', target);

            console.log();
            console.log(chalk.green.bold('> Build Successed!'));
            console.log();
            console.log();
        })
    }
});