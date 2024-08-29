<template>
  <div class="center">
    <base-dialog
      :show="!!error"
      title="An error occured"
      @close="handleAuthError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card class="width">
      <h2>{{ switchTitleCaption }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email"> E-mail </label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password"> Password </label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be six characters long).
        </p>
        <base-button> {{ switchButtonCaption }} </base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      error: null,
      isLoading: false,
    };
  },
  computed: {
    switchTitleCaption() {
      if (this.mode === 'login') {
        return 'Welcome back Login now!';
      } else {
        return 'Welcome back Signup now!';
      }
    },
    switchButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeCaption() {
      if (this.mode === 'login') {
        return 'Signup instead ';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    handleAuthError() {
      this.error = null;
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('signUp', {
            email: this.email,
            password: this.password,
          });
        }
        const redirectUrl = this.$route.query.redirect || 'coaches';
        // console.log(redirectUrl);
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err || 'Failed to aunthenticate';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}
.center {
  margin: auto;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.width {
  width: 100%;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
