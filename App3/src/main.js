import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import Vuetify from 'vuetify'
import {sync} from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

import Panel from '@/components/globals/Panel'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.component('panel', Panel)

sync(store, router)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
