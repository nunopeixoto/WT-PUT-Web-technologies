import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import CreateLibrary from '@/components/CreateLibrary'
import NewBook from '@/components/NewBook'
import ManageLibrary from '@/components/ManageLibrary'
import RegisterEnhanced from '@/components/RegisterEnhanced'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/registerenhanced/:email/:libraryId',
      name: 'registerenhanced',
      component: RegisterEnhanced
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
    },
    {
      path: '/managelibrary',
      name: 'managelibrary',
      component: ManageLibrary
    }
  ]
})
