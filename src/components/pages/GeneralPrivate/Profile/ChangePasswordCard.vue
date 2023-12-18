<script setup lang="ts">
import { PropType } from "vue";
import { Rule } from "ant-design-vue/es/form";

import BaseCardWithHeader from "@/components/base/Card/CardWithHeader.vue";
import BaseForm from "@/components/base/Form/Form.vue";
import BaseFormInputPassword from "@/components/base/Form/Input/FormInputPassword.vue";
import BaseDivider from "@/components/base/Divider/Divider.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { IChangePassword } from "@/types/apis/Authentication/request/IChangePasswordRequest";


const props = defineProps({
  formData: {
    type: Object as PropType<IChangePassword>,
    default: {} as IChangePassword,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onFormFinishAction"]);

const handleFormFinish = (isError: boolean, data: IChangePassword): void => {
  if (!isError) emit("onFormFinishAction", data);
};

const validatePasswordConfirmation = async (
  _rule: Rule,
  value: string
): Promise<void> => {
  if (value === "" || value === undefined) {
    return Promise.reject("New Password Confirmation is required");
  } else if (value.length < 8) {
    return Promise.reject("New Password Confirmation length at least 8 characters");
  } else if (value !== props.formData.newPassword) {
    return Promise.reject("New Password Confirmation does not match");
  } else {
    return Promise.resolve();
  }
};
</script>

<template>
  <base-card-with-header title="Change Password">
    <div class="card-body-wrapper">
      <base-form
        id="changePasswordForm"
        :form-data="formData"
        @on-form-finish-action="handleFormFinish"
      >
        <base-form-input-password
          name="oldPassword"
          label="Old Password"
          placeholder="Insert Your Old Password"
          v-model:value="formData.oldPassword"
          required
          :rules="[{ min: 8, message: 'Old Password length at least 8 characters' }]"
        />

        <base-form-input-password
          name="newPassword"
          label="New Password"
          placeholder="Insert Your New Password"
          v-model:value="formData.newPassword"
          required
          :rules="[{ min: 8, message: 'New Password length at least 8 characters' }]"
        />

        <base-form-input-password
          name="newPasswordConfirmation"
          label="New Password Confirmation"
          placeholder="Insert New Password Confirmation"
          v-model:value="formData.newPasswordConfirmation"
          required
          :rules="[
        {
          required: true,
          validator: validatePasswordConfirmation,
          trigger: 'change',
        },
      ]"
        />
      </base-form>

      <base-divider />

      <div class="button-wrapper">
        <base-button
          form="changePasswordForm"
          html-type="submit"
          label="Submit"
          :loading="loading"
        />
      </div>
    </div>
  </base-card-with-header>
</template>

<style scoped lang="scss">
.card-body-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-16;
}

.button-wrapper {
  width: 100%;
}
</style>
