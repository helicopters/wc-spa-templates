import Author from '../views/Author'
import Bind from '../views/Bind'

export default [{
  path: '/author',
  name: 'Author',
  component: Author,
  meta: {
    auth: false,
    title: '微信授权'
  }
}, {
  path: '/bind',
  name: 'bind',
  component: Bind,
  meta: {
    auth: false,
    title: ' '
  }
}]