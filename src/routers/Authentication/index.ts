import PublicAuthPageLayout from "@/components/layouts/PublicPages/Authentication/index.vue";

import Register from "@/pages/Authentication/Register.vue";
import VerifyAccount from "@/pages/Authentication/VerifyAccount.vue";
import Login from "@/pages/Authentication/Login.vue";

export const AuthenticationRoutes = [
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: {
      layout: PublicAuthPageLayout,
    },
  },
  {
    path: "/verifyAccount",
    component: VerifyAccount,
    name: "VerifyAccount",
    meta: {
      layout: PublicAuthPageLayout,
    },
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      layout: PublicAuthPageLayout,
    },
  },
];
