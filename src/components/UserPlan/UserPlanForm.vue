<template>
  <div class="user-plan-form">
    <h4>Upgrade to PRO plan</h4>
    <b-form  @submit.prevent @submit="onSubmit">
      <b-col sm="3">
          <label for="nMonths">Number of months:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input
            id="nMonths"
            v-model="userPlanForm.nMonths"
            required
            placeholder="Nº of months"
        ></b-form-input>
        <br/>
        <b-col sm="9">
        <b-button class="send-button" type="submit" variant="primary">Send</b-button>
        </b-col>
      </b-col>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'UserPlanForm',
    data () {
      return {
        userPlanForm: {
          nMonths:'',
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
          var token = 'JWT ' + this.$cookies.get('token')
        const baseURI = 'http://localhost:8000/api/v2/payUserPlan'
        const formData = new FormData();
        formData.append('nMonths', this.userPlanForm.nMonths);
        this.$http.post(baseURI, formData, { headers: { Authorization: token }})
        .then((result) => {
            alert(result.data.message);
            if(result.data.userplan_pk != null){
              this.$http.get('http://localhost:8000/api/v1/pagos/paypal_userPlan_payment?userplan_pk=' + result.data.userplan_pk, 
              { headers: { Authorization: token } })
                  .then(result => {
                  window.location.href = result.data.redirect_url;
                })
              }
        })
        }
      } 
    }

</script>

<style>
.send-button {
  text-align: center;
}

.user-plan-form{
    margin: 2em;
}
</style>

