import PrivatePageLayoutVue from "@/components/layouts/PrivatePages/PrivatePageLayout.vue";

import Dashboard from "@/pages/SuperAdmin/Dashboard.vue";

import { TRoutes } from "@/types";

export const SuperAdminRoutes: TRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    name: "SADashboard",
    meta: {
      layout: PrivatePageLayoutVue,
      isPrivatePage: true,
      isAuthPage: false,
      authorization: "SA",
    },
  },
];
