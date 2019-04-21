<template>
  <div id="app">
    <Navbar/>

    <b-modal
      class="registered"
      v-model="submited"
      ref="submited"
      id="submited"
      hide-footer
      size="xl"
      title="submited"
    >
      <template slot="modal-header">{{$t('congrats')}}</template>
       {{$t('submited_success')}}
      <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>

     <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
      <template slot="modal-header">{{$t('error_msg')}}</template>
      <li :key="message.id" id="messagesError" v-for="message in this.messages">{{message}}</li>
      <template slot="modal-footer">
        <button class="btn btn-primary">{{$t('save_changes')}}</button>
      </template>
      <b-button
        class="mt-3"
        variant="outline-danger"
        block
        @click="modalShow = false"
      >{{$t('close')}}</b-button>
    </b-modal>


    <div v-bind:key="item.id" id="company" v-for="item in items">
      <b-card :title="item.name" :sub-title="item.nif ">
        <b-card-text>{{item.description}}</b-card-text>
        <b-img
          style="width: 200px; height:200px; text-align: center"
          left
          v-bind:src="item.logo"
          :alt="$t('company_logo_alt')"
        ></b-img>
      </b-card>
    </div>

    <b-button
      v-if="isCompany"
      class="mt-1"
      variant="success"
      block
      @click="toggleEditProfile"
      v-b-modal.EditProfile
    >{{$t("edit")}}</b-button>

    <b-modal
      id="EditProfile"
      v-if="!ViewEdit"
      ok-disabled
      hide-footer="true"
      centered
      :title="$t('modal_edit_profile')"
    >
      <!-- Editing company info -->
      <div id="info">
        <b-form @submit.prevent>
          <b-card-text class="card-text">
            <label for="name">{{$t('name')}}</label>
            <b-input
              type="text"
              v-model="form.name"
              id="name"
              :state="this.form.name.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="description">{{$t('description')}}</label>
            <b-input
              type="text"
              v-model="form.description"
              id="description"
              :state="this.form.description.length > 0"
              :maxlength="50"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="logo">{{$t('logo')}}</label>
            <b-input type="url"
             v-model="form.logo" 
             id="logo"
             aria-describedby="fileHelpBlock"
            :state="(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(form.logo))"
            />
          </b-card-text>
          <b-button class="mt-1" variant="success" block @click="saveProfile">{{$t('save_changes')}}</b-button>
        </b-form>
      </div>
    </b-modal>

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
      items: [],
      ViewEdit: true,
      isCompany: this.$cookies.get('user_type') === 'com',
      form: {
        name: "",
        description: "",
        logo: ""
      },
      submited: false,
      messages: [],
      updatedMessage: "",
      modalShow: false,
      submited: false,
    };
  },
  mounted: function() {
    var token = "JWT " + this.$cookies.get("token");
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;

    this.$http
      .get("http://localhost:8000/api/v1/company", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });

    this.$http
      .get("http://localhost:8000/api/v2/get_user_logged", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.user = result.data;
        this.form.name = this.user.name;
        this.form.description = this.user.description;
        this.form.logo = this.user.logo;
      });
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    toggleEditProfile() {
      this.ViewEdit = false;
    },
    saveProfile() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      this.messages = [];
      if (this.form.name.length == 0) {
        this.messages.push("Name is required");
      }
      if (this.form.description.length == 0) {
        this.messages.push("Description is required");
      }
      var regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      );
      if (!this.form.logo.match(regex)) {
        this.messages.push("That is not an URL");
      }

      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        formData.append("name", this.form.name);
        formData.append("description", this.form.description);
        formData.append("logo", this.form.logo);
<<<<<<< HEAD
        this.$http.post(" http://localhost:8000/api/v2/change_info", formData, {
=======
        this.$http.post("http://localhost:8000/api/v2/change_info", formData, {
>>>>>>> sprint3
            headers: { Authorization: token }
          }).then(result => {
            this.ViewEdit = true;
            this.updatedMessage = result.data.message;
            this.submited = true;
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

#company {
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
