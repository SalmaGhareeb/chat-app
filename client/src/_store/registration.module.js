import { userService } from '../_services';
import { router } from '../_helpers';
// eslint-disable-next-line import/prefer-default-export
export const registeration = {
    namespaced: true,
    state: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: false
    },
    actions: {
        register({ dispatch, commit }, data) {
            console.log(data);

            userService.register(data).then(() => {
                commit('registerSuccess');
                router.push('/login');
            }).catch((error) => {

                commit('loginFailure', error);
                dispatch('alert/error', error, {
                    root: true
                });

            });
        }
    },
    mutations: {
        registerationRequest(state, user) {
            state.status = true;

        },
        registerSuccess(state, user) {
            state.status = true;
        },
        registerFailure(state) {
            state.status = {};
        },
        logout(state) {
            state.status = false;
        }
    }
};