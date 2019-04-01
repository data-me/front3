<template>
  <div id="app">
    <Navbar/>
        <div class="create-message">
          <b-button id="create-message" v-b-modal.modalxl variant="outline-primary" >Create new message</b-button>
        </div>

        <div id="titlepage">
        <h1>Received Messages</h1>
        </div>
        <div id="messages" v-for="item in items">
          <b-card :title="item.title" >
            <b-card-text>{{item.body}}</b-card-text>
          </b-card>
        </div>

      <div>
        <b-modal id="modalxl" hide-footer ref="newMessage" size="xl" title="Create a message">
          <b-form  @submit.prevent>
            <label for="title">Title</label>
            <b-input type="text" v-model="form.title" id="title" :state="form.title.length > 0"  :maxlength="100" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The main subject of your message, max 100 characters.
            </b-form-text>
            <br/>
            <label for="body">Body</label>
            <b-form-textarea type="text" id="body" v-model="form.body" :state="form.body.length > 0" :maxlength="250" aria-describedby="bodyHelpBlock" />
            <b-form-text id="bodyHelpBlock">
              The body of your message, max 250 characters.
            </b-form-text>
            <br/>
            <label for="receiver">Receiver</label>
            <b-input type="text" id="receiver" v-model="form.receiver" aria-describedby="receiverHelpBlock" />
            <b-form-text id="receiverHelpBlock">
              The username of the receiver of your message.
            </b-form-text>
            <br/>
             <b-button class="mt-2" variant="success" block @click="toggleModal">Create message</b-button>
          </b-form>
        </b-modal>
      </div>

  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
  },
  data () {
    return {
      items: [],
      form: {
          title: '',
          body: '',
          receiverId: null,
        }
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('https://api-datame.herokuapp.com/api/v1/message',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })

    this.$http.get('https://api-datame.herokuapp.com/api/v1/users',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.options = result.data
      })

  }, methods: {
    createMessage: function () {

    },
     toggleModal() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       formData.append("title", this.form.title);
       formData.append("body", this.form.body);
       formData.append("username", this.form.receiver);

       this.$http.post('https://api-datame.herokuapp.com/api/v1/message', formData,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
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
