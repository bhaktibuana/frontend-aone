<script setup lang="ts">
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

import { APILogout } from "@/apis/Authentication/Logout";

import { aoneLogo } from "@/assets/images";
import { colors } from "@/assets/styles/colors";

import BaseIcon from "@/components/base/Icon/Icon.vue";
import BaseImage from "@/components/base/Image/Image.vue";
import BaseAvatarLetter from "@/components/base/Avatar/AvatarLetter.vue";
import BaseDropdown from "@/components/base/Dropdown/Dropdown.vue";
import BaseModal from "@/components/base/Modal/Modal.vue";
import BaseButton from "@/components/base/Button/Button.vue";
import BaseButtonOutline from "@/components/base/Button/ButtonOutline.vue";

import { parseNameLength } from "@/utils/functions";
import { removeCookie } from "@/utils/functions/cookie";

import { useUserStore } from "@/store";

import { IDropdownMenuList } from "@/types";

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const userStore = useUserStore();

const emit = defineEmits(["onCollapseAction"]);

const router = useRouter();

const isMobileView = inject<boolean>("isMobileView", false);

const avatarDropdownList = reactive<IDropdownMenuList[]>([
  {
    key: "profile",
    label: "Profile",
    icon: "user-circle",
  },
  {
    key: "notification",
    label: "Notification",
    icon: "bell",
    badgeValue: 27,
    hasDivider: true,
  },
  {
    key: "logout",
    label: "Logout",
    icon: "logout-2",
    color: "danger",
  },
]);

const logoutState = reactive({
  isModalOpen: false,
  loading: false,
});

const handleCollapse = (): void => {
  emit("onCollapseAction", !props.collapsed);
};

const handleClickAvatarDropdown = (key: string): void => {
  switch (key) {
    case "profile":
      router.push({ name: "GPProfile" });
      break;
    case "logout":
      logoutState.isModalOpen = true;
      break;
    default:
      break;
  }
};

const handleCloseLogoutModal = (): void => {
  logoutState.isModalOpen = false;
};

const handleLogout = async (): Promise<void> => {
  logoutState.loading = true;
  try {
    await APILogout.logout();
    removeCookie("accessToken");
    userStore.clearAccessToken();
    userStore.clearUserData();
    router.push({ name: "Login" });
    router.go(0);
  } catch (error) {
    notification["error"]({
      message: "Error",
      description: "Logout Failed",
      placement: "bottom",
    });
  } finally {
    logoutState.loading = false;
    handleCloseLogoutModal();
  }
};
</script>

<template>
  <a-layout-header
    :class="`custom-header ${!isMobileView && collapsed && 'collapse'}`"
  >
    <div v-if="!isMobileView" class="desktop-header">
      <div
        :class="`button-action-wrapper desktop ${collapsed && 'collapse'}`"
        @click="handleCollapse"
      >
        <base-icon
          name="layout-sidebar-left-collapse"
          :size="26"
          :stroke-width="1.5"
        />
      </div>

      <base-dropdown
        :menu-list="avatarDropdownList"
        @on-select-action="handleClickAvatarDropdown"
      >
        <div class="avatar-wrapper">
          <div class="avatar-info">
            <p class="title">
              {{
                Object.keys(userStore.userData).length > 0
                  ? parseNameLength(
                      `${userStore.userData.payload.firstName} ${userStore.userData.payload.lastName}`
                    )
                  : ""
              }}
            </p>
            <p class="subtitle">
              {{
                userStore.userData?.payload?.Role.code === "SA"
                  ? userStore.userData?.payload?.Role.name
                  : userStore.userData?.payload?.UserSubscription[0]
                      ?.Subscription?.name
              }}
            </p>
          </div>

          <div class="avatar-image">
            <base-avatar-letter
              :is-badge-active="
                  (avatarDropdownList.filter(
                    (item) => item.key === 'notification'
                  )[0].badgeValue as number) > 0
                "
              :firstName="userStore.userData?.payload?.firstName"
              :lastName="userStore.userData?.payload?.lastName"
              :size="40"
            />
          </div>
        </div>
      </base-dropdown>
    </div>

    <div v-else class="mobile-header">
      <base-image alt="aone" :src="aoneLogo" :height="34" :width="130" />

      <div class="action-wrapper">
        <div
          :class="`button-action-wrapper ${collapsed && 'collapse'}`"
          @click="handleCollapse"
        >
          <base-icon name="menu-2" :size="26" :stroke-width="1.5" />
        </div>
      </div>
    </div>
  </a-layout-header>

  <base-modal
    v-model:open="logoutState.isModalOpen"
    :closable="false"
    :width="600"
  >
    <div class="logout-modal-wrapper">
      <div class="logout-icon-wrapper">
        <base-icon
          name="logout-2"
          :size="isMobileView ? 32 : 42"
          :color="colors.danger"
        />
      </div>

      <div class="logout-description-wrapper">
        <h2>Are you sure you want to log out of your account?</h2>
        <p>Confirm to end your session</p>
      </div>
    </div>

    <template #modalFooter>
      <div class="logout-modal-footer-wrapper">
        <div @click="handleCloseLogoutModal">
          <base-button-outline
            label="Cancel"
            :disabled="logoutState.loading"
            type="default"
          />
        </div>

        <div @click="handleLogout">
          <base-button
            label="Logout"
            :loading="logoutState.loading"
            type="danger"
            icon="logout-2"
          />
        </div>
      </div>
    </template>
  </base-modal>
</template>

<style scoped lang="scss">
.custom-header {
  width: calc(100% - $size-240);
  height: $size-70;
  padding: $size-10;
  background: $white;
  position: fixed;
  display: flex;
  align-items: center;
  box-shadow: 0 $size-1 $size-4 $default-shadow;
  transition: all 0.2s;
  z-index: 100;
  top: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: normal;

  @include breakpoint(md, max) {
    width: 100%;
    padding: $size-10 $size-16;
  }

  &.collapse {
    width: calc(100% - $size-80);
  }
}

.desktop-header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.mobile-header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.action-wrapper {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.button-action-wrapper {
  width: $size-34;
  height: $size-34;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all ease;
  transform: rotate(0deg);

  &.collapse {
    transform: rotate(180deg);
  }

  &.desktop {
    &:hover {
      background-color: $border-color;
    }
  }
}

.avatar-wrapper {
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: $size-8;

  .avatar-image {
    width: $size-40;
    height: $size-40;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .avatar-info {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    p.title {
      margin: 0;
      font-weight: 600;
      font-size: $size-14;
      line-height: $size-20;
      color: $default-text-color;
    }

    p.subtitle {
      margin: 0;
      font-weight: 400;
      font-size: $size-14;
      line-height: $size-20;
      color: $text-description;
    }
  }
}

.logout-modal-footer-wrapper {
  width: 100%;
  height: auto;
  padding: $size-16 $size-24 $size-8;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $size-16;
}

.logout-modal-wrapper {
  width: 100%;
  height: auto;
  padding: $size-8;
  display: flex;
  flex-direction: column;
  gap: $size-24;
  align-items: center;
}

.logout-icon-wrapper {
  width: $size-80;
  height: $size-80;
  border-radius: 100%;
  background: $light-red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $danger;

  @include breakpoint(md, max) {
    width: $size-60;
    height: $size-60;
  }
}

.logout-description-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-8;

  h2 {
    font-size: $size-18;
    line-height: $size-28;
    font-weight: 700;
    margin: 0;
    text-align: center;
  }

  p {
    font-size: $size-16;
    line-height: $size-24;
    margin: 0;
    font-weight: 400;
    text-align: center;
    color: $text-description;
  }
}
</style>
