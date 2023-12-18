<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.card-wrapper {
  background-color: $white;
  padding: $size-24;
  border-radius: $size-8;
  width: 100%;

  @include breakpoint(md, max) {
    padding: $size-20 $size-16;
  }
}
</style>
