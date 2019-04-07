<template>
    <div>
        <b-card :title="userPlan.currentUserPlan" :sub-title="userPlan.expirationDate">
          <b-card-text>
          </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'DisplayCurrentUserPlan',
    data(){
        return{
            userPlan:{},
        }
    },
    mounted: function(){
        var token = 'JWT ' + this.$cookies.get('token')
        this.$http.get('http://localhost:8000/api/v2/currentUserPlan',{ headers:
        { Authorization: token }
            }).then((result) => {
                this.userPlan = result.data
            })

    }  
}
</script>
