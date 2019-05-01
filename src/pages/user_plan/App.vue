<template>
  <div id="app">
    <Navbar/>
    <vue-particles
      color="#22546f"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#37868a"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="1"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <display-current-user-plan></display-current-user-plan>
    <user-plan-form></user-plan-form>
    <receive-paypal-user-plan-payment/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import DisplayCurrentUserPlan from "../../components/UserPlan/DisplayCurrentUserPlan.vue";
import UserPlanForm from "../../components/UserPlan/UserPlanForm.vue";
import ReceivePaypalUserPlanPayment from "../../components/UserPlan/ReceivePaypalUserPlanPayment.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    DisplayCurrentUserPlan,
    UserPlanForm,
    ReceivePaypalUserPlanPayment
  },
  data() {
    return {};
  },
  mounted: function() {
    var token = "JWT " + this.$cookies.get("token");
    var lang;
    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html {
  background-color: #ffffff;
}

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
