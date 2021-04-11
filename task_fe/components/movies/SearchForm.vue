<template>
  <form action="/search" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <InputGroup label="Search By title" class="md:col-span-2">
        <input v-model="search.s" type="text" placeholder="Search By Title">
      </InputGroup>
      <InputGroup label="Search By type">
        <select v-model="search.type" type="text" placeholder="Search By Title">
          <option v-for="val in types" :key="val.value" :value="val.value">
            {{ val.label }}
          </option>
        </select>
      </InputGroup>
      <InputGroup label="Release Year">
        <input v-model="search.y" type="text" placeholder="Year">
      </InputGroup>

      <div class="md:col-span-4 flex item-center justify-end">
        <button
          class="py-2 px-8 bg-green-400 rounded-md w-full md:w-auto hover:bg-green-600 font-bold hover:text-white transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      search: {
        s: '',
        type: null,
        y: null
      }
    }
  },
  computed: {
    types () {
      return [
        { value: null, label: 'All' },
        { value: 'movie', label: 'Movies' },
        { value: 'series', label: 'Series' },
        { value: 'episode', label: 'Episodes' }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.$emit('search', this.search)
    }
  }
}
</script>

<style></style>
