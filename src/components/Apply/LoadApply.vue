<template>
    <div>
        
          <b-card :title="item.title" :sub-title="item.status">
              
            <b-card-text>
              {{item.description}}   
              {{toggleMakeSubmition(item.id)}}
            </b-card-text>
            <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
            <b-link v-show="this.permissions == 'true' && isCompany == false">Make submit</b-link>

            <!--<div v-if="user_type === 'com'">
            <b-link href="#" @click="senderId(item.DS_User_id)" class="card-link">Data Scientist</b-link>
            <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
          </div>-->

          </b-card>


</div>


</template>

<script>


  export default {
   data () {
    return {
      items: [],
      form: {
          title: '',
          description: '',
          status: '',
          date: null,
          file: '',
          comments: ''
        },
      isCompany: null,
      permissions : '',

    }
  }, computed: {

  },
    props: ['item','index','key', 'isCompany'],
 methods: {


       toggleMakeSubmition(id){
        var res = ''
       var token = 'JWT ' + this.$cookies.get('token')
       var formAccept = new FormData()
       formAccept.append('applyId', id)
       this.$http.post('http://localhost:8000/api/v1/check_submition', formAccept, { headers:
      { Authorization: token }
      }).then((result) => {
          this.permissions = String (result.data.message)
      })
          
     },

    senderId: function(id){
      var x = `ds_profile.html?ds_id=${id}`

      window.location.href = x


    },

      toggleAcceptApply(id) {
       var token = 'JWT ' + this.$cookies.get('token')
       var formAccept = new FormData()
       formAccept.append('idApply', id)
       this.$http.post('http://localhost:8000/api/v1/accept', formAccept, { headers:
      { Authorization: token }
      }).then((result) => {
          alert("Successfully accepted apply")
          location.reload()
      })

     },
  },
  }

  



</script>
