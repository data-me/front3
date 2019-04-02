<template>
  <div id="app">
    <Navbar/>
     <br/>
        <b-form  @submit.prevent>
            <label for="type">Type of account</label>
            <br/>
            <select v-model="selected">
            <option>DataScientist</option>
            <option>Company</option>
            </select>
             <br/>
            <label for="username">Username</label>
            <b-input type="text" v-model="form.username" id="username" :state="form.username.length > 0"  :maxlength="80" aria-describedby="usernameHelpBlock" />
            <b-form-text id="usernameHelpBlock">
              Write your username
            </b-form-text>
            <br/>
            <label for="password">Password</label>
            <b-input type="text" id="password" v-model="form.password" :state="form.password.length > 0" aria-describedby="passwordHelpBlock" />
            <b-form-text id="passwordHelpBlock">
            Your password can't be too similar to your other personal information.
            Your password must contain at least 8 characters.
            Your password can't be a commonly used password.
            Your password can't be entirely numeric.
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
            </div>

            <br/>

            <div id='photo' v-if="selected ==='DataScientist'">
            <label for="photo">Photo</label>
            <b-input type="text" id="text" v-model="form.photo" aria-describedby="photoHelpBlock"  :maxlength="80" />
            <b-form-text id="photoHelpBlock">
              Write a URL with a photo
            </b-form-text>
            </div>

            <br/>

            <div id='email' v-if="selected ==='DataScientist'">
            <label for="email">Email</label>
            <b-input type="text" id="text" v-model="form.email" aria-describedby="emailHelpBlock"  :maxlength="80" />
            <b-form-text id="emailHelpBlock">
              Write your email
            </b-form-text>
            </div>

            <br/>

            <div id='address' v-if="selected ==='DataScientist'">
            <label for="address">Address</label>
            <b-input type="text" id="text" v-model="form.address" aria-describedby="addressHelpBlock"  />
            <b-form-text id="addressHelpBlock">
              Write your address
            </b-form-text>
            </div>

            <div id='phone' v-if="selected ==='DataScientist'">
            <label for="phone">Phone</label>
            <b-input type="text" id="text" v-model="form.phone" aria-describedby="phoneHelpBlock"   :maxlength="80" />
            <b-form-text id="phoneHelpBlock">
              Write your phone
            </b-form-text>
            </div>

            <br/>
            

             <b-button class="mt-2" variant="success" block @click="createOffer">Create new user</b-button>
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
          username: '',
          password: '',
          name: '',
          surname: '',
          phone: '',
          address: '',
          photo: '',
          surname: '',
        },
        selected:'DataScientist',
        user_type: this.$cookies.get('user_type')

    }

  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/offer',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {

      toggleCreateApply() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formApply = new FormData();
       if (this.formApply.title.length < 5 || this.formApply.description.length < 10){
        alert("Please correct the errors")

       } else{
       formApply.append("title", this.formApply.title);
       formApply.append("description", this.formApply.description);
       formApply.append("offerId", this.offerId);
       this.$http.post('http://localhost:8000/api/v1/apply', formApply,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })
      }

     },
    saveId: function(idOffer){
    this.offerId = idOffer
    },
     createOffer() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       formData.append("title", this.form.title);
       formData.append("description", this.form.description);
       formData.append("price_offered", this.form.price_offered);
       formData.append("limit_time", this.form.limit_time);
       formData.append("files", this.form.files);
       formData.append("contract", this.form.contract);


      this.$http.post('http://localhost:8000/api/v1/offer', formData,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })

     },
      onSubmit() {
        let token = `JWT ${this.$cookies.get('token')}`
        this.$http.get(`http://localhost:8000/api/v1/offer?search=${this.form.search}`,{ headers:
          { Authorization: token }}).then((result) => {
            this.items = result.data
          })
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
