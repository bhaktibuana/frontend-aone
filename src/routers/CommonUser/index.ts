import PrivatePageLayoutVue from "@/components/layouts/PrivatePages/PrivatePageLayout.vue";

import Dashboard from "@/pages/CommonUser/Dashboard.vue";
import PaymentMethods from "@/pages/CommonUser/Settings/PaymentMethods.vue";

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
  {
    path: "/settings/payment-methods",
    component: PaymentMethods,
    name: "CUPaymentMethods",
    meta: {
      layout: PrivatePageLayoutVue,
      isPrivatePage: true,
      isAuthPage: false,
      authorization: "CU",
    },
  },
];
