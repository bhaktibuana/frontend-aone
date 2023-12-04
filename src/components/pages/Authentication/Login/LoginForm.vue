<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";

import BaseForm from "@/components/base/Form/Form.vue";
import BaseFormInput from "@/components/base/Form/Input/FormInput.vue";
import BaseFormInputPassword from "@/components/base/Form/Input/FormInputPassword.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { IFormData } from "@/types";

defineProps({
  formData: {
    type: Object as PropType<IFormData["data"]>,
    default: {} as IFormData["data"],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const emit = defineEmits(["onFormFinishAction"]);

const handleFormFinish = (isError: boolean, data: IFormData["data"]): void => {
  if (!isError) emit("onFormFinishAction", data);
};

const handleForgotPassword = (): void => {
  router.push({ name: "ForgotPassword" });
};

const handleRegister = (): void => {
  router.push({ name: "Register" });
};
</script>

<template>
  <div class="login-form-wrapper">
    <base-form
      id="loginForm"
      :form-data="formData"
      @on-form-finish-action="handleFormFinish"
    >
      <base-form-input
        label="Username or Email"
        name="usernameOrEmail"
        placeholder="Insert Your Username or Email"
        v-model:value="formData.usernameOrEmail"
        :disabled="loading"
        required
      />

      <base-form-input-password
        label="Password"
        name="password"
        placeholder="Insert Your Password"
        v-model:value="formData.password"
        :disabled="loading"
        required
        :rules="[{ min: 8, message: 'Password length at least 8 characters' }]"
      />

      <div class="forgot-password-wrapper">
        <span class="forgot-password-text" @click="handleForgotPassword">
          Forgot Password
        </span>
      </div>

      <div class="button-wrapper">
        <base-button
          form="loginForm"
          htmlType="submit"
          label="Login"
          :loading="loading"
        />
      </div>
    </base-form>

    <span class="register-info-text">
      Don't have account yet?&nbsp;
      <span class="register-action" @click="handleRegister">
        Register Here
      </span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.login-form-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-16;
}

.forgot-password-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  span.forgot-password-text {
    font-weight: 500;
    font-size: $size-14;
    color: $primary;
    cursor: pointer;
  }
}

.button-wrapper {
  width: 100%;
}

.register-info-text {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: $size-16;
  line-height: $size-24;

  @include breakpoint(md, max) {
    font-size: $size-12;
    line-height: $size-20;
  }

  .register-action {
    font-weight: 600;
    color: $primary;
    cursor: pointer;
  }
}
</style>
