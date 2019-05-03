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
        <b-card-text><span class="font-weight-bold">{{$t('description')}}: </span> {{item.description}}</b-card-text>
        <b-card-text><span class="font-weight-bold">{{$t('status')}}: </span> {{item.status}}</b-card-text>
        <b-card-text><span class="font-weight-bold">{{$t('date')}}: </span>{{item.date.slice(0,10)}}</b-card-text>
        <b-card-text><span class="font-weight-bold">{{$t('offer')}}: </span>{{item.offer_id}}</b-card-text>
        <div v-if="(user_type === 'ds' && item.status == 'AC')">
          <b-card-text><span class="font-weight-bold">{{$t('offer_file')}}: </span><a :href="item.offer__files" target="_blank">{{item.offer__files}}</a></b-card-text>
          <br/>
          <b-link href="#" v-b-modal.modalxl v-show="this.permissions == 'true'">{{$t('make_submition')}}</b-link>
          <br/>
        </div>
        <div v-if="(user_type === 'ds' && item.status == 'PE')">
          <b-link v-if="item.status == 'PE'" @click="toggleEdit(item.id)" class="button">{{$t('edit')}}</b-link> </br>
          <b-link v-if="item.status == 'PE'" @click="deleteApplication(item.id, $t('apply_delete'))">{{$t('delete')}}</b-link>
        </div>
        <div v-if="user_type === 'com'">
        <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id, $t('confirm_accept_application'))">{{$t('accept')}}</b-link>

        <b-link href="#" class="card-link" v-b-modal.showDataScientist variant="outline-primary" @click="onClickButton2">{{$t('show_ds')}}</b-link>
        </div>

      </b-card-body>
    </b-collapse>
  </b-card>
</div>
  <b-modal id="modal-edit-application" v-model="showEdit" centered :title="$t('edit_app')" hide-footer>
    <b-form @submit="editApplication" @reset="onReset" v-if="showEdit">
      <b-form-input v-model="applyDescription" hidden></b-form-input>
      <b-form-group
        id="input-group-1"
        :label="$t('description')"
        label-for="description"
        :description="$t('description_apply_feedback')"
      ><b-form-textarea
          id="textarea"
          v-model="applyDescription"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" class="button">{{$t('edit')}}</b-button>
    </b-form>
  </b-modal>
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
      url: '',
      showEdit: false,
      applyDescription: '',
      applicationId: ''
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
       this.$http.post('https://api3-datame.herokuapp.com/api/v1/check_submition', formAccept, { headers:
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
    this.$http.get('https://api3-datame.herokuapp.com/api/v1/offer?offerId=' + offerId,{ headers:
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

      toggleAcceptApply(id, text) {
        if(confirm(text)){
          var token = 'JWT ' + this.$cookies.get('token')
          var formAccept = new FormData()
          formAccept.append('idApply', id)
          this.$http.post('https://api3-datame.herokuapp.com/api/v1/accept', formAccept, { headers:
          { Authorization: token }
          }).then((result) => {
              alert("Successfully accepted apply")
              location.reload()
          })
        }
     },

     deleteApplication(applicationId, text) {
      if(confirm(text)){
        var token = 'JWT ' + this.$cookies.get('token')
        this.$http.delete('https://api3-datame.herokuapp.com/api/v2/application/' + applicationId, { headers: { Authorization: token }}).then((result) => {
            if (result.data.code == '200') {
              alert(this.$t('delete_app_success'))
            }
            if (result.data.code == '401') {
              alert(this.$t('delete_app_not_allowed'))
            }
            location.reload()
        })
       }
     },
     toggleEdit(id) {
       this.showEdit = true
       this.applicationId = id
     },
     editApplication(evt) {
       evt.preventDefault()
       var token = 'JWT ' + this.$cookies.get('token')

      var body = new FormData()
      body.append('description', this.applyDescription)

       this.$http.post('https://api3-datame.herokuapp.com/api/v2/application/' + this.applicationId, body, { headers:
        { Authorization: token }
        }).then((result) => {
            if (result.data.code == '200') {
              alert(this.$t('edit_app_success'))
            }
            if (result.data.code == '401') {
              alert(this.$t('edit_app_not_allowed'))
            }
            location.reload()
        })
     }
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

.button {
  margin-right: 1 em;
}
</style>
