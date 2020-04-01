<template>
  <div class="container">
    <h4>You have successfully Login, Thank you ^^</h4>
    <button @click.prevent="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.token) {
      next('/auth')
    } else {
      next()
    }
  }
}
</script>

<style>

</style>
