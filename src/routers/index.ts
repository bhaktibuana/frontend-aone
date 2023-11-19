import { createRouter, createWebHistory } from "vue-router";

const LandingPage = () => import("@/pages/base/LandingPage.vue");

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

router.beforeEach((_, __, next) => {
  // const { isPrivatePage } = to.meta;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  next();
});
