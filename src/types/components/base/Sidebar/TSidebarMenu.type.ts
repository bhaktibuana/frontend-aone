import { VNode } from "vue";

interface ISidebarMenuChildren {
  key: string;
  label: string;
  title: string;
  icon?: VNode;
  authorization: "GS" | "SA" | "CU" | "GP";
}

interface ISidebarMenu {
  key: string;
  label: string;
  title?: string;
  icon: VNode;
  children?: ISidebarMenuChildren[];
  authorization: "GS" | "SA" | "CU" | "GP";
}

export type TSidebarMenu = ISidebarMenu[];
