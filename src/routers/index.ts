import { createRouter, createWebHistory } from "vue-router";

import { AuthenticationRoutes } from "@/routers/Authentication";

import LandingPage from "@/pages/base/LandingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AuthenticationRoutes,
    {
      path: "/",
      component: LandingPage,
      name: "LandingPage",
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
