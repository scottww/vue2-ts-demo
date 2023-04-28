import Vue from "vue";

import HWidge from "./widge";

const components = [
  HWidge
];

const install = function(vue: typeof Vue, opts = {}) {
  components.forEach(component => {
    vue.component(component.name, component);
  });
};

const HUI = { install };

export default HUI;

export {
  HWidge
}