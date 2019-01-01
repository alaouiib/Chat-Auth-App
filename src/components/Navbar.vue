
<template>


  <div class="navbar">
      <nav class="green darken-1">
        <div class="container">

          <router-link :to="{ name: 'Index' }">
             <a href="" class="brand-logo left">Messenger</a></router-link>
          <ul class="right">
            <li v-if = "!user"><router-link :to="{ name: 'signup' }">Signup</router-link></li>
            <li v-if = "!user"><router-link :to="{ name: 'signin' }">Signin</router-link></li>
            <li v-if = "user"><a> {{alias}}</a> </li>
            <li v-if = "user"><a @click="logout">Log Out</a></li>
          </ul>
        </div>
      </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {

  name:'Navbar',
  data () {
      return {
        user: null,
        alias:null
      }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'signin' })
      })

    }
  },
  created(){

      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.user = user
          db.collection('users').where('user_id','==',user.uid).get()
          .then(snapshot =>{
            snapshot.forEach((doc) =>{
              this.alias = doc.id;

            })
          })
        }else {
          this.user=null
        }
      });

  }
}
</script>

<style >
.navbar nav{
  padding: 0 20px;
}
</style>
