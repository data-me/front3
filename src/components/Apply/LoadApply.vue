<template>
    <div>


          {{toggleMakeSubmition(item.id)}}
              {{saveId(item.offer_id)}}
              {{saveId2(item.dataScientist_id)}}


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
        <div v-if="(user_type === 'ds' && item.status == 'AC')">
          <b-card-text><span class="font-weight-bold">Offer file: </span>{{item.offer__files}}</b-card-text>
          <br/>
          <b-link href="#" v-b-modal.modalxl v-show="this.permissions == 'true'">Make submit</b-link>
          <br/>
        </div>
        <div v-if="(user_type === 'ds' && item.status == 'PE')">
          <b-link v-if="item.status == 'PE'" @click="deleteApplication(item.id)">{{$t('delete')}}</b-link>
        </div>
        <div v-if="user_type === 'com'">
        <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
        <b-link href="#" class="card-link" v-b-modal.showDataScientist variant="outline-primary" @click="onClickButton2">Show Data Scientist</b-link>
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
          comments: '',
        },
      isCompany: null,
      permissions : '',
      offerId: '',
      dataScientistId: '',
      user_type: this.$cookies.get('user_type'),
      offertodl: [],
      url: ''


    }
  }, mounted: function() {
      var lang

      if (this.$cookies.get('lang')) {
        lang = this.$cookies.get('lang')
      } else {
        lang = 'en'
      }
      this.$i18n.locale = lang

  },computed: {

  },
    props: ['item','index','key', 'isCompany'],
 methods: {
     onClickButton (event) {
      this.$emit('clicked', this.offerId)
    },
    onClickButton2 (event) {
     this.$emit('clicked2', this.dataScientistId)
   },
    saveId (id) {
      this.offerId = id
    },
    saveId2 (id) {
      this.dataScientistId = id
    },


       toggleMakeSubmition(id){
        var res = ''
       var token = 'JWT ' + this.$cookies.get('token')
       var formAccept = new FormData()
       formAccept.append('applyId', id)
       this.$http.post('https://api2-datame.herokuapp.com/api/v1/check_submition', formAccept, { headers:
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
    this.$http.get('https://api2-datame.herokuapp.com/api/v1/offer?offerId=' + offerId,{ headers:
      { Authorization: token }
      }).then((result) => {
        this.offertodl = result.data,
        this.url = this.offertodl.file
        alert(this.url)

      })
  },
      redirectTo(offerId){
        this.getOffer(offerId);
      },

      toggleAcceptApply(id) {
       var token = 'JWT ' + this.$cookies.get('token')
       var formAccept = new FormData()
       formAccept.append('idApply', id)
       this.$http.post('https://api2-datame.herokuapp.com/api/v1/accept', formAccept, { headers:
      { Authorization: token }
      }).then((result) => {
          alert("Successfully accepted apply")
          location.reload()
      })

     },

     deleteApplication(applicationId) {
       var token = 'JWT ' + this.$cookies.get('token')
       this.$http.delete('https://api2-datame.herokuapp.com/api/v2/application/' + applicationId, { headers: { Authorization: token }}).then((result) => {
          if (result.data.code == '200') {
            alert(this.$t('delete_app_success'))
          }
          if (result.data.code == '401') {
            alert(this.$t('delete_app_not_allowed'))
          }
          location.reload()
      })
     },

  },
  }





</script>

<style>
#cv_items_5 {
  margin: 2em;
}

#cv_items_sub {
  margin: 2em;
}
</style>
