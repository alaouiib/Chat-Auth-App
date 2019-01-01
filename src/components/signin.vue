<template>
  <div class="signup container">
      <form class="card-panel" @submit.prevent="signin">
        <h2 class="center deep-purple-text">Sign in</h2>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password">
        </div>

        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        <div class="field center">
          <button class="btn deep-purple">Sign in</button>
        </div>
      </form>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
  data() {
    return{
      email:null,
      password:null,
      feedback:null
    }
  },
  methods:{
    signin(){
      // check that inputs are not empty
      if (this.email && this. password) {
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(()=>{
          this.$router.push({name:'Index'})
        })
        .catch(err =>{
          this.feedback = err.message
        })

      }else {
        this.feedback = "Please fill all the form"
      }
    }
  },
  created(){

  }

}
</script>

<style>
.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field{
  margin-bottom: 16px;
}

</style>
