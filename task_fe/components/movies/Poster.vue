<template>
  <img :src="imgSrc" :alt="title" class="w-full h-full m-auto object-cover">
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    exists () {
      return this.src !== 'N/A'
    },
    imgSrc () {
      return this.exists
        ? this.src
        : 'http://www.persefone.it/blog/wp-content/themes/photobook/images/blank.png'
    }
  }
}
</script>

<style></style>
