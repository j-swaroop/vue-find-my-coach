export default {
  requests(state, _, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    // console.log();
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(state, _, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    const requests = state.requests.filter((req) => req.coachId === coachId);
    return requests && requests.length > 0;
  },
};
