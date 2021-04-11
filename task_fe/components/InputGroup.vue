<template>
  <div class="relative border rounded-md flex-grow p-2">
    <label
      class="z-10 absolute text-sm -mt-5 ml-1 px-1 text-blue-500 bg-white"
    >{{ label }}</label>
    <div class="flex gap-2 w-full flex-wrap pt-2 extend-childern">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.extend-childern * {
  @apply w-full;
}
.extend-childern *:focus {
  @apply border-b;
  @apply outline-none;
  @apply border-blue-600;
}
</style>
