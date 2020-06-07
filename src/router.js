import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home'
import ReservaVuelo from './components/ReservaVuelo'
import ReservaPaquete from './components/ReservaPaqueteVacacional'
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            props: true
        },
        {
            path: '/reserva/vuelo',
            name: 'reservavuelo',
            component: ReservaVuelo,
            props: true
        },
        {
            path: '/reserva/paquete',
            name: 'reservapaquete',
            component: ReservaPaquete
        }
    ]
})