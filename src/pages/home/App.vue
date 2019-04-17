<template>
  <div id="app">
    <Navbar id="nav"/>

    <div class="wrap-banner">
       <div class="main-title">
        <h2 class="statement">{{$t('message')}}</h2>
        <h1 class="title">{{$t('home_message')}}</h1>
       </div>
    </div>
    <vue-particles color="#22546f"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor= "#37868a"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    ></vue-particles>
    
    

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
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

html {
  background-color: #ffffff;
}

h1.title {
  z-index: 999;
  display: block;
  font-size: 4rem;
}

#nav {
  z-index: 999;
}

#particles-js {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.wrap-banner {
    position: relative;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    justify-content: center;
}

 .main-title {
    margin-top: 10em; 
    color: #000;
    z-index: 999;
}

h2.statement {
    font-size: 3rem;
}

@media all and (max-width: 699px)  {
   h2.statement {
    font-size: 1.4rem;
  }
  h1.title {
    font-size: 2.5rem;
  }
}
</style>
