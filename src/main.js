import Vue from 'vue'
import App from './App.vue'
import router from './router'

import wcSwiper from './components/common/wc-swiper'    /*轮播*/
Vue.use(wcSwiper);
Vue.prototype.$bus = new Vue()  /*定义全局变量*/

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
