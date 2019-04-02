<template>
  <div id="app">
    <Navbar/>
          <div id="offers" v-for="item in items">
          <b-card :title="item.name" :sub-title="item.nif ">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <a href="#" class="card-link">View detail</a>
          </b-card>
        </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data () {
    return {
      items: []
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/company',{ headers: 
      { Authorization: token }
      }).then((result) => {
        console.log(result.data.companies)
        this.items = result.data.companies
      })
  }, methods: {

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

</style>
