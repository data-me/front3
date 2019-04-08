<template>
  <div id="app">
    <Navbar />
      <header class="masthead">
      <div class="container">
        <div class="intro-text">
          <div class="intro-lead-in">{{$t('message')}}</div>
            <div class="intro-heading text-uppercase">{{$t('home_message')}}</div>
            <div class="intro-lead-in">DataMe - {{$t('version')}} 1.0 (Sprint 1) </div>
          </div>
        </div>
  </header>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  }, mounted: function () {
    var lang

    if (this.$cookies.get('lang')) {
      lang = this.$cookies.get('lang')
    } else {
      lang = 'en'
    }
    this.$i18n.locale = lang
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

.text-uppercase {
    text-transform: uppercase!important;
}

header.masthead .intro-text .intro-heading {
    font-size: 75px;
    font-weight: 700;
    line-height: 75px;
    margin-bottom: 50px;
    font-family: Montserrat,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
}

header.masthead .intro-text .intro-lead-in {
    font-size: 40px;
    font-style: italic;
    line-height: 40px;
    margin-bottom: 25px;
    font-family: 'Droid Serif',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
}

header.masthead .intro-text {
    padding-top: 150px;
    padding-bottom: 100px;
}

header.masthead {
    text-align: center;
    color: rgb(255, 255, 255);
    background-image: url("https://data-me.github.io/img/header-bg.png");
    background-attachment: scroll;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

html {
  background-color: #ffffff;
}




</style>
