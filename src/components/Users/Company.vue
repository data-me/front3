<template>
  <b-card class="company-bcard" :title="'Company ID: ' + company.id">
    <b-card-text class="card-text">
      <label for="address">Name:</label>
      {{company.name}}
    </b-card-text>
    <b-card-text class="card-text">
      <label for="address">Description:</label>
      {{company.description}}
    </b-card-text>
    <b-card-text class="card-text">
      <label for="address">NIF:</label>
      {{company.nif}}
    </b-card-text>
    <div style="float: right;">
      <b-button
        variant="danger"
        class="mt-2"
        block
        @click="deleteUser(company.user_id)"
      >Delete company</b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "Company",
  data() {
    return {};
  },
  props: ["company"],
  methods: {
    deleteUser(user_id) {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      formData.append("user_id", user_id);
      this.$http
        .post(" http://localhost:8000/api/v2/delete_user", formData, {
          headers: { Authorization: token }
        })
        .then(result => {
          location.reload();
        });
    }
  }
};
</script>

<style>
.company-bcard {
  margin: 2em;
}
</style>
