import { createRouter, createWebHistory } from "vue-router";

import { AuthenticationRoutes } from "@/routers/Authentication";
import { CommonUserRoutes } from "@/routers/CommonUser";
import { SuperAdminRoutes } from "./SuperAdmin";

import LandingPage from "@/pages/base/LandingPage.vue";
import NotFoundPage from "@/pages/base/NotFoundPage.vue";

import { getCookie, removeCookie } from "@/utils/functions/cookie";
import { getUserData } from "@/utils/functions";

import { IMeta } from "@/types";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AuthenticationRoutes,
    ...SuperAdminRoutes,
    ...CommonUserRoutes,
    {
      path: "/",
      component: LandingPage,
      name: "LandingPage",
      meta: {
        isPrivatePage: false,
        isAuthPage: false,
        authorization: "GS",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
      name: "NotFoundPage",
      meta: {
        isPrivatePage: false,
        isAuthPage: false,
        authorization: "GS",
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const routes = router.getRoutes();

  const { isPrivatePage, isAuthPage, authorization } =
    to.meta as never as IMeta;

  const accessToken = () => getCookie("accessToken");

  const findMatchRouteName = (userRole: string): void => {
    const routeFilter = routes.filter(
      (route) => route.path === to.path && route.meta.authorization === userRole
    );

    if (routeFilter.length > 0) {
      return next({ name: routeFilter[0].name });
    } else {
      return next({ name: "NotFoundPage" });
    }
  };

  if (accessToken()) {
    const userData = getUserData(accessToken() as string);

    if (userData.isExpired || userData.isInvalidToken) {
      removeCookie("accessToken");
      next({ name: "Login" });
      return router.go(0)
    } else {
      const userRole = userData.payload.Role.code;

      if (isAuthPage) {
        return next({ path: "/dashboard" });
      } else if (isPrivatePage && authorization !== userRole) {
        return findMatchRouteName(userRole);
      }
    }
  } else {
    if (isPrivatePage) {
      return next({ name: "Login" });
    }
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  next();
});
