<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New message (enter to add):</label>
      <input type="text" name="new-message" v-model="newMessage" autocomplete="off">
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'NewMessage',

  data(){
    return{
      newMessage: null,
      feedback: null
    }
  },
  methods: {
    addMessage(){
      if(this.newMessage){
        db.collection('messages').add({
          content: this.newMessage,
          alias: this.currentUserData.alias,
          timestamp: Date.now(),
          contactedUserUID: this.contactedUser.user_id
        }).catch(err => {
          console.log(err)
        })
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a message in order to send one'
      }
    }
  },
  computed:{
    ...mapGetters([
      'currentUserData',
      'contactedUser'
      ])
  },
  created(){

  }

}
</script>

<style>
</style>
