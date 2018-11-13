import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import RequestList from '@/components/RequestList'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/request-list',
      name: 'requestList',
      component: RequestList,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          next();
        }
      }
    }
  ]
})
