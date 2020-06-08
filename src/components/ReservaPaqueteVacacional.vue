<template>
  <v-container style="max-width: 500px;" class="mt-10">
      <v-form>
          <v-card>
              <v-card-title>Reserva Paquete Vacacional</v-card-title>
              <v-card-text>
                  <div class="form-group">
                    <label>Paquete ID</label><br>
                    <input type="number" v-model="paquete_id">
                  </div>
                   <div class="form-group">
                    <label>Unidades</label><br>
                    <input type="number" v-model="unidades">
                  </div>
                  <v-alert type="error" v-if="error_message!=''">{{error_message}}</v-alert>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="reservar()" class="blue--text" outlined block>Reservar</v-btn>
              </v-card-actions>
          </v-card>
      </v-form>
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
     unidades: 0,
     paquete_id: 0,
     error_message: '',
     dialog: false
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
            }
        }).catch(() => {
            this.error_message = "Error en la comunicación con el servidor"
        })
     }
 }
}
</script>

<style>

</style>