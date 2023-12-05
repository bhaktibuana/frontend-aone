<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { notification } from "ant-design-vue";
import { AxiosError, AxiosResponse } from "axios";

import { APILogin } from "@/apis/Authentication/Login";

import { aoneLogo } from "@/assets/images";

import WindowSize from "@/components/HOC/WindowSize.vue";
import BaseCard from "@/components/base/Card/Card.vue";
import BaseImage from "@/components/base/Image/Image.vue";
import LoginForm from "@/components/pages/Authentication/Login/LoginForm.vue";
import OtpSection from "@/components/pages/Authentication/Login/otpSeciton.vue";

import { hashPassword } from "@/utils/functions";

import { I200_LoginResponseBody } from "@/types/apis/Authentication/response/I200_LoginResponseBody";
import { I400_LoginResponseBody } from "@/types/apis/Authentication/response/I400_LoginResponseBody";
import { I401_VerifyLoginResponseBody } from "@/types/apis/Authentication/response/I401_VerifyLoginResponseBody";
import { ILoginFormData, IOtpFormData } from "@/types";

const loginStep = ref<number>(0);

const formData = reactive<ILoginFormData>({
  loading: false,
  data: {
    encrypted: true,
  },
} as ILoginFormData);

const verifyData = reactive<I200_LoginResponseBody["data"]>(
  {} as I200_LoginResponseBody["data"]
);

const otpFormData = reactive<IOtpFormData>({
  otp: "",
  loading: false,
  isOtpWrong: false,
  otpLength: 4,
} as IOtpFormData);

const handleLogin = async (): Promise<void> => {
  formData.loading = true;

  try {
    const response = await APILogin.login({
      ...formData.data,
      password: hashPassword(formData.data.password),
    });
    Object.assign(verifyData, response.data?.data);
    resetFormData();
    loginStep.value = 1;
  } catch (error: unknown | AxiosError) {
    const err = error as AxiosError;
    const errResponse = err?.response as AxiosResponse<I400_LoginResponseBody>;
    notification["error"]({
      message: "Error",
      description: `${errResponse.data.message}`,
      placement: "bottom",
    });
  } finally {
    formData.loading = false;
  }
};

const resetFormData = (): void => {
  formData.data.usernameOrEmail = undefined as never as string;
  formData.data.password = undefined as never as string;
};

const handleBackToLogin = (): void => {
  loginStep.value = 0;
  resetFormData();
};

const handleVerifyOtp = async (): Promise<void> => {
  otpFormData.loading = true;

  try {
    await APILogin.verifyLogin({
      otp: otpFormData.otp,
      userId: verifyData.userId,
    });
  } catch (error: unknown | AxiosError) {
    otpFormData.isOtpWrong = true;
    const err = error as AxiosError;
    const errResponse =
      err?.response as AxiosResponse<I401_VerifyLoginResponseBody>;
    notification["error"]({
      message: "Error",
      description: `${errResponse.data.message}`,
      placement: "bottom",
    });
  } finally {
    otpFormData.loading = false;
  }
};

watch(
  () => otpFormData.isOtpWrong,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        otpFormData.isOtpWrong = false;
      }, 1000);
    }
  }
);

watch(
  () => otpFormData.otp,
  (newValue) => {
    if (newValue.length === otpFormData.otpLength) {
      handleVerifyOtp();
    }
  }
);
</script>

<template>
  <window-size v-slot="{ isMobileView }">
    <div class="page-wrapper">
      <base-card>
        <div class="card-content-wrapper">
          <div class="logo-image-wrapper">
            <base-image
              alt="aone"
              :src="aoneLogo"
              :height="isMobileView ? 40 : 58"
              :width="isMobileView ? 132 : 195"
            />
          </div>

          <login-form
            v-if="loginStep === 0"
            :formData="formData.data"
            :loading="formData.loading"
            @on-form-finish-action="handleLogin"
          />

          <otp-section
            v-else-if="loginStep === 1"
            :data="verifyData"
            :form-data="otpFormData"
            @on-otp-verify-action="handleVerifyOtp"
            @on-back-to-login-action="handleBackToLogin"
          />
        </div>
      </base-card>
    </div>
  </window-size>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding-top: $size-96;

  @include breakpoint(md, max) {
    padding: $size-32 $size-16 $size-16 $size-16;
  }
}

.card-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: $size-32;
  width: 600px;
  align-items: center;

  @include breakpoint(md, max) {
    width: calc(100vw - $size-64);
    gap: $size-20;
  }
}

.logo-image-wrapper {
  max-width: $size-195;
  height: auto;
  object-fit: contain;
}
</style>
