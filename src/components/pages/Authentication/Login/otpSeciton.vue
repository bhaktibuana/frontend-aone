<script setup lang="ts">
import { PropType, ref } from "vue";
import BaseOtpInput from "@/components/base/OtpInput/OtpInput.vue";
import BaseCountdown from "@/components/base/Countdown/Countdown.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { hideEmail } from "@/utils/functions";

import { I200_LoginResponseBody } from "@/types/apis/Authentication/response/I200_LoginResponseBody";
import { IOtpFormData } from "@/types";

defineProps({
  data: {
    type: Object as PropType<I200_LoginResponseBody["data"]>,
    default: {} as I200_LoginResponseBody["data"],
  },
  formData: {
    type: Object as PropType<IOtpFormData>,
    default: {
      otpLength: 4,
    } as IOtpFormData,
  },
});

const emit = defineEmits(["onOtpVerifyAction", "onBackToLoginAction"]);

const isOnCountdown = ref<boolean>(true);

const handleFinishCountdown = (): void => {
  isOnCountdown.value = false;
};

const handleVerify = (): void => {
  emit("onOtpVerifyAction");
};

const handleBackLogin = (): void => {
  emit("onBackToLoginAction");
};
</script>

<template>
  <div class="otp-section-wrapper">
    <div class="description-wrapper">
      <span class="description"
        >We have sent verification code to {{ hideEmail(data.email) }} <br />
        Enter the code bellow to verify your login</span
      >
    </div>

    <div class="otp-input-wrapper">
      <base-otp-input
        :otpLength="formData.otpLength"
        v-model:value="formData.otp"
        :isOtpWrong="formData.isOtpWrong"
        :disabled="formData.isOtpWrong || formData.loading"
      />

      <base-countdown
        :fontSize="12"
        format="mm:ss"
        :deadline="data.exp * 1000"
        @onFinishCountdown="handleFinishCountdown"
      />
    </div>

    <div class="button-wrapper" v-if="isOnCountdown" @click="handleVerify">
      <base-button label="Verify" :loading="formData.loading" />
    </div>

    <div class="action-wrapper" v-else @click="handleBackLogin">
      <span>Don't receive the code?</span>
      <div class="button-wrapper">
        <base-button label="Back To Login" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.otp-section-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-22;
}

.description-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-8;

  .description {
    font-size: $size-14;
    line-height: $size-24;
    text-align: center;

    @include breakpoint(md, max) {
      font-size: $size-14;
      line-height: $size-22;
    }
  }
}

.otp-input-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-10;
}

.action-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-10;
}

.button-wrapper {
  width: 100%;
}
</style>
