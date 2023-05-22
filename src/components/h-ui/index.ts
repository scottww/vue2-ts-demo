import Vue from "vue";

import HWidge from "./widge";
import HInput from "./input";
import HBreadcrumb from "./breadcrumb";
import HGrid from "./grid";
import HIndicators from "./indicators";
import HCardCarousel from "./cardCarousel";
import HCarousel from './carousel';
import HCategorys from './categorys';
import HRadio from './radio';

const components = [HWidge, HInput, HBreadcrumb, HGrid, HIndicators, HCardCarousel, HCarousel, HCategorys, HRadio];

const install = function (vue: typeof Vue, opts = {}) {
  components.forEach((component) => {
    vue.component(component.name, component);
  });
};

const HUI = { install };

export default HUI;

export { HWidge, HInput, HBreadcrumb, HGrid, HIndicators, HCardCarousel, HCarousel, HCategorys, HRadio };
