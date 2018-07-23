/* 
## 具体实现过程 
期望
npm run create --init Banner 广告位
会导致:
1. 生成 BannerList.vue, BannerManager.vue 文件, 并且文件中已经存在内容 
2. 生成文件引入
import BannerList 	 from 'views/BannerList'
import BannerManager from 'views/BannerManager'
3. 生成路由
    {
        path: '/banner',
        component: Layout,
        name: '广告位',
        noDropdown: false,
        children: [{
                path: 'list',
                component: BannerList,
                name: '广告位列表'
            }, {
                path: 'manager',
                component: BannerManager,
                name: '广告位管理'
            }
        ]
    }
*/
let cp = require('shelljs').cp;
let mkdir = require('shelljs').mkdir;
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
/*
	1 先获取用户的参数输入
	2 再获取 views 目录下所有的文件名列表
	3 对获取的目录列表做一下处理, 包括
		删除 DS_store 文件
		删除 不是以 .vue 结尾的元素
		对 .vue 结尾的名字, 去掉 .vue
*/
let [routerPath, routerName] = process.argv.slice(2);
let views = fs.readdirSync(path.resolve(process.cwd(), 'src/views'));
let viewsHandler = () => {
    /* 删除 DS_store 文件 */
    views.shift(1);
    /* 筛选掉目录 */
    views = views.filter(name => {
        return name.indexOf('.vue') > -1;
    });
    /* 获取所有的 .vue 的名字 */
    views = views.map(name => {
        return name.split('.')[0];
    });
}
viewsHandler();
/*
	循环对比用户输入和获取的文件列表
	如果已经存在相同的, 直接报错
*/
let contrast = () => {
    return new Promise((resolve, reject) => {
        if ((views.indexOf(routerPath + 'List') > -1) || (views.indexOf(routerPath + 'Manager') > -1)) {
            reject();
        } else {
            resolve();
        }
    });
}
/*
	对比结束之后, 如果不存在, 就可以开始创建了
*/
let createFiles = () => {
    let listFile = `${path.resolve(process.cwd(), 'src/views')}/${routerPath}List.vue`;
    let managerFile = `${path.resolve(process.cwd(), 'src/views')}/${routerPath}Manager.vue`;

    let listTpl = path.resolve(process.cwd(), 'build/.standard/list.vue');
    let managerTpl = path.resolve(process.cwd(), 'build/.standard/manager.vue');

    fs.writeFile(listFile, fs.readFileSync(listTpl));
    console.log(chalk.bold.green(`${routerPath}List.vue 创建成功`));
    fs.writeFile(managerFile, fs.readFileSync(managerTpl));
    console.log(chalk.bold.green(`${routerPath}Manager.vue 创建成功`));
    console.log();
}

/* 追加 routers 文件 */
let append = () => {

	let routerConfigFile = path.resolve(process.cwd(), 'src/router/routes.js');
	let importContent = `
/* ${routerName} */
import ${routerPath}List from 'views/${routerPath}List'
import ${routerPath}Manager from 'views/${routerPath}Manager'
//>>appendImport
	`
	let routerConfigContent = `{
	    path: '/${routerPath.toLowerCase()}',
	    component: Layout,
	    name: '${routerName}',
	    noDropdown: false,
	    children: [{
	            path: 'list',
	            component: ${routerPath}List,
	            name: '${routerName}列表'
	        }, {
	            path: 'manager',
	            component: ${routerPath}Manager,
	            name: '${routerName}管理'
	        }
	    ]
	},
	//>>appendRoute`;


	let temp = fs.readFileSync(routerConfigFile).toString();

	temp = temp.replace('//>>appendImport', importContent);
	temp = temp.replace('//>>appendRoute', routerConfigContent);

	fs.writeFileSync(routerConfigFile, temp);
}

contrast().then(res => {
    /* 在 views 里面新建文件 */
    createFiles();
    /* 读取 routers.js, 放置 import 语句*/
    append();
}).catch(err => {
	console.log(chalk.bold.red('已经存在文件'));
    console.log();
    if (err) console.log(err);
})