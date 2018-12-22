import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import Login from '@/components/Login'
import CreateLibrary from '@/components/CreateLibrary'
import NewBook from '@/components/NewBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HomePage
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/createlibrary',
      name: 'createlibrary',
      component: CreateLibrary
    },
    {
      path: '/newbook',
      name: 'newbook',
      component: NewBook
    }
  ]
})
