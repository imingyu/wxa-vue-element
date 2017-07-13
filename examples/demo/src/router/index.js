import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tap from '@/components/Tap'
import Test from '@/components/Test'
import CheckBoxGroup from '@/components/CheckBoxGroup'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CheckBoxGroup',
      component: CheckBoxGroup
    }
  ]
})
