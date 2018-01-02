const Hello = () => import(/* webpackChunkName: "Hello" */'../views/Hello');
//>>>appendImport

export default [
	{
		path: '/hello',
		name: 'Hello',
		component: Hello
	},
	//>>>appendRoute
]