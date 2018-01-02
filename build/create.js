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
list = list.map((v)=>{
	return v + '.vue';
});
targetFileList.forEach(function(item){
	if (list.indexOf(item) > -1) {
		console.log(chalk.bold.green('已经存在' + item));
		list.splice(list.indexOf(item), 1);
	}
});
console.log();
// 然后生成文件
list.forEach((v) => {
	fs.writeFile(distPath + '/' + v, fs.readFileSync(tplPath));
	console.log(chalk.bold.green(v + '创建成功'));
});

//  =====================================================
// 要为路由文件追加路由
let route = path.resolve(process.cwd(), 'src/router/routes.js');
list.forEach((v)=>{
	v = v.split('.')[0];
	let importTpl = `const ${v} = () => import(/* webpackChunkName: "${v}" */'../views/${v}');\n//>>>appendImport`
	let routeTpl = `{
		path: '/${v.toLowerCase()}',
		name: '${v}',
		component: ${v}
	},
	//>>>appendRoute`
	let res = fs.readFileSync(route).toString();
    res = res.replace('//>>>appendImport', importTpl);
    res = res.replace('//>>>appendRoute', routeTpl);
    fs.writeFileSync(route, res);
    console.log(chalk.green(`${v} 路由创建成功`));
})
