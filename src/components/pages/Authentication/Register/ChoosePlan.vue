<script setup lang="ts">
import { PropType, reactive } from "vue";

import BaseForm from "@/components/base/Form/Form.vue";
import BaseFormRadio from "@/components/base/Form/Radio/FormRadio.vue";
import BaseFormInput from "@/components/base/Form/Input/FormInput.vue";
import BaseFormCardNumber from "@/components/base/Form/Input/FormCardNumber.vue";
import BaseFormCCV from "@/components/base/Form/Input/FormCCV.vue";
import BaseFormCardExpireDate from "@/components/base/Form/Input/FormCardExpireDate.vue";
import BaseButton from "@/components/base/Button/Button.vue";

import { IChoosePlanFormData, IRadioButtonOptions } from "@/types";

defineProps({
  formData: {
    type: Object as PropType<IChoosePlanFormData>,
    default: {} as IChoosePlanFormData,
  },
});

const emit = defineEmits(["onFinishChoosePlan"]);

const membershipOptions = reactive<IRadioButtonOptions[]>([
  {
    key: "basic",
    label: "Basic",
  },
  {
    key: "personal",
    label: "Personal",
  },
  {
    key: "bussiness",
    label: "Bussiness",
  },
]);

const handleFinishForm = (isError: boolean, values: Object): void => {
  if (!isError) emit("onFinishChoosePlan", values);
};
</script>

<template>
  <base-form
    id="registerChoosePlanForm"
    :form-data="formData"
    @on-form-finish-action="handleFinishForm"
  >
    <div class="form-wrapper">
      <div class="membership-wrapper">
        <h2 class="section-title">Choose Membership</h2>

        <base-form-radio
          label="Membership"
          name="membership"
          :options="membershipOptions"
          v-model:value="formData.membershipKey"
          required
        />
      </div>

      <div class="payment-wrapper">
        <h2 class="section-title">Debit/Credit Card</h2>

        <div class="input-wrapper">
          <base-form-input
            label="Cardholder Name"
            name="cardholderName"
            placeholder="Insert Cardholder Name"
            v-model:value="formData.cardholderName"
            :required="
              formData.membershipKey === 'personal' ||
              formData.membershipKey === 'bussiness'
            "
            :disabled="
              !(
                formData.membershipKey === 'personal' ||
                formData.membershipKey === 'bussiness'
              )
            "
          />

          <base-form-card-number
            label="Card Number"
            name="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            v-model:value="formData.cardNumber"
            :required="
              formData.membershipKey === 'personal' ||
              formData.membershipKey === 'bussiness'
            "
            :disabled="
              !(
                formData.membershipKey === 'personal' ||
                formData.membershipKey === 'bussiness'
              )
            "
          />

          <div class="input-group-wrapper">
            <base-form-c-c-v
              label="CCV"
              name="cardCCV"
              placeholder="e.g 354"
              v-model:value="formData.cardCCV"
              :required="
                formData.membershipKey === 'personal' ||
                formData.membershipKey === 'bussiness'
              "
              :disabled="
                !(
                  formData.membershipKey === 'personal' ||
                  formData.membershipKey === 'bussiness'
                )
              "
            />

            <base-form-card-expire-date
              label="Expiration"
              name="cardExpireDate"
              placeholder="MM/YY"
              v-model:value="formData.cardExpireDate"
              :required="
                formData.membershipKey === 'personal' ||
                formData.membershipKey === 'bussiness'
              "
              :disabled="
                !(
                  formData.membershipKey === 'personal' ||
                  formData.membershipKey === 'bussiness'
                )
              "
            />
          </div>

          <div class="button-wrapper">
            <base-button
              form="registerChoosePlanForm"
              htmlType="submit"
              label="Continue"
            />
          </div>
        </div>
      </div>
    </div>
  </base-form>
</template>

<style scoped lang="scss">
h2.section-title {
  font-size: $size-18;
  font-weight: 600;
  line-height: $size-22;
  margin: 0;
}

.form-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-24;
}

.membership-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-4;
  margin-top: 10px;
}

.payment-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-4;
}

.input-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-16;
}

.input-group-wrapper {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $size-16;
}

.button-wrapper {
  margin-top: $size-16;
  width: 100%;
}
</style>
