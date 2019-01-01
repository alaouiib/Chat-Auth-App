import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import signup from '@/components/signup.vue'
import signin from '@/components/signin.vue'
import vuexTest from '@/components/vuexTest.vue'
import Chat from '@/components/Chat.vue'

import firebase from 'firebase'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth:true
      }
    }
  ]
})
// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // User is signed in. Proceed to route
      next()
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'signin'
      })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router
