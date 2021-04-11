<template>
  <section class="py-4 bg-white p-4 border rounded-lg w-2/5 mx-auto">
    <strong class="block font-bold text-xl pt-3 pb-6 text-center">Login</strong>
    <div class="pt-4">
      <form action="/" @submit.prevent="login">
        <div class="flex flex-col gap-y-6">
          <div
            v-if="error"
            class="py-2 text-center border-2 bg-red-100 border-red-300 font-semibold rounded-md"
          >
            Email Not Found
          </div>
          <InputGroup label="Email" class="col-span-2">
            <input
              v-model="email"
              type="text"
              name="email"
              placeholder="email"
            >
          </InputGroup>
          <button
            class="py-2 px-8 bg-blue-400 rounded-md w-full md:w-auto hover:bg-blue-600 font-bold hover:text-white transition-colors duration-200 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
    <div class="pt-16 text-sm text-center">
      <div>Not Registered Yet?</div>
      <NuxtLink to="/register" class="text-blue-500">
        Sign Up
      </NuxtLink>
    </div>

    <div v-if="usdValue" class="flex w-full justify-center pt-6 text-base">
      <div class="flex items-center gap-2 mx-auto border p-2">
        <FontAwesomeIcon
          icon="chart-line"
          class="text-2xl"
          :class="{ 'text-green-500': isHigher, 'text-red-500': !isHigher }"
        />
        <div><strong class="font-bold">EUR</strong> 1</div>
        <FontAwesomeIcon
          icon="long-arrow-alt-right"
          :class="{ 'text-green-500': isHigher, 'text-red-500': !isHigher }"
        />
        <div>{{ usdValue }} <strong class="font-bold">USD</strong></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch () {
    this.financeResult = await this.$finance.makeRequest()
  },
  data () {
    return {
      financeResult: null,
      error: false,
      email: ''
    }
  },
  computed: {
    usdValue () {
      return (
        this.financeResult &&
        parseFloat(this.financeResult['5. Exchange Rate']).toFixed(3)
      )
    },
    isHigher () {
      return this.usdValue > 1
    }
  },
  methods: {
    login () {
      if (!this.$guard.login(this.email)) {
        this.error = true
      }
    }
  }
}
</script>

<style></style>
