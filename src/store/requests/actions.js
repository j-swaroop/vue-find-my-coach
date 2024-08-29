// import { v4 } from 'uuid';
import axios from 'axios';

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await axios.post(
      `https://vue-https-demo-42676-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      newRequest
    );

    // console.log(response);
    if (response.status !== 200) {
      const error = new Error(response.error) || 'Failed to fetch';
      throw error;
    }

    newRequest.id = response.data.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await axios.get(
      `https://vue-https-demo-42676-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    if (response.status !== 200) {
      const error = new Error(response.error) || 'Failed to fetch';
      throw error;
    }

    // console.log(response.data);
    const requests = [];
    for (const key in response.data) {
      const newRequest = {
        id: key,
        coachId: coachId,
        userEmail: response.data[key].userEmail,
        message: response.data[key].message,
      };
      requests.push(newRequest);
    }

    context.commit('setRequests', requests);
  },
};
