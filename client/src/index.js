import Vue from 'vue';
import 'babel-polyfill';
import VueSocketIO from 'vue-socket.io';
import Vuetify from 'vuetify';

import { store } from './_store';
import { router } from './_helpers';

import App from './app/App';

const SocketIO = require('socket.io-client');


Vue.use(Vuetify);
Vue.use(new VueSocketIO({
    debug: true,
    transport: ['websockets'],
    connection:  SocketIO('http://localhost:3000', {'transports': ['websocket']}),
    vuex: {
        store
    }
}));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');