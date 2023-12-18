<script setup lang="ts">
import BasePageTitle from "@/components/base/PageTitle/PageTitle.vue";
</script>

<template>
  <div class="page-wrapper">
    <div class="page-title-section">
      <base-page-title title="Payment Methods" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: $size-24;
  .page-title-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
