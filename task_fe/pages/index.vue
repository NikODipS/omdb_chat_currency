<template>
  <div class="space-y-4">
    <h1 class="text-2xl text-center font-bold leading-10">
      Start using OMDb API right away
    </h1>
    <div class="font-semibold">
      <span class="text-2xl">Hello </span> {{ user.name }} {{ user.surname }} !
      <span class="text-xs text-gray-600">({{ user.email }})</span>
    </div>
    <section class="py-4 bg-white p-4 border rounded-lg">
      <SearchHistory :history-id="userUuid" @research="searchOnOMDb" />
      <SearchForm @search="searchOnOMDb" />
    </section>
    <section
      v-if="results != null"
      id="results"
      aclass="py-4 bg-white p-4 border-2 border-blue-500 rounded-lg"
    >
      <ResultList :results="results" @goto-page="gotoPage" />
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      results: null
    }
  },
  computed: {
    user () {
      return this.$guard.getUser()
    },
    userUuid () {
      return this.$guard.getUser().uuid
    }
  },
  methods: {
    gotoPage (page) {
      this.searchOnOMDb({ ...this.results.query, page })
    },
    async searchOnOMDb (search) {
      this.results = await this.$omdbApi
        .search(search.s, search.type, search.y, search.page)
        .then((data) => {
          if (data.query.page === null) {
            const obj = {
              ...data.query,
              results: data.totalResults
            }
            this.$history.addSearch(this.userUuid, obj)
          }
          return data
        })
    }
  }
}
</script>

<style></style>
