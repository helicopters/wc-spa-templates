/* 因为 router  已经默认给出了 path alias, 所以这里可以这么引入 */
import router from '@/router'

router.afterEach((to) => {
	document.title = to.meta.title || '首页'
})
