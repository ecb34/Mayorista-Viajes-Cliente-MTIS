<template>
<div class="text-center">
            <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    Login
                    <v-icon>mdi-login</v-icon>
                </v-btn>
            </template>
  <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Iniciar Sesión</v-toolbar-title>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="Email"
                    v-model="credenciales.email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Contraseña"
                    name="contraseña"
                    v-model="credenciales.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-alert type="error" v-if="error != ''">{{error}}</v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  @click="submit" color="blue" class="white--text">Login</v-btn>
              </v-card-actions>
            </v-card>
            </v-dialog>
    </div>
</template>

<script>
export default {
 data: function(){
        return{
            dialog: false,
            credenciales: {
                email: '',
                password: '',
            },
            error: ''
        }
    },
    methods: {
        submit(){
            //puede q llamemos al servicio para comprobar esto..?
            localStorage.setItem('email', this.credenciales.email)
            localStorage.setItem('password', this.credenciales.password)
            location.reload()
        }
    }
}
</script>
