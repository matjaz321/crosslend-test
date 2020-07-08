<template>
  <div id="app">
    <Header :isUserLoaded="isUserLoaded" :userProfile="userProfile"/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      userProfile: {},
      isUserLoaded: false
    }
  },

  methods: {
    init() {

      const USER_API = 'https://frontend.apply.crosslend.dev/user/info.json';

      axios
          .get(USER_API)
          .then(response => {
            if (response.status === 200) {
              this.isUserLoaded = true;

              if (typeof response.data.body.User.profile !== 'undefined') {
                this.userProfile = response.data.body.User.profile;
              }
            } else {
              this.userProfile = require('../_docs/info.json');
            }
          });
    }
  },

  mounted() {
    this.init();
  },

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;

  font-family: Verdana, sans-serif;
}


@-webkit-keyframes sk-bounce {
  0%, 100% {
    -webkit-transform: scale(0.0)
  }
  50% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}


#app {
  background: white;
}

</style>