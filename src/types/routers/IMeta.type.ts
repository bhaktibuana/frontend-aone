import { Component } from "vue";

export interface IMeta {
  layout?: Component;
  isPrivatePage: boolean;
  isAuthPage: boolean;
  authorization: "GS" | "SA" | "CU" | "GP";
  /**
   * GS = Guest
   * SA = Super Admin
   * CU = Common User
   */
}
