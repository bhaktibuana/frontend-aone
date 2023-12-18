<script setup lang="ts">
import { aoneLogo } from "@/assets/images";

import BaseImage from "@/components/base/Image/Image.vue";

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: 240,
  },
  collapsedWidth: {
    type: Number,
    default: 80,
  },
});
</script>

<template>
  <a-config-provider
    :theme="{
      // token: {
      //   colorPrimaryHover: tokenProperties.colorPrimary,
      //   borderRadius: tokenProperties.defaultBorderRadius,
      //   fontSize: fontSize,
      //   fontFamily: tokenProperties.defaultFontFamily,
      //   controlHeight: tokenProperties.defaultControlHeight,
      // },
    }"
  >
    <a-layout-sider
      class="custom-sider"
      :collapsed="collapsed"
      :trigger="null"
      collapsible
      theme="light"
      :width="width"
      :collapsedWidth="collapsedWidth"
    >
      <div class="sidebar-header-wrapper">
        <base-image alt="aone" :src="aoneLogo" :height="44" :width="130" />
      </div>
    </a-layout-sider>
  </a-config-provider>
</template>

<style scoped lang="scss">
.custom-sider {
  box-shadow: 0 $size-1 $size-4 $default-shadow;
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 102;
  background-color: $white;
}

.sidebar-header-wrapper {
  width: 100%;
  height: $size-70;
  background-color: transparent;
  padding: $size-10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
