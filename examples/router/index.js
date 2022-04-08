import Vue from 'vue'
import Router from 'vue-router'

const _import = file => () => import('../pages/' + file + '.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      name: 'index',
      path: '/index',
      component: _import('index')
    },
    {
      name: 'preview',
      path: '/preview/:id',
      component: _import('preview')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
