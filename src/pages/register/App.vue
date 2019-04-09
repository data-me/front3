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
  <b-form  @submit="login">
<b-button type=submit class="mt-2" variant="success" @click.stop.prevent="login()" >Let's Start!</b-button>
</b-form>
</b-modal>

        <b-form id="register"  @submit = createUser>
            <label for="type">Type of account</label>
            <br/>
            <select v-model="selected">
            <option>DataScientist</option>
            <option>Company</option>
            </select>
             <br/>
            <label for="username">Username</label>
            <b-input type="text" v-model="form.username"  id="username" :state="form.username.length > 5"  :maxlength="80" aria-describedby="usernameHelpBlock" min=5 required/>
            <b-form-text id="usernameHelpBlock">
              Write your username
            </b-form-text>
            <br/>
            <label for="password">Password</label>
            <b-input type="password" id="password" v-model="form.password" :state="form.password.length >= 8 && (new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/g).test(this.form.password))" aria-describedby="passwordHelpBlock" required/>
            <b-form-text id="passwordHelpBlock">
            Your password can't be too similar to your other personal information. <br/>
            Your password must contain at least 8 characters. </br>
            Your password can't be a commonly used password. <br/>
            Your password can't be entirely numeric. 
            </b-form-text>
            <br/>

            <label for="confirmPassword">Confirm password</label>
            <b-input type="password" id="confirmPassword" v-model="form.confirmPassword" :state="form.confirmPassword == form.password && form.confirmPassword.length != 0" :maxlength="80"  aria-describedby="confirmPasswordHelpBlock" />
            <b-form-text id="confirmPasswordHelpBlock">
            Type your password again please
            </b-form-text>
            <br/>

            <label for="name">Name</label>
            <b-input type="text" id="text" v-model="form.name" :state="form.name.length > 0"  :maxlength="80"  aria-describedby="nameHelpBlock" />
            <b-form-text id="nameHelpBlock">
              Write your name
            </b-form-text>
            <br/>

            <div id='surname' v-if="selected ==='DataScientist'">
            <label for="surname">Surname</label>
            <b-input type="text" id="text" v-model="form.surname" aria-describedby="nameHelpBlock" :state="form.surname.length > 0"  :maxlength="80" />
            <b-form-text id="nameHelpBlock">
              Write your surname
            </b-form-text>
              <br/>
            </div>

          

            <div id='photo' v-if="selected ==='DataScientist'">
            <label for="photo">Photo</label>
            <b-input type="url" id="text" v-model="form.photo" aria-describedby="photoHelpBlock" :state="form.photo.length > 0 && new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(this.form.photo)"  :maxlength="80" />
            <b-form-text id="photoHelpBlock">
              Write a URL with a photo
            </b-form-text>
             <br/>
            </div>

           

            <div id='email' v-if="selected ==='DataScientist'">
            <label for="email">Email</label>
            <b-input type="email" id="text" v-model="form.email" aria-describedby="emailHelpBlock" :state="form.email.length > 0" :maxlength="80" />
            <b-form-text id="emailHelpBlock">
              Write your email
            </b-form-text>
              <br/>
            </div>

          

            <div id='address' v-if="selected ==='DataScientist'">
            <label for="address">Address</label>
            <b-input type="text" id="text" v-model="form.address" aria-describedby="addressHelpBlock" :state="form.address.length > 0" :maxlength="80"/>
            <b-form-text id="addressHelpBlock">
              Write your address
            </b-form-text>
             <br/>
            </div>

            <div id='phone' v-if="selected ==='DataScientist'">
            <label for="phone">Phone</label>
            <b-input type="text" id="text" v-model="form.phone" aria-describedby="phoneHelpBlock" :state="form.phone.length > 0" :maxlength="9" />
            <b-form-text id="phoneHelpBlock">
              Write your phone
            </b-form-text>
             <br/>
            </div>

           
            
            <div id='description' v-if="selected ==='Company'">
            <label for="description">Description</label>
            <b-input type="text" id="text" v-model="form.description" aria-describedby="descriptionHelpBlock" :state="form.description.length > 0" :maxlength="80" />
            <b-form-text id="descriptionHelpBlock">
              Write a description from your company
            </b-form-text>
             <br/>
            </div>

           

            <div id='nif' v-if="selected ==='Company'">
            <label for="nif">NIF</label>
            <b-input type="text" id="text" v-model="form.nif" aria-describedby="nifHelpBlock" :state="form.nif.length > 0" :maxlength="9" />
            <b-form-text id="nifHelpBlock">
              Write the NIF from your company
            </b-form-text>
             <br/>
            </div>

           


            <div id='logo' v-if="selected ==='Company'">
            <label for="logo">Logo Url</label>
            <b-input type="url" id="text" v-model="form.logo" aria-describedby="logoHelpBlock" :state="form.logo.length > 0 && new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(this.form.logo)" :maxlength="80" />
            <b-form-text id="logoHelpBlock">
              Write a URL referring to your company's logo
            </b-form-text>
             <br/>
            </div>

           

             <b-button type="submit" class="mt-2" variant="success" block @click.stop.prevent="createUser()" v-if="selected ==='Company'">Create new company</b-button>
            <b-button type="submit" variant="success" block @click.stop.prevent="createUser()" v-if="selected ==='DataScientist'">Create new DataScientist</b-button>
          </b-form>

           

        
<Footer/>
</div>

             


</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'


export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  computed:{
  },
  data () {
    return {
      items: [],
      form: {
          username: '',
          password: '',
          name: '',
          surname: '',
          phone: '',
          address: '',
          email : '',
          photo: '',
          surname: '',
          logo: '',
          description: '',
          nif: '',
          confirmPassword: '',
        },
        selected:'DataScientist',
        messages: [],
        modalShow: 'false',
        user_type: this.$cookies.get('user_type'),
        registered : 'false',
        registerMessage: ''

    }

  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/offer',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {
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
            this.messages.push('Surname is required')
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
       var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
       if (this.selected == 'DataScientist' && (! (this.form.photo).match(regex))){
          this.messages.push('Photo must be an URL');
          }

         if (this.selected == 'Company' && this.form.description.length == 0){
            this.messages.push('Description is required')
        }
        if (this.selected == 'Company' && (! (this.form.logo).match(regex))){
          this.messages.push('Logo must be an URL');
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

#register{
    margin-left:1%;
    max-width: 99%;
    margin-bottom: 5%
}

#register input{
    max-width: 90%;
}


</style>
