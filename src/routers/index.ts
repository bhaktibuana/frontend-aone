import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "@/pages/base/LandingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LandingPage,
      name: "Landing Page",
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to, _, next) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  next();
});
