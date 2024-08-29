import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachList from './pages/coaches/CoachesList.vue';
// import CoachRegister from './pages/coaches/CoachRegister.vue';

// import CoachContact from './pages/requests/CoachContact.vue';
// import RequestReceived from './pages/requests/RequestsReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';

// import NotFound from './pages/NotFound.vue';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');

const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');

const CoachContact = () => import('./pages/requests/CoachContact.vue');

const RequestReceived = () => import('./pages/requests/RequestsReceived.vue');

const UserAuth = () => import('./pages/auth/UserAuth.vue');

const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetails,
      children: [{ path: 'contact', component: CoachContact }],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  strict: false,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
