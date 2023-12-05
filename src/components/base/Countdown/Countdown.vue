<script setup lang="ts">
import { colors } from "@/assets/styles/colors";

import { tokenProperties } from "@/utils/constants/tokenProperties";

defineProps({
  deadline: {
    type: [String, Number],
    default: 0,
  },
  format: {
    type: String,
    default: "HH:mm:ss",
  },
  fontSize: {
    type: Number,
    default: tokenProperties.defaultFontSize,
  },
});

const emit = defineEmits(["onFinishCountdown"]);

const handleFinish = (): void => {
  emit("onFinishCountdown");
};
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        fontSize: fontSize,
        fontFamily: tokenProperties.defaultFontFamily,
        colorText: colors.textDescription,
      },
    }"
  >
    <a-statistic-countdown
      :value="deadline"
      :format="format"
      @finish="handleFinish"
    />
  </a-config-provider>
</template>
