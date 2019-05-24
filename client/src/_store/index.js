import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { registeration } from './registration.module';
import { users } from './users.module';
import { socket } from './socket';
import { chat } from './chat.module';

Vue.use(Vuex);
Vue.use(require('vue-moment'));

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        socket,
        registeration,
        chat
    }
});
