<script setup lang="ts">
import BaseImage from "@/components/base/Image/Image.vue";
import WindowSize from "@/components/HOC/WindowSize.vue";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <window-size v-slot="{ isMobileView }">
    <div class="wrapper">
      <base-image
        :src="icon"
        :height="isMobileView ? 100 : 160"
        :width="isMobileView ? 114 : 182"
      />
      <div class="description-wrapper">
        <span class="title">{{ title }}</span>
        <span class="description">{{ description }}</span>
      </div>
    </div>
  </window-size>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: $size-20;
  align-items: center;
  text-align: center;
  padding: $size-20 $size-16;

  .description-wrapper {
    display: flex;
    flex-direction: column;
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
}
</style>
