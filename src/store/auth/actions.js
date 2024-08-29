import axios from 'axios';

export default {
  async auth(context, payload) {
    const apikey = 'AIzaSyBBx1Y_qnua20yRNiQDZi4V8egQBcZCJ7w';
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`;

    if (payload.mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`;
    }

    const userData = {
      email: payload.email,
      password: payload.password,
    };

    let response;
    try {
      response = await axios.post(url, {
        ...userData,
        returnSecureToken: true,
      });
    } catch (err) {
      console.log(err, 'Err');
      const errMsg = err.response.data.error.message;
      throw new Error(errMsg) || 'Failed to authenticate';
    }

    const expiresIn = +response.data.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('userId', response.data.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('setUser', {
      token: response.data.idToken,
      userId: response.data.localId,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        userId: userId,
        token: token,
      });
    }
  },

  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },
  async signUp(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
};
