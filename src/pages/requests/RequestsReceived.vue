<template>
  <div>
    <base-dialog :show="!!error" @close="closeDialog" title="Failed">
      <p>Something went wrong</p>
    </base-dialog>
    <section>
      <base-card>
        <header><h2>Requests Received</h2></header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-if="hasRequests">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      //   console.log(this.$store.getters['requests/requests']);
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async fetchAllRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Failed to fetch';
      }
      this.isLoading = false;
    },
    closeDialog() {
      this.error = null;
    },
  },
  created() {
    this.fetchAllRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
