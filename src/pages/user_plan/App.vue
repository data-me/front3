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





/*{
          'title': this.form.title,
          'description': this.form.description,
          'price_offered': this.form.price_offered,
          'currency': '0',
          'limit_time': '2019,12,12,10,40,0,0'
      },{ headers: {
       'Content-Type': 'multipart/form-data'
      }*/
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
