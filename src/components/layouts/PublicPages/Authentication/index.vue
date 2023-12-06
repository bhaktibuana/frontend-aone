<script setup lang="ts">
import WindowSize from "@/components/HOC/WindowSize.vue";
</script>

<template>
  <window-size>
    <a-layout class="authentication-layout-wrapper">
      <slot></slot>
    </a-layout>
  </window-size>
</template>

<style lang="scss" scoped>
.authentication-layout-wrapper {
  min-height: 100vh;
  max-width: 100vw;
  height: auto;
  width: 100%;
}
</style>
