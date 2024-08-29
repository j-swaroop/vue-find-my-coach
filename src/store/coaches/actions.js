// import { v4 } from 'uuid';
import axios from 'axios';

export default {
  async registerCoach(context, coach) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: coach.first,
      lastName: coach.last,
      description: coach.desc,
      hourlyRate: coach.rate,
      areas: coach.areas,
    };

    const token = context.rootGetters.token;

    const response = await axios.put(
      `https://vue-https-demo-42676-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      coachData
    );
    console.log(response);

    if (response.status !== 200) {
      const error = new Error(response.error) || 'Something went wrong';
      throw error;
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await axios.get(
      `https://vue-https-demo-42676-default-rtdb.firebaseio.com/coaches.json`
    );

    if (response.status !== 200) {
      const error = new Error(response.error) || 'Something went wrong';
      throw error;
    }

    // console.log(response);
    const coaches = [];
    for (const key in response.data) {
      const coach = {
        id: key,
        firstName: response.data[key].firstName,
        lastName: response.data[key].lastName,
        description: response.data[key].description,
        hourlyRate: response.data[key].hourlyRate,
        areas: response.data[key].areas,
      };
      coaches.push(coach);
    }
    // console.log(coaches);
    // console.log(context.commit);
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
