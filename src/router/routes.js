import Author from '../views/Author';
import bind from '../views/bind';
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
	{
		path: '/bind',
		name: 'bind',
		component: bind,
		meta: {
			auth: false,
			title: " "
		}
	},
	//>>>appendRoute
]