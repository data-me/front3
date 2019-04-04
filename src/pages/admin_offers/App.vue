<template>
  <div id="app">
    <Navbar/>
    <div v-bind:key="offer.offer_id" id="offers" v-for="offer in offers">
      <b-card no-body>
        <b-card-header header-tag="header" class="p-3" role="tab">
          <b-button
            block
            v-b-toggle="'accordion-' +  offer.offer_id "
            variant="outline-primary"
          >{{offer.title}}</b-button>
        </b-card-header>

        <b-collapse :id="'accordion-'+offer.offer_id" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <span class="font-weight-bold">Description:</span>
              {{ offer.description }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">Price offered:</span>
              {{ offer.price_offered + '€' }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">Creation date:</span>
              {{ offer.creation_date.slice(0,10) }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">Limit date:</span>
              {{ offer.limit_time === None ? 'No limit time' : offer.limit_time.slice(0,10) }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">State:</span>
              {{ offer.finished ? 'Finished' : 'Not finished' }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">Contract: {{offer.contract}}</span>
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">File: {{offer.files}}</span>
            </b-card-text>

            <div id="deleteoffer">
              <b-button variant="danger" class="mt-2" block @click="deleteOffer(offer.offer_id)">Delete offer</b-button>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
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
      offers: []
    };
  },

  mounted: function() {
    var token = "JWT " + this.$cookies.get("token");
    this.$http
      .get("http://localhost:8000/api/v2/admin/offers", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.offers = result.data;
      });
  },

  methods: {
    deleteOffer(offer_id) {
      var token = "JWT " + this.$cookies.get("token");
      var confirm = window.confirm(
        "Are you sure you want to delete this offer?"
      );

      if (confirm) {
        this.$http.delete(
          "http://localhost:8000/api/v2/admin/delete_offer/" + offer_id,
          {
            headers: {
              Authorization: token
            }
          }
        );
        window.location.href = "/admin_offers.html";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

#search-group {
  margin-left: 15%;
  margin-right: 15%;
}
</style>
