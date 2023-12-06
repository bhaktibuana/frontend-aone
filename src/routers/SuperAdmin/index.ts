import Dashboard from "@/pages/SuperAdmin/Dashboard.vue";

import { TRoutes } from "@/types";

export const SuperAdminRoutes: TRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    name: "SADashboard",
    meta: {
      isPrivatePage: true,
      isAuthPage: false,
      authorization: "SA",
    },
  },
];
