<template>
  <div id="app">
    <Navbar/>

    <br>

    <b-modal
      class="registered"
      v-model="submited"
      ref="submited"
      id="submited"
      hide-footer
      size="xl"
      title="submited"
    >
      <template slot="modal-header">{{this.message}}</template>
      <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>

    <!-- Show submitions -->
    <div v-bind:key="item.id" id="applications" v-for="(item, index) in items">
      <b-card no-body>
        <b-card-header header-tag="header" class="p-3" role="tab">
          <b-button
            block
            v-b-toggle="'accordion-' + index"
            variant="outline-primary"
          >{{$t('submition_to')}} "{{item.offer__title}}"</b-button>
        </b-card-header>
        <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <span class="font-weight-bold">{{$t('comments')}}:</span>
              {{item.comments}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('state')}}:</span>
              {{item.status}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('file')}}:</span>
              {{item.file}}
            </b-card-text>

            <b-form v-if="user_type == 'com' && item.status == 'SU'" @submit.prevent>
              <label for="type">{{$t('change_status')}}</label>
              <br>
              <select v-model="selected">
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
              <b-button
                type="submit"
                class="mt-2"
                variant="success"
                block
                @click="changeStatus(item.id)"
              >{{$t('change_status')}}</b-button>
            </b-form>
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
  computed: {},
  data() {
    return {
      items: [],
      form: {
        username: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        email: "",
        photo: "",
        surname: "",
        logo: "",
        description: "",
        nif: "",
        confirmPassword: ""
      },
      url: "",
      messages: [],
      modalShow: "false",
      user_type: this.$cookies.get("user_type"),
      submited: "false",
      message: "",
      selected: "Accepted"
    };
  },
  mounted: function() {

    var lang

    if (this.$cookies.get('lang')) {
       lang = this.$cookies.get('lang')
    } else {
        lang = 'en'
    }
    this.$i18n.locale = lang

    var token = "JWT " + this.$cookies.get("token");
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;

    this.$http
      .get(" http://localhost:8000/api/v1/submit", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.csv"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    downloadWithVueResource(url) {
      this.$http({
        method: "get",
        url: "",
        responseType: "arraybuffer"
      })
        .then(response => {
          this.forceFileDownload(response);
        })
        .catch(e => alert("error occured" + e));
    },
    changeStatus(id) {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();

      if (this.selected == "Accepted") {
        formData.append("status", "AC");
      } else {
        formData.append("status", "RE");
      }
      formData.append("submitId", id);
      this.$http
        .post(" http://localhost:8000/api/v1/change_status", formData, {
          headers: { Authorization: token }
        })
        .then(result => {
          this.message = result.data.message;
          this.submited = true;
        });
    }
  }
};

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
