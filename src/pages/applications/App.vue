<template>
  <div id="app">
    <Navbar/>

          <div id="applications" v-for="item in items">
          <b-card :title="item.title" :sub-title="item.status">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <b-link href="#" v-show="isCompany" @click="senderId(item.DS_User_id)" class="card-link">Data Scientist</b-link>
            <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
            <!--<div v-if="user_type === 'com'">
            <b-link href="#" @click="senderId(item.DS_User_id)" class="card-link">Data Scientist</b-link>
            <b-link href="#" class="card-link" v-show="isCompany" @click="toggleAcceptApply(item.id)">Accept</b-link>
          </div>-->

          </b-card>
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
  data () {
    return {
      items: [],
      form: {
          title: '',
          description: '',
          status: '',
          date: null
        },
      isCompany: null
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    if (this.$cookies.get('user_type') == 'com') {
      this.isCompany = true
    } else {
      this.isCompany = false
    }

    this.$http.get('https://api-datame.herokuapp.com/api/v1/apply',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {

    senderId: function(id){
      var x = `ds_profile.html?ds_id=${id}`

      window.location.href = x


    },

      toggleAcceptApply(id) {
       var token = 'JWT ' + this.$cookies.get('token')
       var formAccept = new FormData()
       formAccept.append('idApply', id)
       this.$http.post('https://api-datame.herokuapp.com/api/v1/accept', formAccept, { headers:
      { Authorization: token }
      }).then((result) => {
          alert("Successfully accepted apply")
          location.reload()
      })

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
