<template>
  <div id="app">
    <Navbar/>

    
      <br>
      <br>
      <h1 class = 'title'>{{$t('Reviews_of_companies')}}</h1>
      <div id="ranking" v-bind:key="item.id" v-for="(item) in rankingCompanies">
              <b-card-body>
                  <div class="card text-white bg-info mb-3">
                    <h2 class="card-header">{{$t('Company')}}: {{item.reviewed_name}} <br></h2>
                    <h2 class="card-header" style ="background-color:#337DFF;">{{$t('Average')}}: {{item.average}} <br></h2>
                    <h2 class="card-header">{{$t('LastReview')}}: {{item.comments}} <br></h2>
                </div>
                
              </b-card-body>
      </div>

      <h1 class = 'title'>{{$t('Reviews_of_datascientists')}}</h1>
      <div id="ranking" v-bind:key="item.id" v-for="(item) in rankingData">
              <b-card-body>
                  <div class="card text-white bg-info mb-3">
                    <h2 class="card-header">{{$t('DataScientist')}}: {{item.reviewed_name}} <br></h2>
                    <h2 class="card-header" style ="background-color:#337DFF;">{{$t('Average')}}: {{item.average}} <br></h2> 
                    <h2 class="card-header">{{$t('LastReview')}}: {{item.comments}} <br></h2> 
                </div>
               
              </b-card-body>
      </div>


    <Footer/>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
export default {
  name: "app",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      rankingData:[],
      rankingCompanies:[],
    }
  }, mounted: function () {

    var lang

    if (this.$cookies.get('lang')) {
      lang = this.$cookies.get('lang')
    } else {
      lang = 'en'
    }
    this.$i18n.locale = lang

    var token = 'JWT ' + this.$cookies.get('token')
/*
    this.$http.get('http://localhost:8000/api/v3/reviews_companies',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.reviews_c = result.data
      })

    this.$http.get('http://localhost:8000/api/v3/reviews_datascientists',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.reviews_d = result.data
      })
*/
    this.$http.get('http://localhost:8000/api/v3/ranking_datascientists',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.rankingData = result.data
      })

    this.$http.get('http://localhost:8000/api/v3/ranking_companies',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.rankingCompanies = result.data
      })

  }, 

}

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#ranking {
  margin: 2em;
  text-align: center;
}
.title{
  text-align : center;
}
html {
  background-color: #ffffff;
}

</style>
