// import Hello from '../views/Hello'
// import Foo from '../views/Foo'

// const Emoji = () => import(
//    webpackChunkName: "Emoji" 
//   './pages/Emoji.vue')

const Hello = () => import(/* webpackChunkName: "Hello" */'../views/Hello');
const Foo   = () => import(/* webpackChunkName: "Foo"  */'../views/Foo')

export default [
	{
		path: '/hello',
		name: 'Hello',
		component: Hello
	},

	{
		path: '/foo',
		name: 'Foo',
		component: Foo
	}

]