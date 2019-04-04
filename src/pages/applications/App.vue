<template>
  <div id="app">
    <Navbar/>

            <Apply v-for="(item, index) in items" v-bind:item="item"  v-bind:isCompany="isCompany" v-bind:index="index" v-bind:key="item.id"> </Apply>
        
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
          date: null
        },
      isCompany: null,

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
  }, 
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
