<template>
  <div id="app">
    <Navbar/>
     <br/>


<b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
    <template slot="modal-header"> Please check the errors below </template>
    <li id="messagesError" v-for="message in this.messages"> {{message}}</li>
    <template slot="modal-footer"><button class="btn btn-primary">Save Changes</button></template>
    <b-button class="mt-3" variant="outline-danger" block @click="modalShow = false">Close</b-button>
</b-modal>

<b-modal no-close-on-esc no-close-on-backdrop class='registered' v-model="registered" ref="registered" id="registered" hide-footer size="xl" title="registered">
    <template slot="modal-header"> Congratulations! </template>
                    {{this.registerMessage}}
</b-modal>

            <b-form  @submit.prevent>
            <label for="title">File {{this.$route.params.offerId}}</label>
            <b-input type="text" v-model="form.file" id="file" :state="form.file.length > 0"  :maxlength="200" aria-describedby="fileHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The URL with your solution
            </b-form-text>
            <br/>

            <label for="comments">Coments</label>
            <b-input type="text" id="comments" v-model="form.comments" :state="form.comments.length > 0" aria-describedby="commentsHelpBlock" />
            <b-form-text id="commentsHelpBlock">
              The comments for your submition, here you can explain everything.
            </b-form-text>
            <br/>
            <b-button class="mt-2" variant="success" block @click="createSubmit">Submit</b-button>

                </b-form>

         
           

        

</div>

             


</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'



export default {
  name: 'app',
  components: {
    Navbar
  },
  computed:{
  },
  data () {
    return {
      items: [],
      form: {
          file: '',
          comments: ''
        },
        selected:'DataScientist',
        messages: [],
        modalShow: 'false',
        user_type: this.$cookies.get('user_type'),
        registered : 'false',
        registerMessage: ''

    }

  },props: ['offerId', 'submition','to'],
   mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/offer',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, 
   methods: {
      checkErrors(){

      },
      

     createUser(event) { 
       const formData = new FormData();
       formData.append("username", this.form.username);
       formData.append("password", this.form.password);
       formData.append("name", this.form.name);
       this.messages = [] 
       if (this.form.password != this.form.confirmPassword){
          this.messages.push('Passwords dont match')
        }
        if (this.form.username.length < 5){
            this.messages.push('Username must be at least 5 letters')
        }
        if (this.form.password.length < 8){
            this.messages.push('Password must contain at least 8 characters')
        }
        var re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/g);
        if (! re.test(this.form.password)){
            this.messages.push('Password must have at least one number and one capital letter')
        }
        if (this.form.name.length == 0){
            this.messages.push('Name is required')
        }
        if (this.selected == 'DataScientist' && this.form.surname.length == 0){
            this.messages.push('Password must contain at least 8 characters')
        }

        if (this.selected == 'DataScientist' && this.form.email.length == 0){
            this.messages.push('Email is required')
        }

        if (this.selected == 'DataScientist' && this.form.address.length == 0){
            this.messages.push('Address is required')
        }
        if (this.selected == 'Company' && this.form.nif.length == 0){
            this.messages.push('NIF is required')
        }

         if (this.selected == 'Company' && this.form.description.length == 0){
            this.messages.push('Description is required')
        }
        if(this.messages.length > 0){ 
          this.modalShow = true
        }
        else {
            if(this.selected == 'Company'){
                    formData.append("type", 'C');
                    formData.append("nif", this.form.nif);
                    formData.append("logo", this.form.logo);
                    formData.append("description", this.form.description);
            } else{
                    formData.append("type", 'DS');
                    formData.append("surname", this.form.surname);
                    formData.append("phone", this.form.phone);
                    formData.append("address", this.form.address);
                    formData.append("email", this.form.email);
                    formData.append("photo", this.form.photo);
            }
     
      this.$http.post('http://localhost:8000/api/v1/register', formData).then((result) => {
      this.registerMessage = result.data.message
      this.registered = true;
      })
      
      
       }
     },
     login(event){
        const formLogin = new FormData();
       formLogin.append("username", this.form.username);
       formLogin.append("password", this.form.password);

        const baseURI = 'http://localhost:8000/api/v1/login'
      this.$http.post('http://localhost:8000/api/v1/login', formLogin).then((result) => {
          this.$cookies.set('token',result.data.token)
          let token = `JWT ${this.$cookies.get('token')}`
          this.$http.get('http://localhost:8000/api/v1/whoami', { headers: { Authorization: token }
        }).then((result) => {
          this.$cookies.set('user_type', result.data.user_type)
        })
        
      }).catch((err)=>{
          alert("Oops, an error ocurred trying to sign in.")
        })
        if(this.selected == 'DataScientist'){
        this.$router.push({path:'/my_cv'})
        window.location.replace('../my_cv.html')
        }
        if(this.selected == 'Company'){
        this.$router.push({path:'/helloworld.html'})
        window.location.replace('../helloworld.html')    
        }
        }

     
  }
}






/*{
          'title': this.form.title,
          'description': this.form.description,
          'price_offered': this.form.price_offered,
          'currency': '0',
          'limit_time': '2019,12,12,10,40,0,0'
      },{ headers: {
       'Content-Type': 'multipart/form-data'
      }*/
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}

#offers {
  margin: 2em;
}

.create-offer {
  text-align: right;
}

#create-offer {
  margin-top: 2em;
  margin-right: 2em;
}

html {
  background-color: #ffffff;
}

#search-group{
  margin-left: 15%;
  margin-right: 15%;
}

</style>
