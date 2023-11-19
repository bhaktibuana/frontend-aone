<script setup lang="ts">
import { PropType } from "vue";

import BaseSteps from "@/components/base/Steps/Steps.vue";

import { IStepsItem } from "@/types";

defineProps({
  currentStep: {
    type: Number,
    default: 0,
  },
  stepList: {
    type: Array as PropType<IStepsItem[]>,
    default: [],
  },
});

const emit = defineEmits(["update-selectedIndex"]);

const hanldeUpdateCurrentStep = (index: number): void => {
  emit("update-selectedIndex", index);
};
</script>

<template>
  <base-steps
    :items="stepList"
    :selectedIndex="currentStep"
    @update-selectedIndex="hanldeUpdateCurrentStep"
  />
</template>
