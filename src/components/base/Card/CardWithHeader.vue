<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="card-wrapper">
    <div class="card-header">
      <slot name="header">
        <h2 class="card-title">{{ title }}</h2>
      </slot>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-wrapper {
  width: 100%;
  height: auto;
  border-radius: $size-8;
  border: $size-1 solid $border-color;
  background: $white;
  margin-bottom: auto;
}

.card-header {
  border-radius: $size-8 $size-8 0 0;
  border-bottom: $size-1 solid $border-color;
  background: $filter-background;
  padding: $size-16 $size-24;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: $size-16;

  h2.card-title {
    margin: 0;
    font-size: $size-16;
    font-weight: 600;
    line-height: $size-24;
  }
}

.card-body {
  border-radius: 0 0 $size-8 $size-8;
  padding: $size-16 $size-24;

  @include breakpoint(md, max) {
    padding: $size-16;
  }
}
</style>
