const Register = () => import("@/pages/Authentication/Register.vue");

export const AuthenticationRoutes = [
  {
    path: "/register",
    component: Register,
    name: "Register",
  },
];
