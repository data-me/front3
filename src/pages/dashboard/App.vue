<template>
  <div id="app">
    <Navbar/>
    
    <h1>Numero Total de ofertas</h1>
    <h2>{{ offers.length }}</h2>
    <br>
    <h1>Número total de usuarios</h1>
    <h2>{{ users.length }}</h2>
    <br>
    <h1>Número de empresas registradas</h1>
    <h2>{{ companies.length }}</h2>
    <br>
    <h1>Media de ofertas por empresa</h1>
    <h2>{{ offers.length /companies.length }}</h2>
    <br>
    <h1>Número total de applications</h1>
    <h2>{{applications.length}}</h2>
   
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
