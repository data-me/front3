<template>

  <div id="app">
    <Navbar/>
    <div id="cv_items" v-for="item in items">
      <p class="display-3">{{item.Section}}<p>
      <div id="cv_items_sub" v-for="item2 in item.Items">
        <b-card :title="item2.name" :sub-title="item2.description">
          <b-card-text>
            {{item2.entity}}
          </b-card-text>
        </b-card>

      </div>
      <div id="create_item_section">
      <CreateItemSection :secid="item.Section_Id"></CreateItemSection>
      </div>
    </div>
    <div id="create_section">
    <create-section></create-section>
    </div>

  </div>


</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import CreateItemSection from '../../components/Curriculum/CreateItemSection.vue'
import CreateSection from '../../components/Curriculum/CreateSection.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    CreateItemSection,
    CreateSection,
  },
  data () {
    return {
      items: [],
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/cv',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
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

#cv_items {
  margin: 2em;
}

#cv_items_sub {
  margin: 2em;
}

#create_item_section {
  margin: 2em;
}

#create_section {
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
