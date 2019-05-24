import { chatService } from '../_services';
import { router } from '../_helpers';
// eslint-disable-next-line import/prefer-default-export
export const chat = {
    namespaced: true,
    state: {
        rooms: {}
    },
    actions: {
        public({ dispatch, commit }) {
            chatService.publicRooms().then((chats) => {
                commit('ROOMS', chats);
            });
        },
        create({ dispatch, commit }, data) {
            chatService.create(data).then((room) => {
                commit('create', room);
            });
        }
    },
    mutations: {
        ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        create(state, room) {
            state.rooms.push(room);
        }
    }
};