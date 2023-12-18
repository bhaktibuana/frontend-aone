<script setup lang="ts">
import { PropType, onMounted, reactive } from "vue";

import BaseCardWithHeader from "@/components/base/Card/CardWithHeader.vue";
import ProfileAvatar from "@/components/pages/GeneralPrivate/Profile/ProfileAvatar.vue";
import BaseForm from "@/components/base/Form/Form.vue";
import BaseFormInput from "@/components/base/Form/Input/FormInput.vue";
import BaseDivider from "@/components/base/Divider/Divider.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { IGetUserData, IUserInfoFormData } from "@/types";

const props = defineProps({
  userData: {
    type: Object as PropType<IGetUserData>,
    default: {} as IGetUserData,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onFormFinishAction"]);

const formData = reactive<IUserInfoFormData>({} as IUserInfoFormData);

const handleFormFinish = (isError: boolean, data: IUserInfoFormData): void => {
  if (!isError) emit("onFormFinishAction", data);
};

onMounted(() => {
  if (Object.keys(props.userData).length > 0) {
    Object.assign(formData, {
      firstName: props.userData.payload.firstName,
      lastName: props.userData.payload.lastName,
      username: props.userData.payload.username,
      email: props.userData.payload.email,
    } as IUserInfoFormData);
  }
});
</script>

<template>
  <base-card-with-header title="User Info">
    <div class="card-body-wrapper">
      <profile-avatar
        :first-name="userData.payload.firstName"
        :last-name="userData.payload.lastName"
        :username="userData.payload.username"
      />

      <base-form
        id="userInfoForm"
        :form-data="formData"
        @on-form-finish-action="handleFormFinish"
      >
        <base-form-input
          name="firstName"
          label="First Name"
          placeholder="Insert First Name"
          v-model:value="formData.firstName"
          required
        />

        <base-form-input
          name="lastName"
          label="Last Name"
          placeholder="Insert Last Name"
          v-model:value="formData.lastName"
          required
        />

        <base-form-input
          name="email"
          label="Email"
          :value="formData.email"
          disabled
        />

        <base-form-input
          name="username"
          label="Username"
          :value="formData.username"
          disabled
        />
      </base-form>

      <base-divider />

      <div class="button-wrapper">
        <base-button
          form="userInfoForm"
          html-type="submit"
          label="Update"
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
