<template>
  <div id="app">
    <Navbar/>
        <!-- ////// -->
        <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
            <template slot="modal-header"> Please check the errors below </template>
            <li id="messagesError" v-for="message in this.messages"> {{message}}</li>
            <template slot="modal-footer"><button class="btn btn-primary">Save Changes</button></template>
            <b-button class="mt-3" variant="outline-danger" block @click="modalShow = false">Close</b-button>
        </b-modal>
        <!-- Create an offer -->
        <div v-if="user_type === 'com'">
          <div class="create-offer">
            <b-button id="create-offer" v-b-modal.modalxl variant="outline-primary"  >{{$t('new_offer')}}</b-button>
          </div>
        </div>
        <div v-else-if="user_type === 'ds'">
        <!-- Search bar -->
          <div id="search-group">
            <b-form @submit="onSubmit">
              <b-input-group :prepend="$t('search')" class="mt-3">
              <b-form-input v-on:keyup="onSubmit" id="search" v-model="form.search" :placeholder="$t('search_placeholder')"></b-form-input>
              </b-input-group>
            </b-form>
          </div>
        </div>
        <!-- ////// -->

        <!-- Show offers -->
        <div id="offers" v-bind:key="item.id" v-for="(item, index) in items">
          <b-card no-body>
            <b-card-header header-tag="header" class="p-3" role="tab">
              <b-button block v-b-toggle="'accordion-' + index" variant="outline-primary">
                {{item.title}}
              </b-button>
            </b-card-header>
            <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text><span class="font-weight-bold">{{$t('description')}}: </span> {{item.description}}</b-card-text>
                <b-card-text><span class="font-weight-bold">{{$t('price_offered')}}: </span>{{item.price_offered + '€'}}</b-card-text>
                <b-card-text><span class="font-weight-bold">{{$t('creation_date')}}: </span>{{item.creation_date.slice(0,10)}}</b-card-text>
                <b-card-text><span class="font-weight-bold">{{$t('limit_date')}}: </span>{{item.limit_time.slice(0,10)}}</b-card-text>
                <b-card-text><span class="font-weight-bold">{{$t('state')}}: </span>{{ item.finished ? $t('finished') : $t('not_finished') }}</b-card-text>
                <b-card-text><span class="font-weight-bold">{{$t('contract')}}: {{item.contract}}</span></b-card-text>
                <b-card-text></b-card-text>
                <div v-if="user_type === 'ds'">
                  <b-link href="#" v-if= "item.finished == false" class="card-link" v-b-modal.createApply variant="outline-primary" @click="saveId(item.id)">{{$t('apply')}}</b-link>
                </div>

                <div id="deleteoffer" v-if="user_type !== 'ds' && applications.length == 0">
                  <b-button variant="danger" class="card-link" block @click="deleteOffer(item.id)">{{$t('delete_offer')}}</b-button>
                </div>
                <div id="editOffer" v-if="(user_type === 'com' && applications.length == 0)">
                <b-button  class="card-link"  v-b-modal.EditOffer variant="outline-primary" @click="saveId(item.id)">{{$t('edit_offer')}}</b-button>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
      </div>
      <!-- ////// -->

 <!-- Editing offer -->
    <b-modal id="EditOffer" hide-footer ref="editOffer" size="xl" title="Edit Offer">
        <b-form  @submit.prevent>
            <label for="title">{{$t('title')}}</label>
            <b-input type="text" v-model="formEdit.title" id="title" :state="formEdit.title.length > 0"  :maxlength="80" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              {{$t('title_offer_placeholder')}}
            </b-form-text>
            <br/>
            <label for="description">{{$t('description')}}</label>
            <b-input type="text" id="description" v-model="formEdit.description" :state="formEdit.description.length > 0" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              {{$t('description_offer_placeholder')}}
            </b-form-text>
            <br/>
            <!--No sé como pasarle la oferta a la funcion updateOffer porque offerId está vacío -->
             <b-button class="mt-2" variant="success" block @click="updateOffer">{{$t('edit_offer')}}</b-button>
          </b-form>
    </b-modal>

    <!-- Modal Pop up -->
    <div>
      <b-modal id="modalxl" hide-footer ref="newOffer" size="xl" :title="$t('create_offer')">
        <b-form @submit.prevent>
          <label for="title">{{$t('title')}}</label>
          <b-input
            type="text"
            v-model="form.title"
            id="title"
            :state="form.title.length > 0"
            :maxlength="80"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">{{$t('title_offer_placeholder')}}</b-form-text>
          <br>
          <label for="description">{{$t('description')}}</label>
          <b-input
            type="text"
            id="description"
            v-model="form.description"
            :state="form.description.length > 0"
            aria-describedby="descriptionHelpBlock"
          />
          <b-form-text
            id="descriptionHelpBlock"
          >{{$t('description_offer_placeholder')}}</b-form-text>
          <br>
          <label for="price">{{$t('price_offered')}}:</label>
          <b-input
            type="number"
            id="price"
            v-model="form.price_offered"
            :state="! form.price_offered == ''"
            aria-describedby="priceHelpBlock"
          />
          <b-form-text id="priceHelpBlock">{{$t('price_offered_placeholder')}}</b-form-text>
          <br>

          <label for="limit_time">{{$t('limit_time')}}:</label>
          <b-input
            type="text"
            id="limit_time"
            v-model="form.limit_time"
            aria-describedby="descriptionHelpBlock"
            :state="(new RegExp(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/).test(form.limit_time))"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('limit_date_offer_placeholder')}}</b-form-text>
          <label for="files">{{$t('files')}}</label>
          <b-input
            type="text"
            id="files"
            v-model="form.files"
            :state="(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(form.files))"
            aria-describedby="descriptionHelpBlock"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('file_offer_placeholder')}}</b-form-text>
          <br>
          <label for="contract">{{$t('contract')}}</label>
          <b-input
            type="text"
            id="contract"
            v-model="form.contract"
            aria-describedby="descriptionHelpBlock"
            :state ="this.form.contract.length > 0"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('contract_offer_placeholder')}}</b-form-text>
          <br>

          <b-button class="mt-2" variant="success" block @click="createOffer">{{$t('create_offer')}}</b-button>
        </b-form>
      </b-modal>
    </div>

    <!-- Modal Pop up CreateApply -->
    <div>
      <b-modal id="createApply" hide-footer ref="newApply" size="xl" title="Create an apply">
        <b-form @submit.prevent>
          <label for="title">{{$t('title')}}</label>

          <b-input
            type="text"
            v-model="formApply.title"
            :state="tittleApply"
            id="title"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">{{$t('title_offer_placeholder')}}</b-form-text>
          <b-form-invalid-feedback id="apply-tittle-feedback">{{$t('title_apply_feedback')}}</b-form-invalid-feedback>
          <br>
          <label for="description">{{$t('description')}}</label>
          <b-input
            type="text"
            id="description"
            v-model="formApply.description"
            :state="descriptionApply"
            aria-describedby="descriptionHelpBlock"
          />
          <b-form-text
            id="descriptionHelpBlock"
          >{{$t('description_apply_placeholder')}}</b-form-text>
          <b-form-invalid-feedback id="apply-description-feedback">{{$t('description_apply_feedback')}}</b-form-invalid-feedback>
          <br>
          <b-button class="mt-2" variant="success" block @click="toggleCreateApply">{{$t('create_apply')}}</b-button>
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
  computed: {
    tittleApply() {
      return this.formApply.title.length > 5 ? true : false;
    },
    descriptionApply() {
      return this.formApply.description.length > 10 ? true : false;
    }
  },
  data() {
    return {
      items: [],
      applications:[],
      form: {
          title: '',
          description: '',
          price_offered: null,
          files: '',
          contract: '',
          limit_time:'',
        },
        formApply: {
            title: '',
            description: '',
            offerId: null,
        },
        formEdit: {
            title: '',
            description: '',
        },
        offerId: '',
        messages: [],
        modalShow: 'false',
        user_type: this.$cookies.get('user_type')
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

    // Para los pagos
    if (this.$cookies.get("user_type") == "com") { 
     if(window.location.search){
        if (window.location.search.split("?")[1].split("&")) {
          var respuesta_paypal = window.location.search
            .split("?")[1]
            .split("&");
          var paymentId = respuesta_paypal[0].split("=")[1];
          var token_paypal = respuesta_paypal[1].split("=")[1];
          var payerID = respuesta_paypal[2].split("=")[1];
          var url_guarda_pagos = `http://localhost:8000/api/v1/pagos/accept_paypal_payment/${paymentId}/${token_paypal}/${payerID}/`;
          this.$http
            .get(url_guarda_pagos, { headers: { Authorization: token } })
            .then(result => {
              // El pago se ha guardado
              alert(result.data.message);
              // Hago la llamada para obtener las offers con la nueva offer dentro
              var token = 'JWT ' + this.$cookies.get('token')
              this.$http.get('http://localhost:8000/api/v1/offer',{ headers:
                { Authorization: token }
                }).then((result) => {
                  this.items = result.data
              })
            });
        }
      }else{
        // Hago una llamada normal para que me las de
        var token = 'JWT ' + this.$cookies.get('token')
        this.$http.get('http://localhost:8000/api/v1/offer',{ headers:
          { Authorization: token }
          }).then((result) => {
            this.items = result.data
        })
      }
    }else{
      // Hago una llamada para que me las de siendo DS. Porque no soy company
      var token = 'JWT ' + this.$cookies.get('token')
      this.$http.get('http://localhost:8000/api/v1/offer',{ headers:
        { Authorization: token }
        }).then((result) => {
          this.items = result.data
      })
    }
    


    //este es el endpoint que devuelve las applications que tiene una oferta pero tengo el mismo problema
    //que para el edit, que no consigo pasarle la oferta. offerId está vacía
    this.$http.get('http://localhost:8000/api/v2/applicationsOfOffer/'+ offerId,{ headers:
      { Authorization: token }
      }).then((result) => {
        this.applications = result.data
      })

  }, methods: {
      toggleCreateApply() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formApply = new FormData();
       if (this.formApply.title.length < 5 || this.formApply.description.length < 10){
        alert("Please correct the errors")
       } else{
       formApply.append("title", this.formApply.title);
       formApply.append("description", this.formApply.description);
       formApply.append("offerId", this.offerId);
       this.$http.post('http://localhost:8000/api/v1/apply', formApply,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })
      }
     },
    saveId: function(idOffer){
    this.offerId = idOffer
    },
    createOffer() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();

      this.messages = [] 
      if (this.form.title.length == 0){
            this.messages.push('Title is required')
      }
      if (this.form.description.length == 0){
            this.messages.push('Description is required')
      }
      if (this.form.price_offered == null){
            this.messages.push('Price is required')
      }
      if (this.form.limit_time == null){
            this.messages.push('Limit time is required')
      }
      if (this.form.files.length == null){
            this.messages.push('File is required')
      }
      if (this.form.contract.length == 0){
            this.messages.push('Contract is required')
      }
      if(this.form.limit_time == null){
         this.messages.push('Limit date is required')  
      } else {
      var datePattern = new RegExp(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/g);
      if (!this.form.limit_time.match(datePattern)) {
        this.messages.push("Please check the pattern of limit date");

      } else{
        let date= new Date(this.form.limit_time);
        let now = Date.now();
        if(date < now){
            this.messages.push("Date can't be past");
        }
      }
      }

      var regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      );
      if (!this.form.files.match(regex)) {
        this.messages.push("That is not an URL");
      }


      if(this.messages.length > 0){ 
          this.modalShow = true
      } else{
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("price_offered", this.form.price_offered);
      formData.append("limit_time", this.form.limit_time);
      formData.append("files", this.form.files);
      formData.append("contract", this.form.contract);
      this.$http
        .post("http://localhost:8000/api/v1/offer", formData, {
          headers: { Authorization: token }
        })
        .then(result => {
          // alert(result.data.message)
          var offer_created = result.data.offer_id;
          this.$http
            .get(
              `http://localhost:8000/api/v1/pagos/create_papyal_payment/${offer_created}/`,
              { headers: { Authorization: token } }
            )
            .then(result => {
              window.location.href = result.data.url_pago;
            });
        });
        }
    },
    deleteOffer(id) {
      var token = "JWT " + this.$cookies.get("token");
      var confirm = window.confirm(
        "Are you sure you want to delete this offer?"
      );
      if (confirm) {
        this.$http
          .delete("http://localhost:8000/api/v1/company/offer/" + id, {
            headers: {
                Authorization: token
                }
              }
            ).then((result) => {
              alert(result.data.message)
              window.location.href = "/explore.html";
            });
            
          }
      },
        onSubmit() {
          let token = `JWT ${this.$cookies.get('token')}`
          this.$http.get(`http://localhost:8000/api/v1/offer?search=${this.form.search}`,{ headers:
            { Authorization: token }}).then((result) => {
              this.items = result.data
            })
        },updateOffer(){
        var token = 'JWT ' + this.$cookies.get('token')
        const formData = new FormData();
        formData.append("title", this.formEdit.title);
        formData.append("description", this.formEdit.description);
          this.$http.post('http://localhost:8000/api/v2/change_offer/' + this.offerId, formData,{ headers:
            { Authorization: token }}).then((result) => {
              this.items = result.data
              alert(result.data.message)
              window.location.href = "/explore.html";
            });
            

      }
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
