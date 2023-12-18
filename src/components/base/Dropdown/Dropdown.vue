<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";
import { MenuItemType } from "ant-design-vue/es/menu/src/interface";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import BaseIcon from "@/components/base/Icon/Icon.vue";

import { IDropdownMenuList } from "@/types";

const props = defineProps({
  trigger: {
    type: String as PropType<"click" | "hover">,
    default: "click",
  },
  menuList: {
    type: Array as PropType<IDropdownMenuList[]>,
    default: [] as IDropdownMenuList[],
  },
});

const emit = defineEmits(["onSelectAction"]);

const internalMenuList = ref<IDropdownMenuList[]>(props.menuList);

const handleSelectAction = (value: MenuItemType): void => {
  emit("onSelectAction", value.key);
};

onMounted(() => {
  if (props.menuList.length <= 0) return;

  const result: IDropdownMenuList[] = [];
  for (let i = 0; i < props.menuList.length; i++) {
    const currentItem = props.menuList[i];
    result.push(currentItem);

    if (currentItem.hasDivider && i !== props.menuList.length - 1) {
      result.push({
        type: "divider",
      });
    }
  }
  internalMenuList.value = result as IDropdownMenuList[];
});
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: tokenProperties.colorPrimary,
      },
    }"
  >
    <a-dropdown :trigger="[trigger]">
      <slot></slot>

      <template #overlay>
        <a-menu @click="handleSelectAction">
          <div v-for="menu in internalMenuList" :key="menu.key">
            <a-menu-divider v-if="menu.type === 'divider'" />
            <a-menu-item v-else :key="menu.key" :disabled="menu.disabled">
              <div :class="`menu-item ${menu.color}`">
                <div class="item-wrapper">
                  <base-icon
                    :class="`icon ${menu.color}`"
                    :name="(menu.icon as string)"
                    :strokeWidth="2"
                    color=""
                  />
                  {{ menu.label }}
                </div>

                <a-badge
                  :count="menu.badgeValue"
                  :offset="[-8, 0]"
                  :overflow-count="9"
                >
                  <div class="badge-item"></div>
                </a-badge>
              </div>
            </a-menu-item>
          </div>
        </a-menu>
      </template>
    </a-dropdown>
  </a-config-provider>
</template>

<style scoped lang="scss">
.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: $size-130;
  color: $default-text-color;

  .item-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $size-8;
  }

  .badge-item {
    height: 100%;
    width: $size-10;
    background-color: red;
  }

  &.default {
    color: $default-text-color;
  }

  &.primary {
    color: $primary;
  }

  &.danger {
    color: $danger;
  }

  .icon {
    color: $default-text-color;

    &.default {
      color: $default-text-color;
    }

    &.primary {
      color: $primary;
    }

    &.danger {
      color: $danger;
    }
  }
}
</style>
