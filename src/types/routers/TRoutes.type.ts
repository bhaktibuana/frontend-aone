import { Component } from "vue";
import { RouteRecordRaw } from "vue-router";

import { IMeta } from "@/types/routers/IMeta.type";

interface IRoutes {
  path: string;
  component: Component;
  name: string;
  meta: IMeta;
}

export type TRoutes = (IRoutes & RouteRecordRaw)[];
