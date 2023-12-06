<script setup lang="ts">
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

import { APILogout } from "@/apis/Authentication/Logout";

import BaseButton from "@/components/base/Button/Button.vue";

import { removeCookie } from "@/utils/functions/cookie";

const router = useRouter();

const handleLogout = async (): Promise<void> => {
  try {
    await APILogout.logout();
    removeCookie("accessToken");
    router.push({ name: "Login" });
    history.pushState(null, "", "");
  } catch (error) {
    notification["error"]({
      message: "Error",
      description: "Logout Failed",
      placement: "bottom",
    });
  }
};
</script>

<template>
  <h2>Common User Dashboard</h2>

  <div @click="handleLogout">
    <base-button label="Logout" />
  </div>
</template>

<style scoped lang="scss"></style>
