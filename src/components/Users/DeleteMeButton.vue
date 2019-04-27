<template>
        <div style="float: center;">
            <b-button 
              variant="danger"
              class="mt-2"
              block
              @click="deleteConfirmation()">
                Delete all my information
              </b-button>
        </div>
</template>

<script>
export default {
    name: "DeleteMeButton",
    data(){
        return{

        }
    },
    methods:{
      deleteConfirmation(){
        this.$swal({
            type: 'warning',
            title: 'Are you sure you want to delete all your user information?',
            text: 'This operation cannot be undone. All the information linked to you will be erased, this includes all your past actity in our platform',
            showCancelButton: true,
            //confirmButtonColor: '#3085d6',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
              this.deleteUser();
              }
          })
      },
      deleteUser(){
          var token = "JWT " + this.$cookies.get("token");
          const formData = new FormData();
          this.$http
          .post("http://localhost:8000/api/v3/delete_me", formData, {
              headers: { Authorization: token }
          }).then((result) => {
              if (result.success) {
                this.$swal({
                  type: 'success',
                  title: 'Deleted!',
                  text: 'All your user information has been deleted.',
                }
                )
              }
            }).then((result) => {
              if (result.value) {
                window.location.href = 'http://localhost:8080';
              }else if(result.dismiss){
                window.location.href = 'http://localhost:8080';
              }
            })
      }
    }
}

</script>

<style>
  .company-bcard {
    margin: 2em;
  }
</style>