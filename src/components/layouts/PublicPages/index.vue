<script setup lang="ts">
import FooterComponent from "@/components/layouts/PublicPages/Footer.vue";
</script>

<template>
  <a-layout class="layout-wrapper">
    <a-layout-content class="content-wrapper">
      <slot></slot>
      <footer-component />
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh;
  width: 100vw;

  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $size-40 $size-80;
  }
}
</style>
