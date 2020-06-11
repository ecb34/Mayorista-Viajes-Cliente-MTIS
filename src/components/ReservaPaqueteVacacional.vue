<template>
  <v-container style="max-width: 500px;" class="mt-10">
      <v-stepper v-model="stepper" vertical>
        <v-stepper-step :complete="stepper > 1" step="1">
            Selecciona un paquete
            <small>Tenemos una gran selección</small>
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-row v-for="paquete in paquetes" v-bind:key="paquete.id" class="mb-10">
                <v-card color="blue lighten-5" height="220px" width="300px" class="mx-auto">
                    <v-card-title>{{paquete.titulo}}</v-card-title>
                    <v-card-text>
                        <p>{{paquete.descripcion}}</p>
                        <b >{{paquete.precio}} euros</b>
                    </v-card-text>
                    <v-card-actions class="mx-auto">
                        <v-btn @click="selected(paquete)" color="teal accent-3" class="white--text">Seleccionar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
            <v-btn text to="/" outlined color="grey">Cancelar</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 2" step="2">
             Selecciona las unidades
        </v-stepper-step>
        <v-stepper-content step="2">
            
                <v-card-title>{{nombre}}</v-card-title>
                <v-card-subtitle>ID: {{paquete_id}}</v-card-subtitle>
                <v-card-text>
                    <label class="mr-3">Unidades a comprar:</label>
                    <v-icon size="25" grey @click="unidades-=1" class="mr-1">mdi-minus
                    </v-icon>
                    {{unidades}}
                    <v-icon size="25" grey @click="unidades+=1" class="ml-1">mdi-plus
                    </v-icon>
                    <div class="mt-3 ml-12">
                        <h3>Precio Total: {{unidades * precio}} euros</h3>
                    </div>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="reservar()" class="blue--text" outlined block>Reservar</v-btn>
                </v-card-actions>
                 <v-row  justify="center" v-if="loading">
                    <v-progress-circular
                    :width="8"
                    :size="100"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </v-row>
            <v-alert type="error" v-if="error_message!=''">{{error_message}}</v-alert>
            <v-btn text @click="stepper = 1" outlined color="grey" class="mt-4">Anterior</v-btn>
        </v-stepper-content>
      </v-stepper>
      
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
            <v-card-title class="headline green--text">Reserva Realizada</v-card-title>

            <v-card-text>
            Su reserva del paquete vacacional {{paquete_id}} ha sido realizada, en su correo tendrá la factura. <br>
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
  </v-container>
</template>

<script>
import soapRequest from "easy-soap-request"
import xml2js from "xml2js"
export default {
 data: () => ({
     unidades: 1,
     paquete_id: 0,
     nombre: '',
     precio: -1,
     error_message: '',
     dialog: false,
     paquetes: [],
     stepper: 1,
     loading: false,
 }),
 methods: {
     async reservar(){
         this.error_message = ''
         let xml=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:paq="http://paquete">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <paq:PaqueteVacacionalRequest>
                            <paq:usuario>${localStorage.getItem('email')}</paq:usuario>
                            <paq:password>${localStorage.getItem('password')}</paq:password>
                            <paq:unidades>${this.unidades}</paq:unidades>
                            <paq:paquete_id>${this.paquete_id}</paq:paquete_id>
                        </paq:PaqueteVacacionalRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`
        let url = 'http://localhost:8080/ode/processes/PaqueteVacacional'
        let headers = {'Content-Type': 'text/xml'}
        this.loading = true
       try { 
            const  response  = await soapRequest({ url: url, headers: headers, xml: xml }); 
            const body = response.response.body
            let parser = new xml2js.Parser()
            parser.parseStringPromise(body).then((json) => {
                let response = json["soapenv:Envelope"]["soapenv:Body"][0].PaqueteVacacionalResponse
                let result = response[0]["tns:resultado"][0]
                if(result == "false"){
                    let message = response[0]["tns:mensaje"][0]._
                    this.error_message = message
                }else{
                    this.dialog = true
                     setTimeout(() => {
                        this.$router.push('/')
                     },8000)
                }
            }).catch(() => {
                this.error_message = "Error en la comunicación con el servidor"
            })
       } catch (error) {
           console.log(error);
           this.error_message = 'Error en la comunicación con el servidor'
       }
       this.loading = false
     },
     selected(paquete){
         this.stepper = 2;
         this.precio = paquete.precio
         this.paquete_id = paquete.id;
         this.nombre = paquete.titulo;
     }
 },
 async mounted(){
     let xml=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:paq="http://www.mtis.org/PaqueteVacacional/">
                <soapenv:Header/>
                <soapenv:Body>
                    <paq:obtenerPaquetes/>
                </soapenv:Body>
                </soapenv:Envelope>`
        let url = 'http://localhost:9080/PaqueteVacacional/services/PaqueteVacacional'
        let headers = {'Content-Type': 'text/xml'}
        
        try{
            const  response  = await soapRequest({ url: url, headers: headers, xml: xml });
            const body = response.response.body
            let parser = new xml2js.Parser()
            parser.parseStringPromise(body).then((json) => {
            let response = json["soapenv:Envelope"]["soapenv:Body"][0]["ns1:obtenerPaquetesResponse"][0]
            for (let i = 0; i < response.ids.length; i++) {
                const paquete = {
                    id: response.ids[i]._,
                    precio: response.precios[i]._,
                    descripcion: response.descripciones[i]._,
                    titulo: response.titulos[i]._
                }
                this.paquetes.push(paquete)
            }
            }).catch(() => {
                this.error_message = "Error en la comunicación con el servidor"
            })
        }catch(err){
            console.log(err)
            this.error_message = 'Error en la comunicación con el servidor'
        }
    }
}
</script>

<style>

</style>