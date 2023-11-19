import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";

import { router } from "@/routers";

const app = createApp(App);

app.use(createPinia());
app.use(Antd);
app.use(router);

app.directive("click-outside", {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

app.mount("#app");
