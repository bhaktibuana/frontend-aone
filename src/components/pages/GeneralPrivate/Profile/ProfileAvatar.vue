<script setup lang="ts">
import BaseAvatar from "@/components/base/Avatar/AvatarLetter.vue";

defineProps({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="profile-avatar-wrapper">
    <div class="avatar-image-wrapper">
      <base-avatar
        :size="48"
        :first-name="firstName"
        :last-name="lastName"
        font-size="20px"
      />
    </div>

    <div class="avatar-info-wrapper">
      <h3>{{ firstName }} {{ lastName }}</h3>

      <p>@{{ username }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-avatar-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: $size-8;
}

.avatar-image-wrapper {
  width: $size-58;
  height: $size-58;
  border-radius: 100%;
  border: $size-1 solid $input-border;
  padding: $size-4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-info-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: $size-4;
  padding: $size-4;

  h3 {
    margin: 0;
    font-size: $size-16;
    font-weight: 600;
    line-height: $size-22;
  }

  p {
    margin: 0;
    font-size: $size-16;
    font-weight: 400;
    line-height: $size-22;
    color: $text-description;
  }
}
</style>
