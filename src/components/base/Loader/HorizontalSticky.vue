<script setup lang="ts">
import { colors } from "@/assets/styles/colors";
defineProps({
  height: {
    type: Number,
    default: 120,
  },
});
</script>

<template>
  <svg height="0" width="0">
    <defs>
      <filter
        color-interpolation-filters="sRGB"
        height="200%"
        y="-50%"
        width="200%"
        x="-50%"
        id="goo"
      >
        <feGaussianBlur
          result="blur"
          stdDeviation="8"
          in="SourceGraphic"
        ></feGaussianBlur>
        <feColorMatrix
          result="cm"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
          mode="matrix"
          in="blur"
        ></feColorMatrix>
      </filter>
    </defs>
  </svg>

  <svg
    :height="height.toString()"
    :width="(2 * height).toString()"
    viewBox="0 0 320 180"
  >
    <g filter="url(#goo)">
      <circle
        cy="90"
        cx="160"
        r="24"
        :fill="colors.darkPrimary"
        class="circle"
      ></circle>
      <circle
        cy="90"
        cx="160"
        r="24"
        :fill="colors.primary"
        class="circle right"
      ></circle>
    </g>
  </svg>
</template>

<style scoped lang="scss">
.circle {
  animation: move571 2s linear infinite;
}

.circle.right {
  animation-direction: reverse;
}

@keyframes move571 {
  25% {
    transform: translateX(-$size-32);
  }

  75% {
    transform: translateX(-$size-32);
  }
}
</style>
