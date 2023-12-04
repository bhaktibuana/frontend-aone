<script setup lang="ts">
import { reactive } from "vue";
import { notification } from "ant-design-vue";
import { AxiosError, AxiosResponse } from "axios";

import { APILogin } from "@/apis/Authentication/Login";

import { aoneLogo } from "@/assets/images";

import WindowSize from "@/components/HOC/WindowSize.vue";
import BaseCard from "@/components/base/Card/Card.vue";
import BaseImage from "@/components/base/Image/Image.vue";
import LoginForm from "@/components/pages/Authentication/Login/LoginForm.vue";

import { hashPassword } from "@/utils/functions";

import { I400_LoginResponseBody } from "@/types/apis/Authentication/response/I400_LoginResponseBody";
import { IFormData } from "@/types";

const formData = reactive<IFormData>({
  loading: false,
  data: {
    encrypted: true,
  },
} as IFormData);

const handleLogin = async (): Promise<void> => {
  formData.loading = true;

  try {
    await APILogin.login({
      ...formData.data,
      password: hashPassword(formData.data.password),
    });
    resetFormData();
    notification["success"]({
      message: "Success",
      description: "Login Success",
      placement: "bottom",
    });
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
            :formData="formData.data"
            :loading="formData.loading"
            @on-form-finish-action="handleLogin"
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
