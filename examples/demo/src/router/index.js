import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tap from '@/components/Tap'
import Test from '@/components/Test'
import CheckBoxGroupDemo from '@/components/CheckBoxGroupDemo'
import Index from '@/components/Index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
