import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './firebase/init'

Vue.use(Vuex)

 export default new Vuex.Store({
  state: { // data to store
    // Title: 'EXPORTED FROM THE GLOBAL STORE'
    currentUserData:null,
    contactedUser:null,
    users:[]
    },
  getters:{ // seek to save a function in a component  where we handled some data, and we could use it in other components
    // Title: state => {
    // return  state.Title
    // }

    currentUserData: state =>{
      return state.currentUserData
    },
    contactedUser: state =>{
      return state.contactedUser
    },
    users: state =>{
      return state.users
    }
  },
  mutations: {

    getCurrentUser:state => {
    let user = firebase.auth().currentUser;
    db.collection('users').where('user_id','==',user.uid).get()
    .then(snapshot =>{
      snapshot.forEach((doc) =>{
      state.currentUserData = doc.data();
      //state.alias = state.currentUserData.alias;
      })
    });

  },
  sendMsg:(state,payload) =>{
      state.contactedUser = state.users[payload]
  },
  getUsers: state =>{

    db.collection('users').get()
      .then(snapshot =>{
        state.users = [];
        snapshot.forEach((doc) =>{
          if (state.currentUserData.alias != doc.data().alias) {
            state.users.push(doc.data());
          }
        })


      })
  }

  },

  // best practice to use actions even if there is no async funcs
  actions: {
    // getData: (context,payload) =>{
    //   context.commit('getData',payload)
    // }
    getCurrentUser: context =>{
      context.commit('getCurrentUser')
    },
    sendMsg: (context,payload) =>{
      context.commit('sendMsg',payload);
    },
    getUsers: context =>{
      context.commit('getUsers')
    },
    updateContactedUser: context =>{
      context.commit('updateContactedUser')
    }

    }

})
