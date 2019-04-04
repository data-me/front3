<template>
  <div id="app">
    <Navbar/>

            <Apply v-on:clicked="onClickChild" v-for="(item, index) in items" v-bind:item="item"  v-bind:isCompany="isCompany" v-bind:index="index" v-bind:key="item.id"> </Apply>
        

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
      idOffer:''

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
      onClickChild (value) {
      this.idOffer = value
    },
    createSubmit(){
        return none
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
