<script setup lang="ts">
import BaseForm from "@/components/base/Form/Form.vue";
</script>

<template>
  <base-form
    id="registerCredentialsForm"
    :form-data="formData"
    @on-form-finish-action="handleFinishForm"
  ></base-form>
</template>

<style scoped lang="scss"></style>
