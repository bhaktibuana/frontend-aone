<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";

import BaseResult from "@/components/base/Result/Result.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { IVerificationData } from "@/types";

const props = defineProps({
  status: {
    type: String as PropType<IVerificationData["status"]>,
    default: "success",
  },
  message: {
    type: String as PropType<IVerificationData["message"]>,
    default: "",
  },
});

const router = useRouter();

const handleClickButton = (): void => {
  if (props.status === "success") {
    router.push({ name: "Login" });
  } else {
    router.push({ name: "LandingPage" });
  }
};
</script>

<template>
  <base-result
    :status="status"
    :title="
      status === 'success' ? 'Verification Success' : 'Verification Failed'
    "
    :description="
      status === 'success' ? 'Now you can login with your account' : message
    "
  />

  <div class="button-wrapper" @click="handleClickButton">
    <base-button :label="status === 'success' ? 'Login' : 'Home'" />
  </div>
</template>

<style scoped lang="scss">
.button-wrapper {
  width: 100%;
}
</style>
