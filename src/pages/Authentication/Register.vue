<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { APIAuthentication } from "@/apis/Authentication";

import { aoneLogo } from "@/assets/images";

import BaseCard from "@/components/base/Card/Card.vue";
import BaseImage from "@/components/base/Image/Image.vue";
import WindowSize from "@/components/HOC/WindowSize.vue";
import RegisterAccount from "@/components/pages/Authentication/Register/RegisterAccount.vue";
import RegisterStepper from "@/components/pages/Authentication/Register/RegisterStepper.vue";

import { IStepsItem, IRegisterAccountFormData, TValidateStatus } from "@/types";
import { ICheckUsername } from "@/types/apis/Authentication/queries/ICheckUsernameQuery";
import { ICheckEmail } from "@/types/apis/Authentication/queries/ICheckEmailQuery";

import { debounce } from "@/utils/functions";

const router = useRouter();

const currentStep = ref<number>(0);
const isOnCheckUsername = ref<boolean>(false);
const usernameState = ref<TValidateStatus>(undefined);
const isOnCheckEmail = ref<boolean>(false);
const emailState = ref<TValidateStatus>(undefined);

const stepList = reactive<IStepsItem[]>([
  {
    title: "Waiting",
    description: "Register Account",
  },
  {
    title: "Waiting",
    description: "Choose Plan",
  },
  {
    title: "Waiting",
    description: "Your Credentials",
  },
]);

const registerAccountFormData = reactive<IRegisterAccountFormData>({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
});

const handleUpdateRegisterAccountFormData = (
  values: IRegisterAccountFormData
): void => {
  registerAccountFormData.firstName = values.firstName;
  registerAccountFormData.lastName = values.lastName;
  registerAccountFormData.username = values.username;
  registerAccountFormData.email = values.email;
};

const hanldeUpdateCurrentStep = (index: number): void => {
  if (currentStep.value === index) return;
  if (stepList[index].title === "Waiting") return;
  currentStep.value = index;
};

const handleChangeStepList = (index: number): void => {
  stepList.forEach((_, idx) => {
    if (idx === index && stepList[idx].title !== "Finished") {
      stepList[idx].title = "In Progress";
    } else if (idx < index && stepList[idx].title !== "Finished") {
      stepList[idx].title = "Finished";
    } else if (idx > index && stepList[idx].title === "Waiting") {
      stepList[idx].title = "Waiting";
    }
  });
};

const handleLogin = (): void => {
  router.push({ name: "Login" });
};

const handleCheckUsername = async (params: ICheckUsername): Promise<void> => {
  isOnCheckUsername.value = true;

  try {
    await APIAuthentication.checkUsername(params);
    usernameState.value = "success";
  } catch (error) {
    usernameState.value = "error";
  } finally {
    isOnCheckUsername.value = false;
  }
};

const handleCheckEmail = async (params: ICheckEmail): Promise<void> => {
  isOnCheckEmail.value = true;

  try {
    await APIAuthentication.checkEmail(params);
    emailState.value = "success";
  } catch (error) {
    emailState.value = "error";
  } finally {
    isOnCheckEmail.value = false;
  }
};

watch(currentStep, (newValue) => {
  handleChangeStepList(newValue);
});

watch(
  () => registerAccountFormData.username,
  () => (isOnCheckUsername.value = true)
);

watch(
  () => registerAccountFormData.username,
  debounce((newValue: string) => {
    if (!registerAccountFormData.username) {
      usernameState.value = undefined;
    } else {
      handleCheckUsername({ username: newValue });
    }
  }, 300)
);

watch(isOnCheckUsername, (newValue) => {
  if (newValue) usernameState.value = "validating";
});

watch(
  () => registerAccountFormData.email,
  () => (isOnCheckEmail.value = true)
);

watch(
  () => registerAccountFormData.email,
  debounce((newValue: string) => {
    if (!registerAccountFormData.email) {
      emailState.value = undefined;
    } else {
      handleCheckEmail({ email: newValue });
    }
  }, 300)
);

watch(isOnCheckEmail, (newValue) => {
  if (newValue) emailState.value = "validating";
});

onMounted(() => {
  handleChangeStepList(currentStep.value);
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

          <register-stepper
            :stepList="stepList"
            :currentStep="currentStep"
            @update-selectedIndex="hanldeUpdateCurrentStep"
          />

          <register-account
            v-if="currentStep === 0"
            :form-data="registerAccountFormData"
            :usernameState="usernameState"
            :emailState="emailState"
            @update-formData="handleUpdateRegisterAccountFormData"
          />

          <span class="login-info-text">
            Already have account?
            <span class="login-action" @click="handleLogin"> Login Here </span>
          </span>
        </div>
      </base-card>
    </div>
  </window-size>
</template>

<style lang="scss" scoped>
.page-wrapper {
  padding-top: $size-96;

  @include breakpoint(md, max) {
    padding: $size-32 $size-16 $size-16 $size-16;
  }
}

.card-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: $size-16;
  width: 600px;
  align-items: center;

  @include breakpoint(md, max) {
    width: calc(100vw - $size-64);
    gap: $size-20;
  }
}

.logo-image-wrapper {
  max-width: 195px;
  height: auto;
  object-fit: contain;
}

.login-info-text {
  font-size: $size-16;
  line-height: $size-24;

  @include breakpoint(md, max) {
    font-size: $size-12;
    line-height: $size-20;
  }

  .login-action {
    font-weight: 600;
    color: $primary;
    cursor: pointer;
  }
}
</style>
