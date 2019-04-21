<template>
  <div id="app">
    <Navbar/>

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
      {{this.message}}
      <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>

    <div class="create-message">
      <b-button id="create-message" v-b-modal.modalxl variant="outline-primary">Create new message</b-button>
    </div>

    <div id="titlepage">
      <h1>Received Messages</h1>
    </div>
    <div :key="item.id" id="messages" v-for="item in items">
      <div v-if="item.isAlert">
        <b-card bg-variant="warning" border :title="item.title">
          <b-card-text>{{item.body}}</b-card-text>
          <b-card-text
            style="color:white"
            class="small text-muted"
          >{{item.moment.slice(0,10)}} {{item.moment.slice(11, 16)}}</b-card-text>
          <font-awesome-icon style="color:white" pull="right" :icon="['fas','bell']"/>
        </b-card>
      </div>

      <div v-else>
        <b-card border bg-variant="info" :title="item.title">
          <b-card-text>{{item.body}}</b-card-text>
          <b-card-text
            class="small text-muted"
          >{{item.moment.slice(0,10)}} {{item.moment.slice(11, 16)}}</b-card-text>
          <font-awesome-icon style="color:white" pull="right" :icon="['fas','comments']"/>
        </b-card>
      </div>
    </div>

    <div>
      <b-modal id="modalxl" hide-footer ref="newMessage" size="xl" title="Create a message">
        <b-form @submit.prevent>
          <label for="title">Title</label>
          <b-input
            type="text"
            v-model="form.title"
            id="title"
            :state="form.title.length > 0"
            :maxlength="100"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">The main subject of your message, max 100 characters.</b-form-text>
          <br>
          <label for="body">Body</label>
          <b-form-textarea
            type="text"
            id="body"
            v-model="form.body"
            :state="form.body.length > 0"
            :maxlength="250"
            aria-describedby="bodyHelpBlock"
          />
          <b-form-text id="bodyHelpBlock">The body of your message, max 250 characters.</b-form-text>
          <br>
          <label for="receiver">Receiver</label>
          <b-input
            type="text"
            id="receiver"
            v-model="form.receiver"
            aria-describedby="receiverHelpBlock"
          />
          <b-form-text id="receiverHelpBlock">The username of the receiver of your message.</b-form-text>
          <br>
          <b-button class="mt-2" variant="success" block @click="toggleModal">Create message</b-button>
        </b-form>
      </b-modal>
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
      items: [],
      form: {
        title: "",
        body: "",
        receiverId: null
      },
       messages: [],
       modalShow : false,
       submited: false,
       message:''
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
      .get(" http://localhost:8000/api/v1/message", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });

    this.$http
      .get(" http://localhost:8000/api/v1/users", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.options = result.data;
      });
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },

    createMessage: function() {},
    toggleModal() {
     var token = "JWT " + this.$cookies.get("token");
     
     this.messages = [];
     if(this.form.title.length < 1){
      this.messages.push(this.$t('title_required'));
     }
     if(this.form.body.length < 1){
      this.messages.push(this.$t('body_required'));
     }
    

     if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
     
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("body", this.form.body);
      formData.append("username", this.form.receiver);

      this.$http
        .post(" http://localhost:8000/api/v1/message", formData, {
          headers: { Authorization: token }
        })
        .then(result => {
         this.submited = true;
         this.message = result.data.message
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

#messages {
  margin: 2em;
}

#titlepage {
  margin: 2em;
}

.create-message {
  text-align: right;
}
#create-message {
  margin-top: 2em;
  margin-right: 2em;
}

html {
  background-color: #ffffff;
}
</style>
