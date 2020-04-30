import Vue from 'vue'
import Game from './Game.vue'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie);
Vue.config.productionTip = false

new Vue({
  render: h => h(Game),
}).$mount('#app')
