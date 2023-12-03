<script setup lang="ts">
import BaseHorizontalSticky from "@/components/base/Loader/HorizontalSticky.vue";
</script>

<template>
  <base-horizontal-sticky :height="100" />

  <div class="description-wrapper">
    <span class="title">Verifying Your Account</span>
    <span class="description"
      >Please wait a moment. We are verifying your account</span
    >
  </div>
</template>

<style scoped lang="scss">
.description-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-8;

  .title {
    font-size: $size-20;
    font-weight: 600;
    line-height: $size-28;

    @include breakpoint(md, max) {
      font-size: $size-16;
      line-height: $size-24;
    }
  }

  .description {
    color: $text-description;
    font-size: $size-16;
    line-height: $size-24;

    @include breakpoint(md, max) {
      font-size: $size-14;
      line-height: $size-22;
    }
  }
}
</style>
