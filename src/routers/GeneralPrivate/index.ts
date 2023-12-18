import PrivatePageLayoutVue from "@/components/layouts/PrivatePages/PrivatePageLayout.vue";

import Profile from "@/pages/GeneralPrivate/Profile.vue";

import { TRoutes } from "@/types";

export const GeneralPrivateRoutes: TRoutes = [
  {
    path: "/profile",
    component: Profile,
    name: "GPProfile",
    meta: {
      layout: PrivatePageLayoutVue,
      isPrivatePage: true,
      isAuthPage: false,
      authorization: "GP",
    },
  },
];
