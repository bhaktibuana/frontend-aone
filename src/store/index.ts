import { defineStore } from "pinia";

import { APIProfile } from "@/apis/Authentication/Profile";

import { setCookie } from "@/utils/functions/cookie";

import { IGetUserData } from "@/types";
import { getUserData } from "@/utils/functions";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {} as IGetUserData,
    accessToken: "",
  }),
  getters: {
    getUserData: (state) => state.userData,
    getAccessToken: (state) => state.accessToken,
  },
  actions: {
    setUserData(data: IGetUserData) {
      this.$state.userData = data;
    },
    clearUserData() {
      this.setUserData({} as IGetUserData);
    },
    setAccessToken(value: string) {
      this.$state.accessToken = value;
    },
    clearAccessToken() {
      this.setAccessToken("");
    },
    async fetchData() {
      try {
        const response = await APIProfile.myToken();
        setCookie("accessToken", response.data?.data?.accessToken, 7, "");
        this.setUserData(
          getUserData(response.data?.data?.accessToken as string)
        );
        this.setAccessToken(response.data?.data?.accessToken as string);
      } catch (error) {
        this.clearUserData();
        this.clearAccessToken();
      }
    },
  },
});
