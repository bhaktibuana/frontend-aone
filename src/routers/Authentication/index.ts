import PublicAuthPageLayout from "@/components/layouts/PublicPages/Authentication/index.vue";

import Register from "@/pages/Authentication/Register.vue";
import VerifyAccount from "@/pages/Authentication/VerifyAccount.vue";
import Login from "@/pages/Authentication/Login.vue";

import { TRoutes } from "@/types";

export const AuthenticationRoutes: TRoutes = [
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: {
      layout: PublicAuthPageLayout,
      isPrivatePage: false,
      isAuthPage: true,
      authorization: "GS",
    },
  },
  {
    path: "/verifyAccount",
    component: VerifyAccount,
    name: "VerifyAccount",
    meta: {
      layout: PublicAuthPageLayout,
      isPrivatePage: false,
      isAuthPage: true,
      authorization: "GS",
    },
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      layout: PublicAuthPageLayout,
      isPrivatePage: false,
      isAuthPage: true,
      authorization: "GS",
    },
  },
];
