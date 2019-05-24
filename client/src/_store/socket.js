import Axios from 'axios';
import { router } from '../_helpers';
import authHeader from '../_helpers/auth-header';

// eslint-disable-next-line import/prefer-default-export
export const socket = {
    namespaced: true,
    state: {
        chats: [],
        online: [],
        handle: ""
    },
    actions: {
        SET_CHAT: async (context, id) => {    
            let {
                data
            } = await Axios.get('http://localhost:3000/chat/m/' + id, {
                'headers': authHeader()
            });

            context.commit("SET_CHAT", data);
        },
        ADD_CHAT: (context, payload) => {
            context.commit("ADD_CHAT", payload);
        },
        SET_HANDLE: (context, payload) => {
            context.commit("SET_HANDLE", payload);
        },
        SET_ONLINE_USER: (context, payload) => {
            context.commit("SET_ONLINE_USER", payload);
        },
        REMOVE_USER: (context, payload) => {
            context.commit("REMOVE_USER", payload);
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
        },
        SET_ONLINE_USER: (state, payload) => {
            state.online.push(payload);
        },
        REMOVE_USER: (state, payload) => {
            state.online.splice(payload);
        },
    }
};