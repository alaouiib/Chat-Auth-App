import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import VueChatScroll from 'vue-chat-scroll'

Vue.config.productionTip = false
Vue.use(VueChatScroll)

let app = null;
firebase.auth().onAuthStateChanged(() => { // we do that to be sure that the data request has been passed successfully
  if(!app){
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
}

})
