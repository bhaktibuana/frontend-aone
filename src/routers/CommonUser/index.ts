import PrivatePageLayoutVue from "@/components/layouts/PrivatePages/PrivatePageLayout.vue";

import Dashboard from "@/pages/CommonUser/Dashboard.vue";

import { TRoutes } from "@/types";

export const CommonUserRoutes: TRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    name: "CUDashboard",
    meta: {
      layout: PrivatePageLayoutVue,
      isPrivatePage: true,
      isAuthPage: false,
      authorization: "CU",
    },
  },
];
