import { Component } from "vue";

export interface IMeta {
  layout?: Component;
  isPrivatePage: boolean;
  isAuthPage: boolean;
  authorization: "GS" | "SA" | "CU";
  /**
   * GS = Guest
   * SA = Super Admin
   * CU = Common User
   */
}
