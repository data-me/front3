<template>
    <div id="footer">
    <b-navbar type="dark" variant="dark" fixed="bottom">
        <b-nav-text>© Copyright 2019 | Made with ❤️ in Sevilla</b-nav-text>
         <b-navbar-nav class="ml-auto">
            <b-nav-item href="https://data-me.github.io/">About us</b-nav-item>
            <b-nav-item href="/terms_and_conditions.html">Terms and conditions</b-nav-item>
            <!--<b-nav-item href="#">Privacy policy</b-nav-item>-->
        </b-navbar-nav>

    </b-navbar>
    </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
      fixed: String,
      sticky: Boolean
  }
}
</script>

<style>

</style>
