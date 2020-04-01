<template>
  <div id="login">
    <div class="card" style="width: 30%;">
      <form class="p-3" @submit.prevent="login">
        <h4>Login Here</h4>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
            required>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
            required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      OR
      <div class="p-2 mb-3">
        <router-link to="/register">Register Here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$vToastify.success({
            title: 'Please Auth',
            body: `${data.msg}`
          })
          setTimeout(() => {
            this.$router.push('/auth')
          }, 2000)
        })
        .catch(_ => {
          this.$vToastify.error({
            title: 'Login Failed',
            body: 'Wrong Email/Password'
          })
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.token) {
      next()
    } else {
      next('/welcome')
    }
  }
}
</script>

<style scoped>
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #181818e5;
}

</style>
