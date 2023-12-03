import Register from "@/pages/Authentication/Register.vue";
import VerifyAccount from "@/pages/Authentication/VerifyAccount.vue";

export const AuthenticationRoutes = [
  {
    path: "/register",
    component: Register,
    name: "Register",
  },
  {
    path: "/verifyAccount",
    component: VerifyAccount,
    name: "VerifyAccount",
  },
];
