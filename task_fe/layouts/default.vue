<template>
  <div class="bg-blue-100 min-h-screen">
    <div class="z-40 fixed w-full h-16 bg-green-400 shadow-md">
      <div
        class="max-w-screen-xl flex h-full w-full items-center mx-auto gap-2"
      >
        <NuxtLink
          to="/"
          class="bg-green-500 h-full flex items-center px-4 hover:bg-green-600"
        >
          Home page
        </NuxtLink>
        <button
          v-if="isAuthenticated"
          class="ml-auto bg-red-500 h-8 rounded-md flex items-center px-4 hover:bg-red-600 text-white"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="p-40 md:pt-20 px-8 max-w-screen-xl mx-auto">
      <Chat />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isAuthenticated: this.$guard.isAuthenticated()
    }
  },
  mounted () {
    this.$guard.onAuthentication(this.setAuth)
  },
  methods: {
    setAuth (auth) {
      this.isAuthenticated = auth
    },
    logout () {
      if (this.$guard.isAuthenticated()) {
        this.$history.deleteAll(this.$guard.getUser().uuid)
        this.$guard.logout()
      }
    }
  }
}
</script>

<style scoped></style>
