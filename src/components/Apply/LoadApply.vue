<template>
    <div>
        

          {{toggleMakeSubmition(item.id)}}
              {{saveId(item.offer_id)}}


            <div id="applications">
  <b-card no-body>
    <b-card-header header-tag="header" class="p-3" role="tab">
      <b-button block v-b-toggle="'accordion-' + index" variant="outline-primary" @click='onClickButton'>
        {{item.title}}
      </b-button>
    </b-card-header>
    <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <b-card-text><span class="font-weight-bold">Description: </span> {{item.description}}</b-card-text>
        <b-card-text><span class="font-weight-bold">Status: </span> {{item.status}}</b-card-text>
        <b-card-text><span class="font-weight-bold">Date: </span>{{item.date.slice(0,10)}}</b-card-text>
        <b-card-text><span class="font-weight-bold">Offer: </span>{{item.offer_id}}</b-card-text>
        <b-card-text></b-card-text>
        <div v-if="user_type === 'ds'">
          <b-link v-if= "item.status == 'AC'" class="card-link" variant="outline-primary" @click="downloadWithVueResource(item.offer_id)">Download file</b-link>
          <br/>
          <b-link href="#" v-b-modal.modalxl v-show="this.permissions == 'true'">Make submit</b-link>
        </div>
        <div v-if="user_type === 'com'">
        <b-link href="#" @click="senderId(item.DS_User_id)" class="card-link">Data Scientist</b-link>
        <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
        </div>

      </b-card-body>
    </b-collapse>
  </b-card>
</div>




</div>


</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


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
      offerId: '',
      user_type: this.$cookies.get('user_type'),
      offertodl: [],
      url: ''
      

    }
  }, computed: {

  },
    props: ['item','index','key', 'isCompany'],
 methods: {
     onClickButton (event) {
      this.$emit('clicked', this.offerId)
    },      
    saveId (id) {
      this.offerId = id
    },


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
      getOffer(offerId){
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/offer?offerId=' + offerId,{ headers:
      { Authorization: token }
      }).then((result) => {
        this.offertodl = result.data,
        this.url = this.offertodl[0].file
      })
  },
      forceFileDownload(response){
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'file.csv') //or any other extension
    document.body.appendChild(link)
    link.click()
  },
      downloadWithVueResource(offerId) {
    this.getOffer(offerId)
    this.$http({
      method: 'get',
      url: this.url,
      responseType: 'arraybuffer'
    })
    .then(response => {
      this.forceFileDownload(response)
    })
    .catch(() => console.log('error occured'))

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
