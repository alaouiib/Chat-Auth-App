<template>
  <div class="signup container">
      <form class="card-panel" @submit.prevent="signup">
        <h2 class="center deep-purple-text">Signup</h2>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password">
        </div>
        <div class="field">
          <label for="name">Alias</label>
          <input id="name" type="text" v-model="alias">
        </div>
        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        <div class="field center">
          <button class="btn deep-purple">Signup</button>
        </div>
      </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'

export default {


  data() {
    return{
      email:null,
      password:null,
      alias:null,
      feedback:null
    }
  },
  methods:{
    signup(){
      // check that inputs are not empty
      if (this.alias && this.email && this. password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
            if(doc.exists){
            this.feedback = 'this alias already taken - please choose another one';
            }else {
              // create user
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
            .then((cred)=>{
              // we use set because we are about to save extra information
              // for the same created user
              ref.set({
                email: this.email,
                alias: this.alias,
                user_id: cred.user.uid
              })
            })
            .then(()=>{

              this.$router.push({name:'Index'})
            })
            .catch(err =>{
              console.log(err);
              this.feedback = err.message
            })

            }
          })

      }else {
        this.feedback = "Please enter an Alias"
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
