import { createStore } from 'vuex';

import coachesMoudle from './coaches/index.js';
import requestsModule from './requests/index.js';
import authModule from './auth/index.js';

const store = createStore({
  modules: {
    coaches: coachesMoudle,
    requests: requestsModule,
    auth: authModule,
  },
});

export default store;
