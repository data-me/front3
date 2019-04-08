<template>

  <div id="app">
    <Navbar/>
    <display-current-user-plan></display-current-user-plan>
    <user-plan-form></user-plan-form>
    <Footer/>
  </div>


</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import DisplayCurrentUserPlan from '../../components/UserPlan/DisplayCurrentUserPlan.vue'
import UserPlanForm from '../../components/UserPlan/UserPlanForm.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
    DisplayCurrentUserPlan,
    UserPlanForm,
  },
  data () {
    return {
    }
  }, 
}

</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}

html {
  background-color: #ffffff;
}

</style>
