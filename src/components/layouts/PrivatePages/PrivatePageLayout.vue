<script setup lang="ts">
import { ref, watch } from "vue";

import WindowSize from "@/components/HOC/WindowSize.vue";
import BaseSidebar from "@/components/base/Sidebar/Sidebar.vue";
import BaseNavbar from "@/components/base/Navbar/Navbar.vue";

import { IScreenSize } from "@/types";

const collapsed = ref<boolean>(false);
const mobileViewState = ref<boolean>(false);
const screenWidth = ref<number>(0);

const handleMobileViewChange = (value: boolean): void => {
  mobileViewState.value = value;
};

const handleCollapse = (value: boolean): void => {
  collapsed.value = value;
};

const handleScreenSizeChange = (value: IScreenSize): void => {
  screenWidth.value = value.width;
};

watch(
  mobileViewState,
  (newValue) => {
    if (newValue) {
      collapsed.value = true;
    } else {
      collapsed.value = false;
    }
  },
  { immediate: true }
);

watch(
  collapsed,
  (newValue) => {
    if (!newValue && mobileViewState.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  },
  { immediate: true }
);
</script>

<template>
  <window-size
    v-slot="{ isMobileView }"
    @onMobileViewChange="handleMobileViewChange"
    @onScreenSizeChange="handleScreenSizeChange"
  >
    <div class="private-page-layout-wrapper">
      <a-layout>
        <base-sidebar
          :collapsed="collapsed"
          :width="isMobileView ? (screenWidth <= 340 ? '100%' : 340) : 240"
          :collapsedWidth="isMobileView ? 0 : 80"
        />
        <!-- v-if="isMobileView && !collapsed" -->
        <div
          :class="`backdrop-wrapper ${isMobileView && !collapsed && 'show'}`"
          @click="() => handleCollapse(true)"
        ></div>

        <div
          :class="`page-content-wrapper ${
            !isMobileView && collapsed && 'collapse'
          }`"
        >
          <base-navbar
            :collapsed="collapsed"
            @on-collapse-action="handleCollapse"
          />

          <div class="content-wrapper">
            <slot></slot>
          </div>
        </div>
      </a-layout>
    </div>
  </window-size>
</template>

<style scoped lang="scss">
.private-page-layout-wrapper {
  min-height: 100vh;
  max-width: 100vw;
  height: auto;
  width: 100%;
  display: flex;
}

.backdrop-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: $default-backdrop;
  z-index: 101;
  display: none;

  &.show {
    display: inherit;
    animation: backdropOpacity 0.4s forwards;

    @keyframes backdropOpacity {
      0% {
        opacity: 0%;
      }
      100% {
        opacity: 100%;
      }
    }
  }
}

.page-content-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-left: $size-240;
  transition: 0.2s all ease;

  @include breakpoint(md, max) {
    margin-left: 0;
  }

  &.collapse {
    margin-left: $size-80;
  }
}

.content-wrapper {
  box-sizing: border-box;
  padding: $size-90 $size-20 $size-20 $size-20;

  @include breakpoint(md, max) {
    padding: $size-86 $size-16 $size-16 $size-16;
  }
}
</style>
