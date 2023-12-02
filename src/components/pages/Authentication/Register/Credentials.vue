<script setup lang="ts">
import { PropType } from "vue";

import BaseForm from "@/components/base/Form/Form.vue";
import BaseFormInputPassword from "@/components/base/Form/Input/FormInputPassword.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { ICredentialsFormData } from "@/types";
import { Rule } from "ant-design-vue/es/form";

const props = defineProps({
  formData: {
    types: Object as PropType<ICredentialsFormData>,
    default: {} as ICredentialsFormData,
  },
});

const emit = defineEmits(["onFinishCredentials"]);

const handleFinishForm = (
  isError: boolean,
  data: ICredentialsFormData
): void => {
  if (!isError) emit("onFinishCredentials", data);
};

const validatePasswordConfirmation = async (
  _rule: Rule,
  value: string
): Promise<void> => {
  if (value === "" || value === undefined) {
    return Promise.reject("Password Confirmation is required");
  } else if (value.length < 8) {
    return Promise.reject("Password Confirmation length at least 8 characters");
  } else if (value !== props.formData.password) {
    return Promise.reject("Password Confirmation does not match");
  } else {
    return Promise.resolve();
  }
};
</script>

<template>
  <base-form
    id="registerCredentialsForm"
    :form-data="formData"
    @on-form-finish-action="handleFinishForm"
  >
    <base-form-input-password
      label="Password"
      name="password"
      placeholder="Insert Password"
      v-model:value="formData.password"
      required
      :rules="[{ min: 8, message: 'Password length at least 8 characters' }]"
    />

    <base-form-input-password
      label="Password Confirmation"
      name="confirmPassword"
      placeholder="Confirm Your Password"
      v-model:value="formData.confirmPassword"
      :rules="[
        {
          required: true,
          validator: validatePasswordConfirmation,
          trigger: 'change',
        },
      ]"
    />

    <div class="button-wrapper">
      <base-button
        form="registerCredentialsForm"
        htmlType="submit"
        label="Register"
      />
    </div>
  </base-form>
</template>

<style scoped lang="scss"></style>
