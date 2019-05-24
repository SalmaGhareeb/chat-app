import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../home/HomePage';
import ChatPage from '../Components/Chat';
import Rooms from '../Components/ChatGroups';
import LoginPage from '../login/LoginPage';
import RegisterPage from '../login/RegisterPage';

Vue.use(VueRouter);

// eslint-disable-next-line import/prefer-default-export
export const router = new VueRouter({
  routes: [
    {
      path: '/room/:id',
      component: ChatPage,
      props: true,
      meta: {
        windowRedirectAfter: true,
      }
    },
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/chat',
      component: Rooms
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});