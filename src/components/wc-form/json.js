form: {
    name: {
        type: 'text',
        placeholder: '请输入姓名',
        name: '姓名',
        required: true,
        value: '',
    },
    title: {
        type: 'tel',
        placeholder: '请输入手机号码',
        name: '手机号码',
        value: '',
        show: true
    },
    vcode: {
        type: 'vcode'
    },
    category: {
        type: 'popuppicker',
        placeholder: '请选择分类',
        name: '分类',
        /* 
	        因为内置使用了 show-name, 所以传递的值必须是一个对象. 
	        其次, 对象的key,value 形式, 我希望统一使用
	        key, value 的形式. 统一使用 name,value 的形式
	        而且这种 value 必须要是一个, 字符串形式的. 不能是其他的形式
	        我不限制用户, 我自己处理. 
        */
        required: true,
        data: [
            [{
                name: '第一',
                value: '1'
            }, {
                name: '第二',
                value: '2'
            }, {
                name: '第三',
                value: '3'
            }]
        ],
        value: []
    },
    deadline: {
        type: 'date',
        startDate: '2018-01-11',
        endDate: '2019-01-11',
        name: '截止日期'
    },
    desc: {
        type: 'textarea',
        name: '描述',
        placeholder: '代价好'
    },
    switch: {
        type: 'switch',
        value: true,
        name: '是否开通',
        disabled: true
    },

    numberPicker: {
        type: 'numberPicker',
        value: 10,
        max: 20,
        min: -10,
        name: '购买数量'
    },
    address: {
        type: 'address',
        value: [],
        data: [],
        name: '收件地址'
    },
    radio: {
        /* radio 和 checklist 是 key,value 的形式, 而且是一个级别的, 暂时不要关系 */
        type: 'radio',
        data: [{
            key: '1',
            value: 'hello'
        }, {
            key: 2,
            value: 'world'
        }],
        name: '单选 ',
        /* radio 的value 是一个字符串*/
        value: '',
        required: true,
    },

    checklist: {
        type: 'checklist',
        data: [{
            key: '1',
            value: '优先选择'
        }, {
            key: '2',
            value: '品质监护'
        }, {
            key: '3',
            value: '其他'
        }],

        name: '多选',
        value: []
    },
    upload: {
        type: 'upload',
        data: ['http://n.sinaimg.cn/news/1_img/upload/cf3881ab/w1000h670/20180116/d-lE-fyqrewi5768771.jpg'],
        value: []
    }
},