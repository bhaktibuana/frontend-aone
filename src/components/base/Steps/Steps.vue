<script setup lang="ts">
import { PropType, computed } from "vue";

import { colors } from "@/assets/styles/colors";

import WindowSize from "@/components/HOC/WindowSize.vue";

import { IStepsItem } from "@/types";

import { tokenProperties } from "@/utils/constants/tokenProperties";

const props = defineProps({
  items: {
    type: Array as PropType<IStepsItem[]>,
    default: [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update-selectedIndex"]);

const isStepClicked = computed<number>({
  get() {
    return props.selectedIndex;
  },
  set(value: number) {
    emit("update-selectedIndex", value);
  },
});
</script>

<template>
  <div class="wrapper">
    <window-size v-slot="{ isMobileView }">
      <a-config-provider
        :theme="{
          token: {
            fontSize: isMobileView
              ? tokenProperties.fontSize12
              : tokenProperties.fontSize14,
            dotSize: 8,
            dotCurrentSize: 10,
            fontFamily: tokenProperties.defaultFontFamily,
            navArrowColor: colors.stepsDivider,
            colorPrimary: tokenProperties.colorPrimary,
          },
        }"
      >
        <a-steps progressDot :current="selectedIndex" :responsive="false">
          <a-step
            v-for="(step, index) in items"
            :key="index"
            :title="step.title"
            :description="step.description"
            @click="() => (isStepClicked = index)"
          />
        </a-steps>
      </a-config-provider>
    </window-size>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
