<template >
  <v-container style="max-width: 1200px;">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Elegir Avión</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">Elegir Hotel</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Elegir Coche</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select :items="items" v-model="avion" label="Elige un tipo de avión"></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                value="Fecha de ida"
                v-model="avion_f_ida"
                label="Fecha de ida"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                value="regreso"
                v-model="avion_f_regreso"
                label="Fecha de regreso"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                value="origen"
                v-model="avion_l_origen"
                label="Lugar de origen"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                value="destino"
                v-model="avion_l_destino"
                label="Lugar de destino"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                value="cantidad"
                v-model="avion_cantidad_personas"
                label="Cantidad Personas"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="e1 = 2">Continuar</v-btn>
          <v-btn text>Cancelar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select :items="items_hotel" v-model="hotel" label="Elige un hotel"></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field value="checkin" v-model="hotel_checkin" label="Check-In" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field value="checkout" v-model="hotel_checkout" label="Check-Out" readonly></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                value="habitacion"
                v-model="hotel_habitacion"
                label="Tipo habitación"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-checkbox v-model="hotel_cama" label="Cama Supletoria"></v-checkbox>
            </v-col>
          </v-row>

          <v-btn color="primary" @click="e1 = 3">Continuar</v-btn>

          <v-btn text>Cancelar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select :items="items_coche" v-model="coche" label="Elige un coche"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                value="f_recogida"
                v-model="coche_f_recogida"
                label="Fecha de recogida"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                value="f_devolucion"
                v-model="coche_f_devolucion"
                label="Fecha de devolucion"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                value="l_recogida"
                v-model="coche_l_recogida"
                label="Lugar de Recogida"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                value="l_devolucion"
                v-model="coche_l_devolucion"
                label="Lugar de Devolucion"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-checkbox v-model="coche_tanque" label="Tanque lleno"></v-checkbox>
            </v-col>
          </v-row>

          <v-btn color="primary" @click="enviar">Finalizar</v-btn>

          <v-btn text>Cancelar</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    alert: false,
    //check avion
    items: [],
    avion: "",
    aviones: [],
    avion_f_ida: "",
    avion_f_regreso: "",
    avion_l_origen: "",
    avion_l_destino: "",
    avion_cantidad_personas: null,

    //check hotel
    items_hotel: [],
    hotel: "",
    hoteles: [],
    hotel_checkin: "",
    hotel_checkout: "",
    hotel_habitacion: "",
    hotel_cama: null,

    //check coche
    items_coche: [],
    coche: "",
    coches: [],
    coche_f_devolucion: "",
    coche_f_recogida: "",
    coche_l_recogida: "",
    coche_l_devolucion: "",
    coche_tanque: null,

    e1: 1
  }),

  methods: {
    enviar() {
      console.log(this.hotel_checkin + "  " + this.hotel_checkout);
      axios
        .post("http://localhost:8081/reserva", {
          //headers: {
          //  "Access-Control-Allow-Origin": "*"
          //},
          login: {
            usuario: localStorage.getItem("email"),
            password: localStorage.getItem("password")
          },
          avion: {
            reserva_id: "",
            fecha_ida: this.avion_f_ida,
            fecha_regreso: this.avion_f_regreso,
            cantidad_personas: this.avion_cantidad_personas,
            lugar_origen: this.avion_l_origen,
            lugar_destino: this.avion_l_destino,
            precio: this.avion_cantidad_personas
          },
          hotel: {
            reserva_id: "",
            fecha_checkin: this.hotel_checkin,
            fecha_checkout: this.hotel_checkout,
            tipo_habitacion: this.hotel_habitacion,
            cama_supletoria: this.hotel_cama,
            precio: 300
          },
          coche: {
            reserva_id: "",
            fecha_recogida: this.coche_f_recogida,
            fecha_devolucion: this.coche_f_devolucion,
            lugar_recogida: this.coche_l_recogida,
            lugar_devolucion: this.coche_l_devolucion,
            tanque_lleno: this.coche_tanque,
            precio: ""
          }
        })
        .then(res => {
          //console.log(res);
          if (res.status == 200) {
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  watch: {
    aviones: function() {
      this.aviones.forEach(res => {
        this.items.push(res.nombre);
      });
    },
    avion: function() {
      if (this.avion != null) {
        this.aviones.forEach(res => {
          if (this.avion == res.nombre) {
            this.avion_f_ida = res.fecha_ida;
            this.avion_f_regreso = res.fecha_regreso;
            this.avion_l_origen = res.lugar_origen;
            this.avion_l_destino = res.lugar_destino;
          }
        });
      }
    },

    hoteles: function() {
      this.hoteles.forEach(res => {
        this.items_hotel.push(res.nombre);
      });
    },

    coches: function() {
      this.coches.forEach(res => {
        this.items_coche.push(res.nombre);
      });
    },

    hotel: function() {
      if (this.hotel != null) {
        this.hoteles.forEach(res => {
          if (this.hotel == res.nombre) {
            this.hotel_checkin = res.fecha_checkin;
            this.hotel_checkout = res.fecha_checkout;
            this.hotel_habitacion = res.tipo_habitacion;
          }
        });
      }
      console.log(this.hotel_checkin);
    },

    coche: function() {
      if (this.coche != null) {
        this.coches.forEach(res => {
          if (this.coche == res.nombre) {
            this.coche_f_devolucion = res.fecha_devolucion;
            this.coche_f_recogida = res.fecha_recogida;
            this.coche_l_recogida = res.lugar_recogida;
            this.coche_l_devolucion = res.lugar_devolucion;
          }
        });
      }
    }
  },
  computed: {},
  mounted() {
    axios
      .get("http://localhost:3000/avion/getAvion")
      .then(res => {
        this.aviones = res.data.res;
      })
      .catch(err => {
        console.log(err.response);
      });

    axios
      .get("http://localhost:3000/hotel/getHotel")
      .then(res => {
        this.hoteles = res.data.res;
      })
      .catch(err => {
        console.log(err.response);
      });

    axios
      .get("http://localhost:3000/coche/getCoche")
      .then(res => {
        this.coches = res.data.res;
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};
</script>