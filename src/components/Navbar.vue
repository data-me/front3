<template>
    <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">
            <img id="DataMe-brand" src="https://data-me.github.io/img/branding/DataMe-brand.png">
            </b-navbar-brand>


        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item href="/applications.html">{{ $t('applications') }}</b-nav-item>
            <b-nav-item href="/explore.html">{{ $t('offers') }}</b-nav-item>
            <!-- <b-nav-item href="/companies.html">Companies</b-nav-item> -->
            <!-- <b-nav-item href="#">Pricing</b-nav-item> -->
            <b-nav-item href="/mail.html">{{ $t('mail') }}</b-nav-item>
            <!--<div v-if="user_type === 'ds'">-->
            <b-nav-item v-show="isDataScientist" href="/my_cv.html">Curriculum</b-nav-item>
            <b-nav-item v-show="isAdmin" href="/dashboard.html">Dashboard</b-nav-item>
            <b-nav-item v-show="(!isDataScientist && !isCompany) && isLoggedIn" href="/admin_offers.html">Manage Offers</b-nav-item>

            <b-nav-item href="/submition.html" v-show="isLoggedIn">My submitions</b-nav-item>
            <b-nav-item href="/login.html" v-show="!isLoggedIn">{{ $t('login') }}</b-nav-item>
            <b-nav-item href="/register.html" v-show="!isLoggedIn">{{ $t('Sign up') }}</b-nav-item>
            <b-nav-item href="#" v-show="isLoggedIn" @click="logOut">Log Out</b-nav-item>
            <b-nav-item-dropdown :text="$t('lang')" v-model="$i18n.locale" right>
                <b-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" @click="changeLanguage(lang)">{{ lang }}</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>
<script>
export default {
  name: 'Navbar',
  props:{

  },
  data () {
    return {
      items: [],
      form: {
          title: '',
          description: '',
          status: '',
          date: null
        },
      isCompany: null,
      isDataScientist: null,
      isAdmin: null,
      isLoggedIn: null,
      langs: ['en', 'es'],
      language: this.$t.lang
    }
  }, mounted: function () {
    //var token = 'JWT ' + this.$cookies.get('token')

    if (this.getCookie('user_type') == 'com') {
      this.isCompany = true
    } else if (this.getCookie('user_type') == 'ds') {
      this.isDataScientist = true
    } else if (this.getCookie('user_type') == 'admin'){
      this.isAdmin = true
    }
  }, created: function() {
      if (this.getCookie('token')) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    }, methods: {
        getCookie: function(name) {
          var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return v ? v[2] : null;
        },
        setCookie: function(name, value, days) {
          var d = new Date;
          d.setTime(d.getTime() + 24*60*60*1000*days);
          document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        logOut: function() {
              this.setCookie('token', '', -1)
              window.location.href = "/";
            },
        changeLanguage: function(lang) {
          this.$i18n.locale = lang
          this.setCookie('lang',lang, 2)
          //window.location.href = "/"
        }
        }
        
}

</script>
<style>
#DataMe-brand {
    height: 35px;
    width: auto;
}
</style>
