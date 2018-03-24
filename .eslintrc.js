module.exports = {
    root: true, //  eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
    parser: 'babel-eslint', //使用babel-eslint来作为eslint的解析器
    parserOptions: { // 设置解析器选项
        sourceType: 'module' // 表明自己的代码是ECMAScript模块
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ['standard', 'vue'], // 继承eslint-config-standard里面提供的lint规则
    // required to lint *.vue files
    plugins: [ // 使用的插件eslint-plugin-html. 写配置文件的时候，可以省略eslint-plugin-
        "vuefix",
        'html'
    ],
    globals: { // 声明在代码中自定义的全局变量
      'wx': 'wx'
    },
    env: { // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
    },
    rules: {
      'no-tabs': 0,
      'indent': [2, 'tab'],
      "vuefix/vuefix": [2, {"auto": true}]
    }
}