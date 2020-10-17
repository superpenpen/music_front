import VueRouter, { Route } from "vue-router";

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "vue/types/vue" {
  interface Vue {
    $message: any;
    $confirm: any;
    $router: VueRouter;
    $route: Route;
  }

}


