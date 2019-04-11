<template>

  <div id="app">
    <Navbar />
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
  mounted: function(){
        // Receiving payments
    var token = "JWT " + this.$cookies.get("token");
    if (this.$cookies.get("user_type") == "ds") {
      try {
        if (window.location.search.split("?")[1].split("&")) {
          var paypal_response = window.location.search
            .split("?")[1]
            .split("&");
          var paymentId = paypal_response[0].split("=")[1];
          var token_paypal = paypal_response[1].split("=")[1];
          var payerID = paypal_response[2].split("=")[1];
          //if(window.location.search.split("?")[0].includes("accept_paypal_userPlan_payment")){
            var processPaypalUserPlanPaymentUrl = 'http://localhost:8000/api/v1/pagos/accept_paypal_userPlan_payment?paymentId=' + paymentId + 
            '&token=' + token_paypal + '&PayerID=' + payerID;
          //}else if(window.location.search.split("?")[0].includes("cancel_paypal_userPlan_payment")){
          //  var processPaypalUserPlanPaymentUrl = 'http://localhost:8000/api/v1/pagos/cancel_paypal_userPlan_payment?paymentId=' + paymentId + 
          //  '&token=' + token_paypal + '&PayerID=' + payerID;
          //}
          this.$http
            .get(processPaypalUserPlanPaymentUrl, { headers: { Authorization: token } })
            .then(result => {
              alert(result.data.message);
            });
        }
      } catch (error) {}
    }
  } 
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
