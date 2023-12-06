import Dashboard from "@/pages/CommonUser/Dashboard.vue";

import { TRoutes } from "@/types";

export const CommonUserRoutes: TRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    name: "CUDashboard",
    meta: {
      isPrivatePage: true,
      isAuthPage: false,
      authorization: "CU",
    },
  },
];
