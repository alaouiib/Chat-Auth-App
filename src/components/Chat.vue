<template>
  <div class="chat container">
    <h2 class="center teal-text">iGarbage Chat </h2>
      <p class=" teal-text"> You are chatting with: <b style="color:#222222">{{contactedUser.alias}}</b> </p>
    <div class="card">
      <div class="card-content">

        <ul class="messages" v-chat-scroll="{always: true, smooth: true}">
          <li v-if="messages" v-for ="(message,index) in messages" :key="message.id">
            <span class="teal-text">{{message.alias}} </span>
            <span class="grey-text text-darken-3">{{message.content}}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
          <p v-if="feedback" class="red-text center">{{ feedback }} </p>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage/>
        <!-- <button @click="getCurrentUser">click to get name</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  components: {
    NewMessage
  },
  data(){
    return{
      messages:[],
      feedback:null
    }
  },
  methods:{
    ...mapActions([
      'getCurrentUser'
    ])
  },
  computed:{
    ...mapGetters([
      'currentUserData','contactedUser'
  ])
},
created(){
    this.getCurrentUser() // to get the user once the component is created
   let ref = db.collection('messages').orderBy('timestamp')

   // subscribe to changes to the 'messages' collection
   ref.onSnapshot(snapshot => {
     snapshot.docChanges().forEach(change => {
       if(change.type == 'added'){
         let doc = change.doc
         //console.log(this.currentUserData);
        // console.log(this.contactedUser);
         if (
           (doc.data().alias == this.currentUserData.alias &&
          this.contactedUser.user_id == doc.data().contactedUserUID )
           ||
           (doc.data().alias == this.contactedUser.alias &&
              this.currentUserData.user_id== doc.data().contactedUserUID )
        ) {
           this.messages.push({
             id: doc.id,
             alias: doc.data().alias,
             content: doc.data().content,
             timestamp: moment(doc.data().timestamp).format('lll'),
             contactedUser: doc.data().contactedUserUID
           })
         }


       }
     })
     if (this.messages.length == 0) {
       this.feedback = "START DISCUSSION";
     }else {
       this.feedback = null
     }

   })


 }
}
</script>

<style>
.chat h2{
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span{
  font-size: 1.4em;
}
.chat .time{
  display: block;
  font-size: 0.8em;
}
.messages{
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>
