<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <router-link  to="/" class="white--text"> <h1>Mayorista Viajes</h1></router-link>
       
      </div>

      <v-spacer></v-spacer>
      <div v-if="loggedIn">
        <v-btn color="error" @click="logout">Logout</v-btn>
      </div>
      <login v-else></login>
    </v-app-bar>

    <v-content>
       <router-view />
    </v-content>
    <v-footer>
      <cookie-law>
        <div slot="message">
            Este sitio web utiliza cookies para que usted tenga la mejor experiencia de usuario. Si continúa
            navegando está dando su consentimiento para la aceptación de las mencionadas cookies y la
            aceptación de nuestra política de cookies
        </div>
    </cookie-law>
    </v-footer>
  </v-app>
</template>

<script>
import Login from './components/Login'
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'App',

  components: {
    Login,
    CookieLaw,
  },

  data: () => ({
    //
  }),
  methods: {
    logout(){
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      location.reload()
    }
  },
  computed: {
    loggedIn() {
      return localStorage.getItem('email') != null
    },
  }
};
</script>
