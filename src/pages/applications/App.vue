<template>
  <div id="app">
    <Navbar/>
            <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
    <template slot="modal-header"> Please check the errors below </template>
    <li id="messagesError" v-for="message in this.messages"> {{message}}</li>
    <template slot="modal-footer"><button class="btn btn-primary">Save Changes</button></template>
    <b-button class="mt-3" variant="outline-danger" block @click="modalShow = false">Close</b-button>
</b-modal>

<b-modal class='registered' v-model="submited" ref="submited" id="submited" hide-footer size="xl" title="submited">
    <template slot="modal-header"> Congratulations! </template>
                    Submited successfully!
<b-button  class="mt-2" variant="success" block @click="reloadPage">Close</b-button>
</b-modal>

<!-- Show applications -->




            <div id="applications">
            <Apply v-on:clicked="onClickChild" v-for="(item, index) in items" v-bind:item="item"  v-bind:isCompany="isCompany" v-bind:index="index" v-bind:key="item.id"> </Apply>
            </div>

        <b-modal id="modalxl" hide-footer ref="newOffer" size="xl" title="Create an offer">

             <b-form  @submit.prevent>
            <label for="title">File</label>
            <b-input type="text" v-model="submitForm.file" id="file" :state="submitForm.file.length > 0"  :maxlength="200" aria-describedby="fileHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The URL with your solution
            </b-form-text>
            <br/>

            <label for="comments">Coments</label>
            <b-input type="text" id="comments" v-model="submitForm.comments" :state="submitForm.comments.length > 0" aria-describedby="commentsHelpBlock" />
            <b-form-text id="commentsHelpBlock">
              The comments for your submition, here you can explain everything.
            </b-form-text>
            <br/>
               <b-button class="mt-2" variant="success" block @click="createSubmit">Submit</b-button>


                </b-form>


            </b-modal>


        </div>

</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import Apply from '../../components/Apply/LoadApply.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Apply
  },
  data () {
    return {
      items: [],
      form: {
          title: '',
          description: '',
          status: '',
          date: null,

        },
      submitForm:{
          comments: '',
          file: ''
      },
      isCompany: null,
      idOffer:'',
      messages: [],
      modalShow: false,
      submited : false,
      user_type: this.$cookies.get('user_type'),
      offertodl: [],
      url: ''

    }
  }, computed:{

  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    if (this.$cookies.get('user_type') == 'com') {
      this.isCompany = true
    } else {
      this.isCompany = false
    }

    this.$http.get('http://localhost:8000/api/v1/apply',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data

      })
  }, methods: {

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
      reloadPage(){
    window.location.reload()
  },
      onClickChild (value) {
      this.idOffer = value
    },
    createSubmit(){
        var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       this.messages = []
       var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
       if (! (this.submitForm.file).match(regex)){
          this.messages.push('That is not an URL');
          }

       if (! (this.submitForm.comments) > 0){
          this.messages.push('Comments are required');
          }

       if(this.messages.length > 0){
          this.modalShow = true
       }
        else {
       formData.append("comments", this.submitForm.comments);
       formData.append("file", this.submitForm.file);
       formData.append("offerId", this.idOffer);
      this.$http.post('http://localhost:8000/api/v1/submit', formData,{ headers:
      { Authorization: token }
      }).then((result) => {
            this.submited = true
      })
    }
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

#applications {
  margin: 2em;
}

html {
  background-color: #ffffff;
}

</style>
