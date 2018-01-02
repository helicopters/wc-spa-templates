const Hello = () => import(/* webpackChunkName: "Hello" */'../views/Hello');

export default [
	{
		path: '/hello',
		name: 'Hello',
		component: Hello
	}
]