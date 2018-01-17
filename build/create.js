/*
	懒得说怎么做的了,  允许传递两个参数, 第一个参数是文件名, 第二个参数是title
*/

var cp = require('shelljs').cp;
var mkdir = require('shelljs').mkdir;
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
// 给定需要复制的文件的路径
var tplPath = path.resolve(process.cwd(), 'build/.standard/tpl.vue');
var distPath = path.resolve(process.cwd(), 'src/views');
// 获取用户所有输入的参数
var list = process.argv.slice(2);
// 读取需要复制去的目录下面的所有目录
var targetFileList = fs.readdirSync(path.resolve(process.cwd(), 'src/views'));
// 对list 和 targetFileList 做差集, 去掉list 中, 所有存在于 targetFileList 中的值
// 通过这种方式, 来避免新建了一个已经存在的目录, 从而覆盖掉原来的项目
// 先为 list, 即用户输入加入一个文件后缀 .vue
// list = list.map((v)=>{
// 	return v + '.vue';
// });

let file = list[0] + '.vue';

let isExists = false;

targetFileList.forEach(function(item) {


    if (item == file) {
        console.log(chalk.bold.green('已经存在' + item));
        // list.splice(list.indexOf(item), 1);
        isExists = true;
    }
});

if (isExists) {

    console.log();
    console.log();

    return;
}

console.log();
// 然后生成文件

fs.writeFile(distPath + '/' + file, fs.readFileSync(tplPath));

console.log(chalk.bold.green(file + '添加成功'));

console.log();
console.log();

//  =====================================================
// 要为路由文件追加路由
let route = path.resolve(process.cwd(), 'src/router/routes.js');

let v = list[0]

let title = list[1] || " "

v = v.split('.')[0];
let importTpl = `const ${v} = () => import(/* webpackChunkName: "${v}" */'../views/${v}');\n//>>>appendImport`
let routeTpl = `{
		path: '/${v.toLowerCase()}',
		name: '${v}',
		component: ${v},
		meta: {
			auth: false,
			title: "${title}"
		}
	},
	//>>>appendRoute`
let res = fs.readFileSync(route).toString();
res = res.replace('//>>>appendImport', importTpl);
res = res.replace('//>>>appendRoute', routeTpl);
fs.writeFileSync(route, res);



/* 生成一份映射表 */


let cmap = path.resolve(process.cwd(), 'src/router/map.md');
let line = `${v}.vue 	/${v.toLowerCase()} 	${title}
>>>>abc`

let wc = fs.readFileSync(cmap).toString();
wc = wc.replace('>>>>abc', line);
fs.writeFileSync(cmap, wc);














