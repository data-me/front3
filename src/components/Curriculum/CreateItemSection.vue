<template lang="html">


    <div>

           <b-modal v-model="showModal" ref="messages" id="messages" hide-footer size="xl" title="Erros">
            <template slot="modal-header"> Please check the errors below </template>
            <li id="messagesError" v-for="message in this.messages"> {{message}}</li>
            <template slot="modal-footer"><button class="btn btn-primary">Save Changes</button></template>
            <b-button class="mt-3" variant="outline-danger" block @click="showModal = false">Close</b-button>
        </b-modal>


        <h4>Create item section</h4>
        <b-form id="item" @submit.prevent @submit="onSubmit" @reset="onReset">

            <b-col sm="3">
                <label for="name">Name:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="name"
                v-model="item.name"
                required
                placeholder="Name this record"
            ></b-form-input>
            </b-col>

            <b-col sm="3">
                <label for="entity">Entity:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="entity"
                v-model="item.entity"
                required
                placeholder="Organization or Entity"
            ></b-form-input>
            </b-col>

            <b-col sm="3">
                <label for="description">Desription:</label>
            </b-col>
            <b-col sm="9">
            <b-form-textarea
                id="description"
                v-model="item.description"
                placeholder="Enter a description..."
                rows="3"
                max-rows="6"
                required
            ></b-form-textarea>
            </b-col>

            <b-col sm="3">
                <label for="datestart">Start date:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="datestart"
                v-model="item.datestart"
                placeholder="yyyy-MM-dd"
                required
            ></b-form-input>
            </b-col>

            <b-col sm="3">
                <label for="datefinish">Finalization date:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="datefinish"
                v-model="item.datefinish"
                placeholder="yyyy-MM-dd"
            ></b-form-input>
            </b-col>
            <br/>
            <b-col sm="9">
            <b-button type="submit" variant="primary">Save</b-button>
            </b-col>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'CreateItemSection',
    data(){
        return{
            item:{
                name: '',
                entity: '',
                description:'',
                datestart: '',
                datefinish: '',
            },
            showModal : false,
            messages: []

        }
    },
     props: ['secid'],
    methods: {
    onSubmit(evt) {
      evt.preventDefault()
        this.messages = []
     var datePattern = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g);
      if (!this.item.datestart.match(datePattern)) {
        alert("Please check the patter of the start date");
      }

    if (this.item.datefinish != '' && !this.item.datefinish.match(datePattern)) {
        alert("Please check the pattern of the finish date");
      }

      if(this.messages.length > 0){ 
          this.showModal = true
      }
      else{
        var token = 'JWT ' + this.$cookies.get('token')
      const baseURI = 'http://localhost:8000/api/v1/item'
      const formData = new FormData();
      formData.append('name', this.item.name);
      formData.append('secid', Number(this.secid));
      formData.append('description', this.item.description);
      formData.append('entity', this.item.entity);
      formData.append('datestart',this.item.datestart);
      if(this.item.datefinish !== null && this.item.datefinish.length !== 0){
        formData.append('datefinish',this.item.datefinish);
      }
      this.$http.post(baseURI, formData, { headers: { Authorization: token }})
      .then((result) => {
          location.reload()
      })
      }
    }
  }
}
</script>
<style lang="css" scoped>

</style>
