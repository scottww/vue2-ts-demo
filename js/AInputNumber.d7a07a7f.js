(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AInputNumber"],{

/***/ "7e13":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"596bfde8-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/re-antdv/AInputNumber.vue?vue&type=template&id=244ebe8d&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('label', [_vm._v(_vm._s(_vm.label))]), _c('div', {
    staticClass: "my-input-number"
  }, [_c('div', {
    staticClass: "my-input-number-handler-wrap"
  }, [_c('span', {
    staticClass: "my-input-number-handler my-input-number-handler-up",
    on: {
      "click": function ($event) {
        return _vm.upStep(_vm.inputValue);
      }
    }
  }, [_c('i', {
    staticClass: "my-input-number-handler-up-inner"
  }, [_vm._v("<")])]), _c('span', {
    staticClass: "my-input-number-handler my-input-number-handler-down",
    on: {
      "click": function ($event) {
        return _vm.downStep(_vm.inputValue);
      }
    }
  }, [_c('i', {
    staticClass: "my-input-number-handler-down-inner"
  }, [_vm._v(">")])])]), _c('div', {
    staticClass: "my-input-number-input-wrap"
  }, [_c('input', {
    ref: "inputRef",
    staticClass: "my-input-number-input",
    attrs: {
      "min": _vm.min,
      "max": _vm.max,
      "step": _vm.step,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.inputDisplayValue
    },
    on: {
      "input": _vm.onChange,
      "blur": _vm.onBlur
    }
  })])])]);
};
var staticRenderFns = [];


/***/ }),

/***/ "8505":
/*!*****************************************************************************************************************!*\
  !*** ./src/components/re-antdv/AInputNumber.vue?vue&type=style&index=0&id=244ebe8d&prod&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_style_index_0_id_244ebe8d_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AInputNumber.vue?vue&type=style&index=0&id=244ebe8d&prod&lang=scss&scoped=true& */ "fbe0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_style_index_0_id_244ebe8d_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_style_index_0_id_244ebe8d_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_style_index_0_id_244ebe8d_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_style_index_0_id_244ebe8d_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "8825":
/*!*********************************************************************************************!*\
  !*** ./src/components/re-antdv/AInputNumber.vue?vue&type=template&id=244ebe8d&scoped=true& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_596bfde8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_template_id_244ebe8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"596bfde8-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AInputNumber.vue?vue&type=template&id=244ebe8d&scoped=true& */ "7e13");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_596bfde8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_template_id_244ebe8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_596bfde8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_template_id_244ebe8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "ac40":
/*!***************************************************************************!*\
  !*** ./src/components/re-antdv/AInputNumber.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/thread-loader/dist/cjs.js!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AInputNumber.vue?vue&type=script&lang=js& */ "ddb1");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AInputNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "b660":
/*!*************************************************************************************!*\
  !*** ./src/views/aInputNumber/index.vue?vue&type=template&id=c304d0ac&scoped=true& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_596bfde8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c304d0ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"596bfde8-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=c304d0ac&scoped=true& */ "cfda");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_596bfde8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c304d0ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_596bfde8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c304d0ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "b8d4":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/aInputNumber/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_re_antdv_AInputNumber_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/re-antdv/AInputNumber.vue */ "e833");

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    MyInputNumber: _components_re_antdv_AInputNumber_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data() {
    return {
      inputNumberValue: 0
    };
  },
  methods: {
    formatNumber(value) {
      // 格式化输入值，例如添加货币符号等
      return `$${value.toFixed(2)}`;
    },
    change(e) {
      console.log("change ...", e);
    }
  }
});

/***/ }),

/***/ "b976":
/*!*********************************************************************************************************!*\
  !*** ./src/views/aInputNumber/index.vue?vue&type=style&index=0&id=c304d0ac&prod&lang=scss&scoped=true& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c304d0ac_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=c304d0ac&prod&lang=scss&scoped=true& */ "c1fd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c304d0ac_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c304d0ac_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c304d0ac_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c304d0ac_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "c1fd":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/aInputNumber/index.vue?vue&type=style&index=0&id=c304d0ac&prod&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cfda":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"596bfde8-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/aInputNumber/index.vue?vue&type=template&id=c304d0ac&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('MyInputNumber', {
    attrs: {
      "label": "My Input Number",
      "min": 0,
      "max": 5,
      "step": 0.1,
      "precision": 1,
      "formatter": v => `${v}米`,
      "parser": v => v.replace('米', ''),
      "placeholder": "Enter a number..."
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.inputNumberValue,
      callback: function ($$v) {
        _vm.inputNumberValue = $$v;
      },
      expression: "inputNumberValue"
    }
  }), _c('p', [_vm._v("Formatted Input Number Value: " + _vm._s(_vm.inputNumberValue))]), _c('div', {
    attrs: {
      "role": "math",
      "aria-label": "6除以4等于1.5"
    }
  }, [_c('math', {
    attrs: {
      "xmlns": "http://www.w3.org/1998/Math/MathML"
    }
  }, [_c('mfrac', [_c('mn', [_vm._v("6")]), _c('mn', [_vm._v("4")])], 1), _c('mo', [_vm._v("=")]), _c('mn', [_vm._v("1.5")])], 1)], 1)], 1);
};
var staticRenderFns = [];


/***/ }),

/***/ "ddb1":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/re-antdv/AInputNumber.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// const defaultParser = (value) => value.replace(/[^\w\.-]+/g, "");
const isEqual = (oldValue, newValue) => newValue === oldValue || typeof newValue === "number" && typeof oldValue === "number" && isNaN(newValue) && isNaN(oldValue);
/* harmony default export */ __webpack_exports__["default"] = ({
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // id: String,
    label: String,
    value: [Number, String],
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    precision: Number,
    parser: Function,
    formatter: Function,
    placeholder: String
  },
  data() {
    // const inputDisplayValue = this.getInputDisplayValue();
    const validValue = this.getValidValue(this.toNumber(this.value));
    return {
      inputDisplayValue: this.getInputDisplayValue(),
      inputValue: this.toPrecisionAsStep(validValue),
      sValue: validValue
    };
  },
  mounted() {
    const {
      inputDisplayValue,
      inputValue,
      sValue
    } = this;
    console.log("mounted ...", inputDisplayValue, inputValue, sValue);
  },
  computed: {},
  methods: {
    isValidProps(value) {
      return value !== undefined && value !== null;
    },
    getPrecision(value) {
      if (this.isValidProps(this.precision)) {
        return this.precision;
      }
      const valueString = value.toString();
      if (valueString.indexOf("e-") >= 0) {
        return parseInt(valueString.slice(valueString.indexOf("e-") + 2), 10);
      }
      let precision = 0;
      if (valueString.indexOf(".") >= 0) {
        precision = valueString.length - valueString.indexOf(".") - 1;
      }
      return precision;
    },
    getMaxPrecision(currentValue, ratio = 1) {
      if (this.isValidProps(this.precision)) {
        return this.precision;
      }
      const {
        step
      } = this;
      const ratioPrecision = this.getPrecision(ratio);
      const stepPrecision = this.getPrecision(step);
      const currentValuePrecision = this.getPrecision(currentValue);
      if (!currentValue) {
        return ratioPrecision + stepPrecision;
      }
      return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    },
    getPrecisionFactor(currentValue, ratio = 1) {
      const precision = this.getMaxPrecision(currentValue, ratio);
      return Math.pow(10, precision);
    },
    getInputDisplayValue() {
      const {
        focused,
        inputValue,
        sValue
      } = this;
      let inputDisplayValue;
      if (focused) {
        inputDisplayValue = inputValue;
      } else {
        inputDisplayValue = this.toPrecisionAsStep(sValue);
      }
      if (inputDisplayValue === undefined || inputDisplayValue === null) {
        inputDisplayValue = "";
      }
      let inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
      if (this.isValidProps(this.$props.decimalSeparator)) {
        inputDisplayValueFormat = inputDisplayValueFormat.toString().replace(".", this.$props.decimalSeparator);
      }

      // this.inputDisplayValue = inputDisplayValueFormat;

      return inputDisplayValueFormat;
    },
    formatWrapper(num) {
      // http://2ality.com/2012/03/signedzero.html
      // https://github.com/ant-design/ant-design/issues/9439
      if (this.formatter) {
        return this.formatter(num);
      }
      return num;
    },
    toPrecisionAsStep(num) {
      if (this.isNotCompleteNumber(num) || num === "") {
        return num;
      }
      const precision = Math.abs(this.getMaxPrecision(num));
      if (!isNaN(precision)) {
        return Number(num).toFixed(precision);
      }
      return num.toString();
    },
    upStep(val, rat = 1) {
      console.log("+ step");
      const {
        step
      } = this;
      const precisionFactor = this.getPrecisionFactor(val, rat);
      const precision = Math.abs(this.getMaxPrecision(val, rat));
      const result = ((precisionFactor * val + precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      const v = this.toNumber(result);
      console.log("+ step", v);
      this.inputDisplayValue = this.getInputDisplayValue();
      this.inputValue = v;
      console.log("+ step", v, this.getInputDisplayValue());
      // const v = this.toNumber(result);
      // this.inputValue = v;
      this.$emit("change", v);
      return this.toNumber(result);
    },
    downStep(val, rat = 1) {
      console.log("- step");
      const {
        step
      } = this;
      const precisionFactor = this.getPrecisionFactor(val, rat);
      const precision = Math.abs(this.getMaxPrecision(val, rat));
      const result = ((precisionFactor * val - precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      const v = this.toNumber(result);
      this.inputDisplayValue = this.getInputDisplayValue();
      this.inputValue = v;

      // this.inputValue = v;
      this.$emit("change", v);
      return this.toNumber(result);
    },
    isNotCompleteNumber(num) {
      return isNaN(num) || num === "" || num === null || num && num.toString().indexOf(".") === num.toString().length - 1;
    },
    toNumber(num) {
      const {
        precision,
        autoFocus
      } = this;
      const {
        focused = autoFocus
      } = this;
      // num.length > 16 => This is to prevent input of large numbers
      const numberIsTooLarge = num && num.length > 16 && focused;
      if (this.isNotCompleteNumber(num) || numberIsTooLarge) {
        return num;
      }
      if (this.isValidProps(precision)) {
        return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
      }
      return Number(num);
    },
    getValueFromEvent(e) {
      // optimize for chinese input expierence
      // https://github.com/ant-design/ant-design/issues/8196
      let value = e.target.value.trim().replace(/。/g, ".");
      if (this.isValidProps(this.decimalSeparator)) {
        value = value.replace(this.decimalSeparator, ".");
      }
      return value;
    },
    getValidValue(value, min = this.min, max = this.max) {
      let val = parseFloat(value, 10);
      // https://github.com/ant-design/ant-design/issues/7358
      if (isNaN(val)) {
        return value;
      }
      if (val < min) {
        val = min;
      }
      if (val > max) {
        val = max;
      }
      return val;
    },
    onChange(e) {
      console.log("onChange", e);
      if (this.focused) {
        this.inputting = true;
      }
      this.rawInput = this.parser(this.getValueFromEvent(e));
      //TODO:
      console.log("onChange", this.rawInput);
      this.inputValue = this.rawInput;
      this.$emit("change", this.toNumber(this.rawInput)); // valid number or invalid string
    },

    onBlur(...args) {
      console.log("onBlur", this, this.$listeners);
      this.inputting = false;
      this.focused = false;
      const value = this.getCurrentValidValue(this.inputValue);
      const newValue = this.setValue(value);
      if (this.$listeners.blur) {
        const originValue = this.$refs.inputRef.value;
        const inputValue = this.getInputDisplayValue({
          focused: false,
          sValue: newValue
        });
        this.$refs.inputRef.value = inputValue;
        this.$emit("blur", ...args);
        this.$refs.inputRef.value = originValue;
      }
    },
    getCurrentValidValue(value) {
      let val = value;
      if (val === "") {
        val = "";
      } else if (!this.isNotCompleteNumber(parseFloat(val, 10))) {
        val = this.getValidValue(val);
      } else {
        val = this.sValue;
      }
      return this.toNumber(val);
    },
    setValue(v, callback) {
      // trigger onChange
      const {
        precision
      } = this.$props;
      const newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? null : parseFloat(v, 10);
      const {
        sValue: value = null,
        inputValue = null
      } = this.$data;
      // https://github.com/ant-design/ant-design/issues/7363
      // https://github.com/ant-design/ant-design/issues/16622
      const newValueInString = typeof newValue === "number" ? newValue.toFixed(precision) : `${newValue}`;
      const changed = newValue !== value || newValueInString !== `${inputValue}`;
      if (this.value) {
        this.sValue = newValue;
        this.inputValue = this.toPrecisionAsStep(v);
      } else {
        // always set input value same as value
        this.inputValue = this.toPrecisionAsStep(this.sValue);
      }
      if (changed) {
        this.$emit("change", newValue);
      }
      return newValue;
    },
    getValue() {
      console.log("get ...", this.format);
      return this.format ? this.format(this.value) : this.value;
    }
    // setValue(newValue) {
    //   console.log("set ...", newValue);
    //   // 处理输入事件，确保输入值在min和max的范围内，并应用precision
    //   let parsedValue = parseFloat(newValue);
    //   console.log("parsedValue...", parsedValue);
    //   if (!isNaN(parsedValue)) {
    //     parsedValue = Math.min(this.max, Math.max(this.min, parsedValue));
    //     if (!isNaN(this.precision)) {
    //       parsedValue = parseFloat(parsedValue.toFixed(this.precision));
    //     }
    //   }
    //   this.innerValue = parsedValue;
    // },
    // handleInput(event) {
    //   console.log("handleInput", event, event.target.value);
    //   // 将输入值传递给formattedValue，由computed属性处理
    //   const v = this.setValue(event.target.value);
    //   console.log(v);
    // }
  },

  updated() {
    console.log("aaaaa");
    const {
      value,
      max,
      min
    } = this.$props;
    const {
      focused
    } = this.$data;
    const {
      prevProps
    } = this;
    const props = this.$props;
    // Don't trigger in componentDidMount
    if (prevProps) {
      if (!isEqual(prevProps.value, value) || !isEqual(prevProps.max, max) || !isEqual(prevProps.min, min)) {
        const validValue = focused ? value : this.getValidValue(value);
        let nextInputValue;
        if (this.pressingUpOrDown) {
          nextInputValue = validValue;
        } else if (this.inputting) {
          nextInputValue = this.rawInput;
        } else {
          nextInputValue = this.toPrecisionAsStep(validValue);
        }
        // eslint-disable-line
        this.sValue = validValue;
        this.inputValue = nextInputValue;
      }

      // Trigger onChange when max or min change
      // https://github.com/ant-design/ant-design/issues/11574
      const nextValue = "value" in props ? value : this.sValue;
      // ref: null < 20 === true
      // https://github.com/ant-design/ant-design/issues/14277
      if ("max" in props && prevProps.max !== max && typeof nextValue === "number" && nextValue > max) {
        this.$emit("change", max);
      }
      if ("min" in props && prevProps.min !== min && typeof nextValue === "number" && nextValue < min) {
        this.$emit("change", min);
      }
    }
    this.prevProps = {
      ...props
    };
    this.$nextTick(() => {
      // this.updatedFunc();
    });
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        console.log("watch ...", v);
        const validValue = this.getValidValue(this.toNumber(v));
        this.sValue = validValue;
        this.inputValue = this.toPrecisionAsStep(validValue);
        this.inputDisplayValue = this.getInputDisplayValue();
        //
        console.log("watch ...", this.inputDisplayValue, this.inputValue, this.sValue);
        this.$emit("change", validValue);
      }
    }
  }
});

/***/ }),

/***/ "e501":
/*!*******************************************************************!*\
  !*** ./src/views/aInputNumber/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/thread-loader/dist/cjs.js!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "b8d4");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "e833":
/*!**************************************************!*\
  !*** ./src/components/re-antdv/AInputNumber.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AInputNumber_vue_vue_type_template_id_244ebe8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AInputNumber.vue?vue&type=template&id=244ebe8d&scoped=true& */ "8825");
/* harmony import */ var _AInputNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AInputNumber.vue?vue&type=script&lang=js& */ "ac40");
/* empty/unused harmony star reexport *//* harmony import */ var _AInputNumber_vue_vue_type_style_index_0_id_244ebe8d_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AInputNumber.vue?vue&type=style&index=0&id=244ebe8d&prod&lang=scss&scoped=true& */ "8505");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "2877");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AInputNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AInputNumber_vue_vue_type_template_id_244ebe8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AInputNumber_vue_vue_type_template_id_244ebe8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "244ebe8d",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ee71":
/*!******************************************!*\
  !*** ./src/views/aInputNumber/index.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_c304d0ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=c304d0ac&scoped=true& */ "b660");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "e501");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_c304d0ac_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=c304d0ac&prod&lang=scss&scoped=true& */ "b976");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "2877");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_c304d0ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_c304d0ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c304d0ac",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "fbe0":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/re-antdv/AInputNumber.vue?vue&type=style&index=0&id=244ebe8d&prod&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=AInputNumber.d7a07a7f.js.map