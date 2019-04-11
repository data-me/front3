<template>
    <div id="footer">
    <b-navbar type="dark" variant="dark" fixed="bottom">
        <b-nav-text>© Copyright 2019 | {{$t('made_in_sevilla')}}</b-nav-text>
         <b-navbar-nav class="ml-auto">
            <b-nav-item href="https://data-me.github.io/">{{$t("about_us")}}</b-nav-item>
            <b-nav-item href="/terms_and_conditions.html">{{$t('terms&conditions')}}</b-nav-item>
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
