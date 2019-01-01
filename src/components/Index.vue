<template>
  <div  class="center">

    <div v-if="currentUserData">
    <h1> hello {{currentUserData.alias}} </h1>
    
   </div>
    <center>
      <ul class="collection with-header">

        <li class="collection-header"><h4>Network Users</h4></li>
        <li class="collection-item" v-for="(user,index) in users" :key="user.user_id">
          <div >{{user.alias}}
            <a @click="sendMsg(index)" class="secondary-content">
              <i class="material-icons">send</i>
            </a>
          </div>
        </li>
          </ul>

    </center>


  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'Index',
  data() {
    return{
      email:null

    }
  },
  methods:{
    // sendMsg(index){
    //     this.contactedUser = this.users[index].alias
    //     console.log(this.contactedUser);
    //     this.$router.push({name:'Chat'})
    // }
    ...mapActions([
      'getUsers',
      'getCurrentUser'

    ]),
    sendMsg(index){
      this.$store.dispatch('sendMsg',index)
      .then(()=>{
        this.$router.push({name:'Chat'})
      })

    }
  },
  created(){
    this.getCurrentUser();
    this.getUsers();

  },
  computed:{
    ...mapGetters([
      'contactedUser',
      'users',
      'currentUserData'
  ])
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.collection{
  max-width: 600px;
  margin-top: 50px;
}


</style>
