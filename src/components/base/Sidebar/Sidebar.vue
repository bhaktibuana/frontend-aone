<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { MenuProps } from "ant-design-vue";

import { aoneLogo } from "@/assets/images";

import BaseImage from "@/components/base/Image/Image.vue";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import { TSidebarMenu } from "@/types";

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
  menuList: {
    type: Array as PropType<TSidebarMenu>,
    default: [] as TSidebarMenu,
  },
});

const router = useRouter();
const route = useRoute();

const selectedKeys = ref<string[]>([""]);
const openedKeys = ref<string[]>([""]);

const getSelectedMenu = (): string[] => {
  const currentRoute = route.path;
  return [currentRoute];
};

const getOpenedMenu = (): string[] => {
  const currentRoute = route.path;
  return [`/${currentRoute.split("/")[1]}`];
};

const handleClick: MenuProps["onClick"] = (value): void => {
  router.push({ name: value.item.title as string });
};

onMounted(() => {
  selectedKeys.value = getSelectedMenu();
  openedKeys.value = getOpenedMenu();
});
</script>

<template>
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

    <div class="sidebar-menu-wrapper">
      <a-config-provider
        :theme="{
          fontSize: tokenProperties.defaultFontSize,
          colorText: tokenProperties.defaultTextColor,
          borderRadius: tokenProperties.defaultBorderRadius,
        }"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          :openKeys="openedKeys"
          class="menu-list-wrapper"
          mode="inline"
          :items="menuList"
          @click="handleClick"
        />
      </a-config-provider>
    </div>
  </a-layout-sider>
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

.sidebar-menu-wrapper {
  width: 100%;
  height: auto;
  max-height: calc(100vh - $size-70);
  overflow-y: auto;
  padding: $size-10;
}

.menu-list-wrapper {
  border: none !important;
  position: relative;
  padding-left: 0 !important;
}
</style>
