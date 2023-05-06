import Vue from "vue";

import HWidge from "./widge";
import HInput from "./input";
import HBreadcrumb from "./breadcrumb";

const components = [HWidge, HInput, HBreadcrumb];

const install = function (vue: typeof Vue, opts = {}) {
  components.forEach((component) => {
    vue.component(component.name, component);
  });
};

const HUI = { install };

export default HUI;

export { HWidge, HInput, HBreadcrumb };
