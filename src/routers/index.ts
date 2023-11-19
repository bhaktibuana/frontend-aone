import { createRouter, createWebHistory } from "vue-router";

import { AuthenticationRoutes } from "@/routers/Authentication";

const LandingPage = () => import("@/pages/base/LandingPage.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AuthenticationRoutes,
    {
      path: "/",
      component: LandingPage,
      name: "Landing Page",
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((_, __, next) => {
  // const { isPrivatePage } = to.meta;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  next();
});
