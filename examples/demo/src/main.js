// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('./wxa-vue-element/common.less');
import WxaVueElement from './wxa-vue-element/index';

Vue.config.productionTip = false
Vue.use(WxaVueElement);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
