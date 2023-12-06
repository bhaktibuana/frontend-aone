<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { AxiosError, AxiosResponse } from "axios";

import { APIRegister } from "@/apis/Authentication/Register";

import { aoneLogo } from "@/assets/images";

import BaseCard from "@/components/base/Card/Card.vue";
import BaseImage from "@/components/base/Image/Image.vue";
import ChoosePlan from "@/components/pages/Authentication/Register/ChoosePlan.vue";
import RegisterAccount from "@/components/pages/Authentication/Register/RegisterAccount.vue";
import RegisterStepper from "@/components/pages/Authentication/Register/RegisterStepper.vue";
import RegisterCredentials from "@/components/pages/Authentication/Register/Credentials.vue";
import RegisterSuccess from "@/components/pages/Authentication/Register/RegisterSuccess.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { mailIcon } from "@/assets/icons";

import { debounce, hashPassword } from "@/utils/functions";

import { ICheckUsername } from "@/types/apis/Authentication/queries/ICheckUsernameQuery";
import { ICheckEmail } from "@/types/apis/Authentication/queries/ICheckEmailQuery";

import {
  IStepsItem,
  IRegisterAccountFormData,
  TValidateStatus,
  IChoosePlanFormData,
  ICredentialsFormData,
  IRegisterFormData,
} from "@/types";

const router = useRouter();

const isMobileView = inject<boolean>("isMobileView", false);

const currentStep = ref<number>(0);
const isOnCheckUsername = ref<boolean>(false);
const usernameState = ref<TValidateStatus>(undefined);
const isOnCheckEmail = ref<boolean>(false);
const emailState = ref<TValidateStatus>(undefined);
const registerButtonLabel = ref<string>("Register");

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

const registerAccountFormData = reactive<IRegisterAccountFormData>(
  {} as IRegisterAccountFormData
);

const choosePlanFormData = reactive<IChoosePlanFormData>(
  {} as IChoosePlanFormData
);

const credentialsFormData = reactive<ICredentialsFormData>(
  {} as ICredentialsFormData
);

const formData = reactive<IRegisterFormData>({
  loading: false,
  data: {
    encrypted: true,
  },
} as IRegisterFormData);

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
    await APIRegister.checkUsername(params);
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
    await APIRegister.checkEmail(params);
    emailState.value = "success";
  } catch (error) {
    emailState.value = "error";
  } finally {
    isOnCheckEmail.value = false;
  }
};

const onFinishSection = (): void => {
  currentStep.value += 1;
};

const handleStepOnValueChange = (): void => {
  stepList.forEach((_, index) => {
    if (index === currentStep.value) {
      stepList[index].title = "In Progress";
    } else if (index > currentStep.value) {
      stepList[index].title = "Waiting";
    }
  });
};

const handleFinishAllForm = (): void => {
  formData.loading = true;
  registerButtonLabel.value = "Validating";
  setTimeout(() => {
    registerButtonLabel.value = "Processing";
    setTimeout(() => {
      handleRegisterAction();
    }, 2000);
  }, 2000);
};

const handleRegisterAction = async (): Promise<void> => {
  formData.loading = true;
  try {
    await APIRegister.register({
      ...formData.data,
      password: hashPassword(formData.data.password),
    });
    currentStep.value = 3;
  } catch (error: unknown | AxiosError) {
    const err = error as AxiosError;
    const errResponse = err?.response as AxiosResponse<{ message: string }>;
    notification["error"]({
      message: "Error",
      description: `${errResponse.data.message}`,
      placement: "bottom",
    });
  } finally {
    formData.loading = false;
    registerButtonLabel.value = "Register";
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

watch(
  () => registerAccountFormData,
  (newValue) => {
    handleStepOnValueChange();
    formData.data = {
      ...formData.data,
      ...newValue,
    };
  },
  { deep: true }
);

watch(
  () => choosePlanFormData,
  (newValue) => {
    handleStepOnValueChange();
    if (newValue.subscriptionCode === "basic") {
      choosePlanFormData.cardholderName = undefined;
      choosePlanFormData.cardNumber = undefined;
      choosePlanFormData.cardCCV = undefined;
      choosePlanFormData.cardExpiration = undefined;
    }
    formData.data = {
      ...formData.data,
      ...newValue,
    };
  },
  { deep: true }
);

watch(
  () => credentialsFormData.password,
  () => {
    credentialsFormData.confirmPassword = undefined as never as string;
  }
);

watch(
  () => credentialsFormData,
  (newValue) => {
    handleStepOnValueChange();
    formData.data = {
      ...formData.data,
      ...newValue,
    };
  },
  { deep: true }
);

onMounted(() => {
  handleChangeStepList(currentStep.value);
});
</script>

<template>
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
          v-if="currentStep !== 3"
          :stepList="stepList"
          :currentStep="currentStep"
          @update-selectedIndex="hanldeUpdateCurrentStep"
        />

        <register-account
          v-if="currentStep === 0"
          :form-data="registerAccountFormData"
          :usernameState="usernameState"
          :emailState="emailState"
          @on-finish-register-account="onFinishSection"
        />

        <choose-plan
          v-else-if="currentStep === 1"
          :form-data="choosePlanFormData"
          @on-finish-choose-plan="onFinishSection"
        />

        <register-credentials
          v-else-if="currentStep === 2"
          :form-data="credentialsFormData"
          :button-label="registerButtonLabel"
          :loading="formData.loading"
          @on-finish-credentials="handleFinishAllForm"
        />

        <span v-if="currentStep !== 3" class="login-info-text">
          Already have account?
          <span class="login-action" @click="handleLogin"> Login Here </span>
        </span>

        <register-success
          v-if="currentStep === 3"
          :icon="mailIcon"
          title="Account Registration Successful"
          description="We have sent a verification link to your registered email. Check your email to verify your account"
        />

        <div
          v-if="currentStep === 3"
          class="button-wrapper"
          @click="handleLogin"
        >
          <base-button label="Login" />
        </div>
      </div>
    </base-card>
  </div>
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
  max-width: $size-195;
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

.button-wrapper {
  width: 100%;
}
</style>
