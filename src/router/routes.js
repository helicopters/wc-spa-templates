const Author = () => import(/* webpackChunkName: "Author" */'../views/Author');
//>>>appendImport

export default [
	{
		path: '/author',
		name: 'Author',
		component: Author,
		meta: {
			auth: false,
			title: "微信授权"
		}
	},
	//>>>appendRoute
]