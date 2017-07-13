import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tap from '@/components/Tap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tap',
      component: Tap
    }
  ]
})
