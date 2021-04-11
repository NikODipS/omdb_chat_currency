<template>
  <div v-if="movie">
    <div class="flex gap-4 pt-3">
      <div class="w-72 flex-shrink-0">
        <img :src="movie.Poster" :alt="movie.Title">
      </div>
      <div class="flex-grow space-y-2">
        <div
          class="font-bold text-4xl flex justify-between w-full items-center text-gren-700 leading-loose"
        >
          <div class="flex-grow">
            {{ movie.Title }}
          </div>
          <div class="flex-shrink-0">
            <div class="text-xs">
              <FontAwesomeIcon class="text-gray-500" icon="calendar" />
              {{ movie.Released }}
            </div>
            <div class="text-xs">
              <FontAwesomeIcon class="text-gray-500" icon="clock" />
              {{ movie.Runtime }}
            </div>
          </div>
        </div>
        <div class="flex gap-6 items-center">
          <div><strong class="font-bold">Genre:</strong> {{ movie.Genre }}</div>
          <div v-if="movie.Director">
            <strong class="font-bold">Directed By:</strong> {{ movie.Director }}
          </div>
        </div>
        <div v-if="movie.Director">
          <strong class="font-bold">Cast:</strong> {{ movie.Actors }}
        </div>
        <div class="px-2 py-4 bg-gray-100 text-gray-600 text-sm italic">
          <div>{{ movie.Plot }}</div>
        </div>
        <div>
          <strong class="font-bold">Awards: </strong> {{ movie.Awards }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  fetch () {
    this.$omdbApi
      .byImdbId(this.$route.params.id)
      .then(movie => (this.movie = movie))
  },
  data () {
    return {
      movie: null
    }
  }
}
</script>

<style></style>
