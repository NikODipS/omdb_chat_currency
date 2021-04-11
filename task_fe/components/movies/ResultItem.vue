<template>
  <div class="border-2 border-blue-500 rounded-lg overflow-hidden pb-4">
    <NuxtLink :to="`/movie/${item.imdbID}`" class="block">
      <div
        class="bg-blue-200 h-64 w-full overflow-hidden opacity-75 hover:opacity-100 transition-all duration-200"
      >
        <Poster :src="item.Poster" :title="item.Title" />
      </div>
      <div class="bg-gray-200 font-bold px-1 py-2">
        {{ item.Title }}
      </div>
    </NuxtLink>
    <div class="mt-auto px-1 flex justify-between w-full text-sm text-gray-500">
      <div>
        Type: <span class="capitalize">{{ item.Type }}</span>
      </div>
      <div>Year: {{ item.Year }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
