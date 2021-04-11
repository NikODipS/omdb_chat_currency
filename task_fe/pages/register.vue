<template>
  <section v-if="!registered" class="py-4 bg-white p-4 border rounded-lg">
    <strong class="font-bold text-xl">Registration Form</strong>
    <RegisterForm @submitting="registerUser" />
    <div class="pt-4 text-sm">
      Already Registered? -
      <NuxtLink to="/login" class="text-blue-500">
        Sign In
      </NuxtLink>
    </div>
  </section>
  <section v-else class="py-4 bg-green-200 p-4 border rounded-lg">
    <div class="text-4xl">
      Your registration has been successfully completed!
      <div class="pt-6">
        <NuxtLink to="/" class="text-base text-blue-400 hosver:text-blue-600">
          Go to Login
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      registered: false
    }
  },
  methods: {
    registerUser ({ email, name, surname }) {
      if (this.$guard.register(email, name, surname)) {
        this.registered = true
      } else {
        alert('It was not possible to complete the registration!')
      }
    }
  }
}
</script>

<style></style>
