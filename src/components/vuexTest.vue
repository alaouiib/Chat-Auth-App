<!--
<template>
  <div class="vuexTest">
    <h5> Hello from vuex Test title: {{ Title }}</h5>
    <button @click = "getData(parametere)"> click me stp  </button>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'vuexTest',
  data(){
    return {
      parametere: "SimoIsParameter"
    }
  },
  methods:{
    ...mapActions([
      'getCurrentUser'
    ])

  },
  computed:{
    Title(){
      return this.$store.state.Title
    },
    //  method 1: retrieve data from getters
    // SomeOtherData(){
    //   return this.$store.getters.SomeOtherData
    // },

    //  method 2: retrieve data from getters (mapping)
    ...mapGetters([
      'Title'
  ]),
    currentUserData(){ // access to stored data ( we use getters for projects)
      return this.$store.state.currentUserData
    }
  }

}
</script>

<style scoped >
.vuexTest{
  margin: 10px 50px ;
}
</style> -->
