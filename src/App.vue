<template>
  <div id="app">
    <Navbar></Navbar>
    <!-- <vuexTest> </vuexTest> -->
    <router-view/>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
// import vuexTest from '@/components/vuexTest'


export default {
  data() {
    return{
      dataFromServer: null
    }
  },
  components:{
    Navbar
    // vuexTest
  },
  methods:{

  }

}
</script>
<style>

</style>
