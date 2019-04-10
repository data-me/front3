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
      <template slot="modal-header">DataMe says:</template>
      {{updatedMessage}}
      <b-button class="mt-2" variant="success" block @click="submited = false">Close</b-button>
    </b-modal>

    <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
      <template slot="modal-header">Please check the errors below</template>
      <li v-bind:key="message.id" id="messagesError" v-for="message in this.messages">{{message}}</li>
      <template slot="modal-footer">
        <button class="btn btn-primary">Save Changes</button>
      </template>
      <b-button class="mt-3" variant="outline-danger" block @click="modalShow = false">Close</b-button>
    </b-modal>

    <div id="Profile" v-if="ViewEdit">
      <img :src="this.form.photo" class="profileImage">

      <div id="info">
        <b-card-text class="card-text">
          <label for="name">Name:</label>
          {{this.form.name}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="surname">Surname:</label>
          {{this.form.surname}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="phone">Phone:</label>
          {{this.form.phone}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="email">Email:</label>
          {{this.form.email}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="address">Address:</label>
          {{this.form.address}}
        </b-card-text>
        <b-button class="mt-1" variant="success" block @click="toffleEditProfile">Edit</b-button>
      </div>
    </div>

    <div id="EditProfile" v-if="!ViewEdit">
      <img :src="this.form.photo" class="profileImage">

      <div id="info">
        <b-form @submit.prevent>
          <b-card-text class="card-text">
            <label for="name">Name:</label>
            <b-input
              type="text"
              v-model="form.name"
              id="name"
              :state="this.form.name.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          {{this.form.name}}
          <b-card-text class="card-text">
            <label for="surname">Surname:</label>
            <b-input
              type="text"
              v-model="form.surname"
              id="surname"
              :state="this.form.surname.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="phone">Phone:</label>
            <b-input
              type="text"
              v-model="form.phone"
              id="phone"
              :maxlength="9"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="email">Email:</label>
            <b-input
              type="text"
              v-model="form.email"
              id="email"
              :state="this.form.email.length > 0"
              :maxlength="100"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="address">Address:</label>
            <b-input
              type="text"
              v-model="form.address"
              id="address"
              :state="this.form.address.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="address">Photo URL:</label>
            <b-input
              type="text"
              v-model="form.photo"
              id="photo"
              :state="this.form.photo.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-button class="mt-1" variant="success" block @click="saveProfile">Save</b-button>
        </b-form>
      </div>
    </div>

    <div v-bind:key="item.id" id="cv_items" v-for="item in items">
      <p class="display-3">{{item.Section}}</p>
      <p></p>
      <div v-bind:key="item2.id" id="cv_items_sub" v-for="item2 in item.Items">
        <b-card :title="item2.name" :sub-title="item2.description">
          <b-card-text>{{item2.entity}}</b-card-text>
          <div id="deleteoffer">
            <b-button
              variant="danger"
              class="mt-2"
              block
              @click="deleteItem(item2.id)"
            >{{$t('delete_item')}}</b-button>
          </div>
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
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import CreateItemSection from "../../components/Curriculum/CreateItemSection.vue";
import CreateSection from "../../components/Curriculum/CreateSection.vue";

export default {
  name: "app",
  components: {
    Navbar,
    CreateItemSection,
    CreateSection
  },
  data() {
    return {
      items: [],
      user: "",
      ViewEdit: true,
      form: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        photo: "",
        address: ""
      },
      submited: false,
      messages: [],
      updatedMessage: "",
      modalShow: false
    };
  },
  mounted: function() {
    var token = "JWT " + this.$cookies.get("token");
    this.$http
      .get("http://localhost:8000/api/v2/get_user_logged", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.user = result.data;
        this.form.name = this.user.name;
        this.form.surname = this.user.surname;
        this.form.email = this.user.email;
        this.form.phone = this.user.phone;
        this.form.photo = this.user.photo;
        this.form.address = this.user.address;
      });
    this.$http
      .get("http://localhost:8000/api/v1/cv", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });
  },
  watch: {
    name: function(value) {
      this.form.name = value;
    }
  },
  methods: {
    toffleEditProfile() {
      this.ViewEdit = false;
    },

    saveProfile() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      this.messages = [];
      if (this.form.name.length == 0) {
        this.messages.push("Name is required");
      }
      if (this.form.surname.length == 0) {
        this.messages.push("Surname is required");
      }

      if (this.form.email.length == 0) {
        this.messages.push("Email is required");
      }

      if (this.form.address.length == 0) {
        this.messages.push("Address is required");
      }
      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        formData.append("name", this.form.name);
        formData.append("surname", this.form.surname);
        formData.append("email", this.form.email);
        formData.append("phone", this.form.phone);
        formData.append("photo", this.form.photo);
        formData.append("address", this.form.address);
        this.$http
          .post("http://localhost:8000/api/v2/change_info", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.ViewEdit = true;
            this.updatedMessage = result.data.message;
            this.submited = true;
          });
      }
    },
    deleteItem(item_id) {
      var token = "JWT " + this.$cookies.get("token");
      var confirm = window.confirm(
        "Are you sure you want to delete this item?"
      );
      
      if (confirm) {
        this.$http.delete(
          "http://localhost:8000/api/v2/data/delete_item/" + item_id,
          {
            headers: {
              Authorization: token
            }
          }
        );
        window.location.href = "/my_cv.html";
      }
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

.profileImage {
  width: 25%;
  vertical-align: bottom;
  max-width: 201px;
  max-height: 290px;
}

#info {
  display: inline-table;
  margin-left: 1%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#profile {
  margin: 1%;
}
html {
  background-color: #ffffff;
}
#info b-button {
  margin-top: 0.25rem !important;
  width: 25%;
  max-width: 201px;
}
</style>
