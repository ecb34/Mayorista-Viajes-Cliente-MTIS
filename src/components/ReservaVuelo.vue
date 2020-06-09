<template >
  <v-container style="max-width: 1200px;">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Elegir Vuelo</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">Elegir Hotel</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Elegir Coche</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col cols="12" sm="5">
              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="avion_f_ida"
                    slot="activator"
                    label="Fecha de ida"
                    append-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="avion_f_ida"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="5">
               <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="avion_f_regreso"
                    slot="activator"
                    label="Fecha de regreso"
                    append-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="avion_f_regreso"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="avion_cantidad_personas"
                label="Número Personas"
                append-icon="mdi-account"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select dense outlined :items="avion_origenes" label="Origen" @focus="buscarAviones"
                v-model="avion_l_origen">
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select dense outlined :items="avion_destinos" label="Destino"
                v-model="avion_l_destino">
              </v-select>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="e1 = 2">Continuar</v-btn>
          <v-btn text to="/">Cancelar</v-btn>
          <b class="blue--text" v-if="avion && avion_l_destino">Coste Vuelo: {{avion.precio}} euros</b>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="hotel_checkin"
                    slot="activator"
                    label="Check In"
                    append-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="hotel_checkin"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="hotel_checkout"
                    slot="activator"
                    label="Check Out"
                    append-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="hotel_checkout"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select :items="items_hotel" @focus="buscarHoteles" v-model="hotel" label="Elige un hotel"></v-select>
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
              <span v-if="hotel_cama">Se cobrarán 20 euros extra</span>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="e1 = 3">Continuar</v-btn>
          <v-btn text @click="e1=1">Anterior</v-btn>
          <b class="blue--text" v-if="hotel">Coste Hotel: {{hotel_cama ? hotel_precio + 20 : hotel_precio}} euros</b>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="coche_f_recogida"
                    slot="activator"
                    label="Fecha Recogida"
                    append-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="coche_f_recogida"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="coche_f_devolucion"
                    slot="activator"
                    label="Fecha devolución"
                    append-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="coche_f_devolucion"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select :items="items_coche" v-model="coche" @focus="buscarCoches" label="Elige un coche"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select dense outlined :items="[coche_l_recogida]" label="Lugar recogida"
                v-model="coche_l_recogida">
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select dense outlined :items="[coche_l_devolucion]" label="Lugar devolución"
               v-model="coche_l_devolucion">
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-checkbox v-model="coche_tanque" label="Tanque lleno"></v-checkbox>
               <span v-if="coche_tanque">Se cobrarán 40 euros extra</span>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="enviar">Finalizar</v-btn>
          <v-btn text  @click="e1=2">Anterior</v-btn>
          <b class="blue--text" v-if="coche">Coste Alquiler Coche: {{coche_tanque ? coche_precio + 40 : coche_precio}} euros</b>
          <v-divider></v-divider>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
     <v-row  justify="center" v-if="loading">
      <v-progress-circular
      :width="8"
      :size="100"
      color="primary"
      indeterminate
      ></v-progress-circular>
    </v-row>
    <v-dialog v-model="dialog" max-width="450">
        <v-card>
            <v-card-title class="headline green--text">Reserva Realizada</v-card-title>

            <v-card-text>
            Su reserva de viaje ha sido realizada,revise su correo para obtener la factura. <br>
            Gracias por confiar en nosotros.
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                @click="dialog = false"
            >
                Cerrar
            </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert type="error" v-if="error_message!=''">{{error_message}}</v-alert>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    error_message: '',
    loading: false,
    //check avion
    items: [],
    avion: null,
    avion_f_ida: null,
    avion_f_regreso: null,
    avion_l_origen: null,
    avion_origenes: [],
    avion_destinos: [],
    avion_l_destino: null,
    avion_cantidad_personas: 1,

    //check hotel
    items_hotel: [],
    hotel: "",
    hoteles: [],
    hotel_checkin: "",
    hotel_checkout: "",
    hotel_habitacion: "",
    hotel_cama: null,
    hotel_precio: -1,

    //check coche
    items_coche: [],
    coche: "",
    coches: [],
    coches_origenes: [],
    coches_destinos: [],
    coche_f_devolucion: "",
    coche_f_recogida: "",
    coche_l_recogida: "",
    coche_l_devolucion: "",
    coche_tanque: null,
    coche_precio: -1,

    e1: 1
  }),

  methods: {
    /*buscarVueloOrigenes(){
      axios.get(`http://localhost:3000/avion/origenes?fecha=${this.avion_f_ida}`).then((res) => {
        this.avion_origenes = res.data.map((r) => r.lugar_origen)
      })
    },
    buscarVueloDestinos(){
      axios.get(`http://localhost:3000/avion/destinos?fecha=${this.avion_f_regreso}`).then((res) => {
        this.avion_destinos = res.data.map((r) => r.lugar_destino)
      })
    },*/
    buscarAviones(){
      axios.get(`http://localhost:3000/avion/getAvion?ida=${this.avion_f_ida}&vuelta=${this.avion_f_regreso}`).then((res) => {
        this.avion = res.data[0]
        if(this.avion == null){
          this.error_message = "No hay vuelos para las fechas seleccionadas"
        }else{
          console.log(this.avion)
          this.error_message = ""
          this.avion_origenes = [this.avion.lugar_origen]
          this.avion_destinos = [this.avion.lugar_destino]
        }
        
      })
    },
    buscarHoteles(){
      axios.get(`http://localhost:3000/hotel/getHotel?checkin=${this.hotel_checkin}&checkout=${this.hotel_checkout}`)
      .then(res => {
        this.hoteles = res.data;
        this.items_hotel = this.hoteles.map((h) => h.nombre)
      })
      .catch(err => {
        console.log(err.response);
      });
    },
    buscarCoches(){
      axios.get(`http://localhost:3000/coche/getCoche?recogida=${this.coche_f_recogida}&devolucion=${this.coche_f_devolucion}`)
      .then(res => {
        this.coches = res.data;
        this.items_coche = this.coches.map((c) => c.nombre)
      })
      .catch(err => {
        console.log(err.response);
      });
    },
    enviar() {
      const body = {
          login: {
            usuario: localStorage.getItem("email"),
            password: localStorage.getItem("password")
          },
          avion: {
            fecha_ida: this.avion_f_ida,
            fecha_regreso: this.avion_f_regreso,
            cantidad_personas: this.avion_cantidad_personas,
            lugar_origen: this.avion_l_origen,
            lugar_destino: this.avion_l_destino,
          },
          hotel: {
            fecha_checkin: this.hotel_checkin,
            fecha_checkout: this.hotel_checkout,
            tipo_habitacion: this.hotel_habitacion,
            cama_supletoria: this.hotel_cama,
          },
          coche: {
            fecha_recogida: this.coche_f_recogida,
            fecha_devolucion: this.coche_f_devolucion,
            lugar_recogida: this.coche_l_recogida,
            lugar_devolucion: this.coche_l_devolucion,
            tanque_lleno: this.coche_tanque,
          }
        }
      this.loading = true
      axios
        .post("http://localhost:8081/reserva", body)
        .then((res) => {
          this.loading = false
          if(res.data != true){
            this.error_message = res.data
          }else{
            this.dialog = true
            setTimeout(() => {
              this.$router.push('/')
            },8000)
          }
        })
        .catch(err => {
          console.log(err)
          this.error_message = err.message
          this.loading = false
        });
    }
  },
  watch: {
    hotel: function(){
      if (this.hotel != null) {
        this.hoteles.forEach(res => {
          if (this.hotel == res.nombre) {
            this.hotel_habitacion = res.tipo_habitacion
            this.hotel_precio = res.precio
          }
        });
      }
    },
    coche: function() {
      if (this.coche != null) {
        this.coches.forEach(res => {
          if (this.coche == res.nombre) {
            this.coche_l_recogida = res.lugar_recogida;
            this.coche_l_devolucion = res.lugar_devolucion;
            this.coche_precio = res.precio;
          }
        });
      }
    }
  }
};
</script>