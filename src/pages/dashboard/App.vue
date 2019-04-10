<template>
  <div id="app">
    <Navbar/>
    
    <br>
    <br>
    <div class="row">
      <div class="col-sm-4">
        <div class="card text-white bg-info mb-3" style="max-width: 30rem;">
          <h1 class="card-header" >Numero Total de ofertas</h1>
          <h2 class="card-body">{{ offers.length }}</h2>
        </div>
      </div>
      <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-primary mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Número total de usuarios</h1>
          <h2 class="card-body">{{ users.length }}</h2>
        </div>
      </div>
      <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-info mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Número de empresas registradas</h1>
          <h2 class="card-body">{{ companies.length }}</h2>
        </div>
      </div>
      <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-primary mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Media de ofertas por empresa</h1>
          <h2 class="card-body">{{ offers.length /companies.length }}</h2>
        </div>
      </div>
      <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-info mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Número total de aplicaciones</h1>
          <h2 class="card-body">{{applications.length}}</h2>
        </div>
      </div>
      <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-primary mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Número de aplicaciones aceptadas</h1>
          <h2 class="card-body">{{applicationsAccepted.length}}</h2>
        </div>
      </div>
      <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-info mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Número de envíos realizados</h1>
          <h2 class="card-body">{{submitions.length}}</h2>
        </div>
      </div>
       <br>
      <br>
      <div class="col-sm-4">
        <div class="card text-white bg-primary mb-3" style="max-width: 30rem;">
          <h1 class="card-header">Número de mensajes intercambiados</h1>
          <h2 class="card-body">{{messages.length}}</h2>
        </div>
      </div>
    </div>
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
      offers: [],
      users:[],
      companies:[],
      applications:[],
      applicationsAccepted:[],
      submitions:[],
      messages:[],

       
        user_type: this.$cookies.get('user_type')

    }

  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v2/admin/offers',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.offers = result.data
      })

    this.$http.get('http://localhost:8000/api/v1/users',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.users = result.data
      })

    this.$http.get('http://localhost:8000/api/v1/companies',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.companies = result.data
      })

    this.$http.get('http://localhost:8000/api/v1/applications',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.applications = result.data
      })
    this.$http.get('http://localhost:8000/api/v1/applicationsAccepted',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.applicationsAccepted = result.data
      })
    this.$http.get('http://localhost:8000/api/v1/submitions',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.submitions = result.data
      })
    this.$http.get('http://localhost:8000/api/v1/messages',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.messages = result.data
      })
    
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
.card-header{
  text-align: center;
}

.card-body{
  text-align: center;
}

.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 25px; /* Added */
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
