import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

//render: h => h(App)的完整写法：
// render: function(createElement) {
//   return createElement(App)
// }

