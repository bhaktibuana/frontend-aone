<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { AxiosError, AxiosResponse } from "axios";

import { APIVerifyEmail } from "@/apis/Authentication/EmailVerification";

import { aoneLogo } from "@/assets/images";

import WindowSize from "@/components/HOC/WindowSize.vue";
import BaseCard from "@/components/base/Card/Card.vue";
import BaseImage from "@/components/base/Image/Image.vue";
import Verifying from "@/components/pages/Authentication/VerifyAccount/Verifying.vue";
import VerificationResult from "@/components/pages/Authentication/VerifyAccount/VerificationResult.vue";

import { I401_VerifyEmailResponseBody } from "@/types/apis/Authentication/response/I401_VerifyEmailResponseBody";
import { IVerificationData } from "@/types";

const route = useRoute();
const searchParams = route.query;

const verificationData = reactive<IVerificationData>({
  isVerifying: true,
} as IVerificationData);

const verifyEmail = async (): Promise<void> => {
  verificationData.isVerifying = true;
  try {
    await APIVerifyEmail.verifyEmail({ token: searchParams.token as string });
    verificationData.status = "success";
  } catch (error: unknown | AxiosError) {
    const err = error as AxiosError;
    const errResponse =
      err?.response as AxiosResponse<I401_VerifyEmailResponseBody>;
    verificationData.status = "error";
    verificationData.message = errResponse.data.message;
  } finally {
    verificationData.isVerifying = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    verifyEmail();
  }, 3000);
});
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

          <verifying v-if="verificationData.isVerifying" />
          <verification-result
            v-else
            :status="verificationData.status"
            :message="verificationData.message"
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
</style>
