<template>
  <div class="container">
    <p> Please enter the code that we send to your email</p>
    <form @submit.prevent="auth">
      <label for="email">Re-enter your email</label> <br>
      <input type="text" name="authKey" v-model="email" placeholder="Your email" required> <br>
      <label for="authKey">Authentification Key</label> <br>
      <input type="text" name="authKey" v-model="input" placeholder="Code on Your email" required><br> <br>
      <button type="submit">Submit Code</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      email: '',
      input: ''
    }
  },
  methods: {
    auth () {
      this.$store.dispatch('auth', {
        email: this.email,
        authKey: this.input
      })
        .then(({ data }) => {
          localStorage.token = data.token
          this.input = ''
          this.email = ''
          this.$router.push('/welcome')
        })
        .catch(_ => {
          setTimeout(() => {
            this.$vToastify.error({
              title: 'Login Failed',
              body: 'Wrong Code, Please enter the code from email'
            })
          }, 2000)
        })
    }
  }
}
</script>

<style>

</style>
