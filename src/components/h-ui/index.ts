import Vue from "vue";

import HWidge from "./widge";
import HInput from "./input";
import HBreadcrumb from "./breadcrumb";
import HGrid from "./grid";

const components = [HWidge, HInput, HBreadcrumb, HGrid];

const install = function (vue: typeof Vue, opts = {}) {
  components.forEach((component) => {
    vue.component(component.name, component);
  });
};

const HUI = { install };

export default HUI;

export { HWidge, HInput, HBreadcrumb, HGrid };
