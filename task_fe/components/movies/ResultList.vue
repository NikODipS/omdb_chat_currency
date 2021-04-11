<template>
  <div class="pb-6">
    <div v-if="hasResults">
      <strong class="font-bold">Results</strong>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ResultItem
          v-for="item in results.Search"
          :key="item.imdbID"
          :item="item"
        />
      </div>
      <div class="flex justify-center gap-4 py-4">
        <button
          v-for="page in pages"
          :key="page"
          class="rounded-full h-8 w-8 bg-gray-300 hover:bg-gray-400 flex-wrap focus:outline-none"
          :class="{ 'bg-gray-500': currentPage === page }"
          @click="gotoPage(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
    <div v-else>
      No Result found!!
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentPage () {
      return this.results.query.page || 1
    },
    hasResults () {
      return (
        this.results && this.results.Search && this.results.Search.length > 0
      )
    },
    pages () {
      if (this.hasResults) {
        return Array(Math.ceil(this.results.totalResults / 10))
          .fill(0)
          .map((p, idx) => idx + 1)
      }
      return []
    }
  },
  methods: {
    gotoPage (page) {
      this.$emit('goto-page', page)
    }
  }
}
</script>

<style></style>
