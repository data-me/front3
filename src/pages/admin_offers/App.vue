<template>
  <div id="app">
    <Navbar/>
    <vue-particles
      color="#22546f"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#37868a"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="1"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
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
              <span class="font-weight-bold">{{$t('description')}}:</span>
              {{ offer.description }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('price_offered')}}:</span>
              {{ offer.price_offered + '€' }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('creation_date')}}:</span>
              {{ offer.creation_date.slice(0,10) }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('limit_date')}}:</span>
              {{ offer.limit_time === None ? 'No limit time' : offer.limit_time.slice(0,10) }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('state')}}:</span>
              {{ offer.finished ? $t('finished') : $t('not_finished') }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('contract')}}: {{offer.contract}}</span>
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('file')}}: {{offer.files}}</span>
            </b-card-text>

            <div id="deleteoffer">
              <b-button
                variant="danger"
                class="mt-2"
                block
                @click="deleteOffer(offer.offer_id)"
              >{{$t('delete_offer')}}</b-button>
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
        this.$http
          .delete(
            "http://localhost:8000/api/v2/admin/delete_offer/" + offer_id,
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(result => {
            alert(result.data.message);
            window.location.href = "/admin_offers.html";
          });
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

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
