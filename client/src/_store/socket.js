import Axios from 'axios';
import authHeader from '../_helpers/auth-header';

export const socket = {
    namespaced: true,
    state: {
        chats: [],
        handle: ""
    },
    actions: {
        SET_CHAT: async (context, payload) => {
            let {
                data
            } = await Axios.get('http://localhost:3000/chat', {
                'headers': authHeader()
            });

            context.commit("SET_CHAT", data);
        },
        ADD_CHAT: (context, payload) => {
            context.commit("ADD_CHAT", payload);
        },
        SET_HANDLE: (context, payload) => {
            context.commit("SET_HANDLE", payload);
        }
    },
    mutations: {
        SET_CHAT: (state, payload) => {
            state.chats = payload;
        },
        ADD_CHAT: (state, payload) => {
            state.chats.push(payload);
        },
        SET_HANDLE: (state, payload) => {
            state.handle = payload;
        }
    }
};