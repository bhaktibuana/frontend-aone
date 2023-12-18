<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <span class="page-title">{{ title }}</span>
</template>

<style scoped lang="scss">
.page-title {
  font-size: $size-30;
  font-weight: 600;
  line-height: $size-38;
}
</style>
