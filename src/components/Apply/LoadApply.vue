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
          <br/>
          <b-link v-if="item.status == 'PE'" @click="deleteApplication(item.id)">{{$t('delete')}}</b-link>
        </div>
        <div v-if="user_type === 'com'">
        <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
        <b-link href="#" class="card-link" v-b-modal.showDataScientist variant="outline-primary" @click="showDataScientist(item.dataScientist_id)">Show Data Scientist</b-link>
        </div>

      </b-card-body>
    </b-collapse>
  </b-card>
</div>

<!-- Modal Pop up showCompany -->
<div>
 <b-modal id="showDataScientist" hide-footer ref="detailedDataScientist" size="xl" title="Data Scientist's details">
   <div id="cv_items_5" v-for="cvitem in dss">
     <p class="display-3">{{cvitem.Section}}</p>
     <div id="cv_items_sub" v-for="item2 in cvitem.Items">
       <b-card :title="item2.name" :sub-title="item2.description">
         <b-card-text>
           {{item2.date_start}} - {{item2.date_finish}}
         </b-card-text>
       </b-card>
     </div>
   </div>
 </b-modal>
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
      url: '',
      dsId: '',
      dss: []


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
    showDataScientist: function(idDataScientist) {
      this.dsId = idDataScientist
      var token = 'JWT ' + this.$cookies.get('token')
      this.$http.get('http://localhost:8000/api/v1/cv?dataScientistId=' + idDataScientist,{ headers:
        { Authorization: token }
      }).then((result) => {
        this.dss = result.data
      })

    },
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

     deleteApplication(applicationId) {
       var token = 'JWT ' + this.$cookies.get('token')
       this.$http.delete('http://localhost:8000/api/v2/application/' + applicationId, { headers: { Authorization: token }}).then((result) => {
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
