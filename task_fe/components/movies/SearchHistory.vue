<template>
  <div class="text-xs md:absolute md:left-0 md:top-0 md:pt-24 pl-2 z-20">
    <div v-on-clickaway="away">
      <div
        class="text-gray-500 rounded-full bg-gray-200 hover:bg-gray-300 h-8 w-8 flex items-center justify-center cursor-pointer"
        @click="toggleHistory"
      >
        <FontAwesomeIcon class="text-gray-500 text-xl" icon="history" />
      </div>
      <div
        v-if="opened"
        class="absolute z-20 md:relative py-2 px-4 rounded-md mt-2 bg-green-200 md:opacity-75 hover:opacity-100"
      >
        <div v-if="history && history.length > 0" class="space-y-4">
          <div v-for="(h, idx) in history" :key="idx">
            <div
              class="bg-blue-200 hover:bg-blue-300 cursor-pointer py-2 px-4 rounded-md"
              @click="research(h, idx)"
            >
              {{ idx + 1 }} - Search: {{ h.s }}
              <span v-if="h.type"> - Type: {{ h.type }}</span>
              <span v-if="h.y"> - Year: {{ h.y }}</span>
              <span v-if="h.results"> - Results: {{ h.results }}</span>
              <span v-else> - No Results</span>
              <span class="pl-4">
                <FontAwesomeIcon
                  class="text-red-500 cursor-pointer"
                  icon="times"
                  @click.stop="deleteSearch(idx)"
                />
              </span>
            </div>
          </div>
        </div>
        <div v-else>
          No HIstory
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  props: {
    historyId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      history: [],
      opened: false
    }
  },
  mounted () {
    this.loadHistory()
  },
  methods: {
    away () {
      if (this.opened) {
        this.toggleHistory()
      }
    },
    loadHistory () {
      this.history = this.$history.getAll(this.historyId)
    },
    toggleHistory () {
      if (!this.opened) {
        this.loadHistory()
      }
      this.opened = !this.opened
    },
    deleteSearch (idx) {
      this.$history.deleteOne(this.historyId, idx)
      this.loadHistory()
    },
    research (search, idx) {
      this.deleteSearch(idx)
      this.$emit('research', search)
      this.opened = false
    }
  }
}
</script>

<style></style>
