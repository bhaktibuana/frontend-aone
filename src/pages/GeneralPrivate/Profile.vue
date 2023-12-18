<script setup lang="ts">
import { reactive, ref } from "vue";
import { notification } from "ant-design-vue";
import { AxiosError, AxiosResponse } from "axios";

import { APIProfile } from "@/apis/Authentication/Profile";

import BasePageTitle from "@/components/base/PageTitle/PageTitle.vue";
import UserInfoCard from "@/components/pages/GeneralPrivate/Profile/UserInfoCard.vue";
import ChangePasswordCard from "@/components/pages/GeneralPrivate/Profile/ChangePasswordCard.vue";

import { getUserData, hashPassword } from "@/utils/functions";
import { getCookie, setCookie } from "@/utils/functions/cookie";

import { IGetUserData, IUserInfoFormData, IPasswordFormData } from "@/types";
import { I400_UpdateUserInfoResponseBody } from "@/types/apis/Authentication/response/I400_UpdateUserInfoResponseBody";
import { I400_ChangePasswordResponseBody } from "@/types/apis/Authentication/response/I400_ChangePasswordResponseBody";

const userInfoFormLoading = ref<boolean>(false);

const userData = reactive<IGetUserData>(
  getUserData(getCookie("accessToken") as string)
);

const passwordFormData = reactive<IPasswordFormData>({
  loading: false,
  data: {
    encrypted: true,
  } as IPasswordFormData["data"],
});

const updateUserInfo = async (data: IUserInfoFormData): Promise<void> => {
  userInfoFormLoading.value = true;

  try {
    await APIProfile.updateUserInfo(data);
    const response = await APIProfile.myToken();
    setCookie("accessToken", response.data?.data?.accessToken, 7, "");
    notification["success"]({
      message: "Success",
      description: "Update user info success",
      placement: "bottom",
    });
  } catch (error: unknown | AxiosError) {
    const err = error as AxiosError;
    const errResponse =
      err?.response as AxiosResponse<I400_UpdateUserInfoResponseBody>;
    notification["error"]({
      message: "Error",
      description: `${errResponse.data.message}`,
      placement: "bottom",
    });
  } finally {
    userInfoFormLoading.value = false;
    Object.assign(userData, getUserData(getCookie("accessToken") as string));
  }
};

const handleResetPasswordForm = (): void => {
  passwordFormData.data.oldPassword = undefined as never as string;
  passwordFormData.data.newPassword = undefined as never as string;
  passwordFormData.data.newPasswordConfirmation = undefined as never as string;
};

const handleChangePassword = async (): Promise<void> => {
  passwordFormData.loading = true;

  const payload = {
    oldPassword: hashPassword(passwordFormData.data.oldPassword),
    newPassword: hashPassword(passwordFormData.data.newPassword),
    newPasswordConfirmation: hashPassword(
      passwordFormData.data.newPasswordConfirmation
    ),
    encrypted: true,
  };

  try {
    await APIProfile.changePassword(payload);
    handleResetPasswordForm();
    notification["success"]({
      message: "Success",
      description: "Change password success",
      placement: "bottom",
    });
  } catch (error: unknown | AxiosError) {
    const err = error as AxiosError;
    const errResponse =
      err?.response as AxiosResponse<I400_ChangePasswordResponseBody>;
    notification["error"]({
      message: "Error",
      description: `${errResponse.data.message}`,
      placement: "bottom",
    });
  } finally {
    passwordFormData.loading = false;
  }
};
</script>

<template>
  <div class="page-wrapper">
    <div class="page-title-section">
      <base-page-title title="Profile" />
    </div>

    <div class="page-content-wrapper">
      <user-info-card
        :user-data="userData"
        :loading="userInfoFormLoading"
        @on-form-finish-action="updateUserInfo"
      />

      <change-password-card
        :form-data="passwordFormData.data"
        :loading="passwordFormData.loading"
        @on-form-finish-action="handleChangePassword"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: $size-24;
  .page-title-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.page-content-wrapper {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $size-24;

  @include breakpoint(md, max) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: $size-16;
  }
}
</style>
