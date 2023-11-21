<script setup lang="ts">
import { PropType, reactive, ref, watch } from "vue";
import { Rule } from "ant-design-vue/es/form";

import BaseButton from "@/components/base/Button/Button.vue";
import BaseForm from "@/components/base/Form/Form.vue";
import BaseFormInput from "@/components/base/Form/Input/FormInput.vue";

import { IRegisterAccountFormData, TValidateStatus } from "@/types";
import { computed } from "@vue/reactivity";

const props = defineProps({
  formData: {
    type: Object as PropType<IRegisterAccountFormData>,
    default: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },
  },
  usernameState: {
    type: [String, undefined] as PropType<TValidateStatus>,
    default: undefined,
  },
  emailState: {
    type: [String, undefined] as PropType<TValidateStatus>,
    default: undefined,
  },
});

const emit = defineEmits(["update-formData"]);

const emailValidateStatus = ref<boolean>(false);

const internalFormData = reactive<IRegisterAccountFormData>(props.formData);

const isFormDataChanged = computed<IRegisterAccountFormData>({
  get() {
    return props.formData;
  },
  set(value) {
    emit("update-formData", value);
  },
});

const handleFinishForm = (isError: boolean, values: Object): void => {
  if (
    !isError &&
    props.usernameState === "success" &&
    props.emailState === "success"
  )
    console.log(values);
};

const handleValidateEmail = async (
  _rule: Rule,
  value: string
): Promise<void> => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailValidateStatus.value = false;
  if (!value) {
    return Promise.reject("Email is required");
  } else if (!emailRegex.test(value)) {
    return Promise.reject("Invalid Email format");
  } else {
    emailValidateStatus.value = true;
    return Promise.resolve();
  }
};

watch(
  internalFormData,
  (newValue) => {
    isFormDataChanged.value = newValue;
  },
  { deep: true }
);
</script>

<template>
  <base-form
    id="registerAccountForm"
    :form-data="internalFormData"
    @on-form-finish-action="handleFinishForm"
  >
    <base-form-input
      label="First Name"
      name="firstName"
      placeholder="Insert Your First Name"
      v-model:value="internalFormData.firstName"
      required
    />

    <base-form-input
      label="Last Name"
      name="lastName"
      placeholder="Insert Your Last Name"
      v-model:value="internalFormData.lastName"
      required
    />

    <base-form-input
      label="Username"
      name="username"
      placeholder="Insert Your Username"
      v-model:value="internalFormData.username"
      hasFeedback
      :validate-status="usernameState"
      required
    />

    <base-form-input
      label="Email"
      name="email"
      placeholder="Insert Your Email"
      v-model:value="internalFormData.email"
      hasFeedback
      :validate-status="emailValidateStatus ? emailState : undefined"
      :rules="[
        {
          required: true,
          trigger: 'change',
          validator: handleValidateEmail,
        },
      ]"
    />

    <div class="button-wrapper">
      <base-button
        form="registerAccountForm"
        htmlType="submit"
        label="Continue"
      />
    </div>
  </base-form>
</template>

<style lang="scss" scoped>
.button-wrapper {
  margin-top: $size-16;
  width: 100%;
}
</style>
