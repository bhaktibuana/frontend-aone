<script setup lang="ts">
defineProps({
  alt: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <a-image
    :alt="alt"
    :src="src"
    :preview="false"
    :height="height || ''"
    :width="width || ''"
  />
</template>
