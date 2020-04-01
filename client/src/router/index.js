import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Login from '../views/Login'
import Home from '../views/Home'
import Auth from '../views/Auth'
import Welcome from '../views/Welcome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
