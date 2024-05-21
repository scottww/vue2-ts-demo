(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Slider"],{

/***/ "2c8e":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"75bd2a13-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/slider/index.vue?vue&type=template&id=2874f4b3&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "slider-demo"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "left-panel"
  }, [_c('div', {
    staticClass: "top"
  }, [_c('div', {
    staticClass: "btn-change"
  }, [_c('el-button-group', {
    model: {
      value: _vm.currentBtnValue,
      callback: function ($$v) {
        _vm.currentBtnValue = $$v;
      },
      expression: "currentBtnValue"
    }
  }, _vm._l(_vm.btnList, function (item, index) {
    return _c('el-button', {
      key: `btn-${index}`,
      attrs: {
        "type": _vm.currentBtnValue === item.value ? 'primary' : '',
        "size": "mini"
      },
      on: {
        "click": function ($event) {
          return _vm.changeBtn(item);
        }
      }
    }, [_vm._v(_vm._s(item.text))]);
  }), 1)], 1), _c('el-slider', {
    attrs: {
      "min": 0,
      "max": _vm.totalTime,
      "step": 1,
      "show-tooltip": false
    },
    on: {
      "change": _vm.handleSliderChange
    },
    model: {
      value: _vm.sliderValue,
      callback: function ($$v) {
        _vm.sliderValue = $$v;
      },
      expression: "sliderValue"
    }
  }), _c('p', [_vm._v(_vm._s(_vm.currentTime))]), _c('el-button', {
    attrs: {
      "size": "mini",
      "disabled": _vm.sliderValue === 0
    },
    on: {
      "click": _vm.firstFrame
    }
  }, [_vm._v("第一帧")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "disabled": _vm.sliderValue === 0
    },
    on: {
      "click": _vm.prevFrame
    }
  }, [_vm._v("上一帧")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "disabled": _vm.sliderValue === _vm.totalTime
    },
    on: {
      "click": _vm.nextFrame
    }
  }, [_vm._v("下一帧")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "disabled": _vm.sliderValue === _vm.totalTime
    },
    on: {
      "click": _vm.lastFrame
    }
  }, [_vm._v("最后一帧")]), _c('el-button', {
    attrs: {
      "size": "mini"
    },
    on: {
      "click": _vm.togglePlay
    }
  }, [_vm._v(_vm._s(_vm.playing ? "暂停" : "播放"))])], 1), _vm._m(0)]), _c('div', {
    staticClass: "right-panel"
  }, [_c('ul', _vm._l(_vm.timeList, function (item, index) {
    return _c('li', {
      key: index,
      class: {
        active: _vm.currentSegment === index
      }
    }, [_vm._v(" " + _vm._s(item.value) + " ")]);
  }), 0)])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "bottom"
  }, [_c('div', {
    staticClass: "imageBlock"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(/*! @/assets/slider/1.png */ "c1099"),
      "alt": "png"
    }
  })])]);
}];


/***/ }),

/***/ "6792":
/*!***************************************************************************************************!*\
  !*** ./src/views/slider/index.vue?vue&type=style&index=0&id=2874f4b3&prod&lang=scss&scoped=true& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2874f4b3_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=2874f4b3&prod&lang=scss&scoped=true& */ "db4b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2874f4b3_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2874f4b3_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2874f4b3_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2874f4b3_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "a721":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/slider/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import { Slider, Button } from 'element-ui';

/* harmony default export */ __webpack_exports__["default"] = ({
  // components: {
  //   'el-slider': Slider,
  //   'el-button': Button
  // },
  data() {
    return {
      totalTime: 100,
      // 总时间，单位可以根据需要调整
      sliderValue: 0,
      // 滑块当前值
      numDivisions: 10,
      // 将滑块分割为10等份
      playing: false,
      // 播放状态
      currentSegment: 0,
      // 当前播放的时间段
      currentBtnValue: 1,
      btnList: [{
        text: "1小时降雨量",
        value: 1
      }, {
        text: "6小时降雨量",
        value: 6
      }, {
        text: "12小时降雨量",
        value: 12
      }, {
        text: "24小时降雨量",
        value: 24
      }],
      timeList: [{
        value: "05-21 08:00"
      }, {
        value: "05-21 09:00"
      }, {
        value: "05-21 10:00"
      }, {
        value: "05-21 11:00"
      }, {
        value: "05-21 12:00"
      }, {
        value: "05-21 13:00"
      }, {
        value: "05-21 14:00"
      }, {
        value: "05-21 15:00"
      }, {
        value: "05-21 16:00"
      }, {
        value: "05-21 17:00"
      }, {
        value: "05-21 18:00"
      }]
    };
  },
  computed: {
    currentTime() {
      // 计算当前时间，可以根据需要将滑块的值转换成实际的时间格式
      return this.sliderValue;
    }
  },
  methods: {
    changeBtn(item) {
      console.log("changeBtn ...", item);
      this.currentBtnValue = item.value;
    },
    handleSliderChange(value) {
      console.log("handleSliderChange ...", value);
      // 计算当前播放的时间段
      this.currentSegment = Math.floor(value / (this.totalTime / this.numDivisions));
      // 可以在这里触发播放操作
      if (this.playing) {
        this.playSegment(this.currentSegment);
      }
    },
    playSegment(segment) {
      // 在每个时间段结束后自动播放下一个时间段
      setTimeout(() => {
        if (segment < this.numDivisions) {
          this.sliderValue = (segment + 1) * (this.totalTime / this.numDivisions);
          if (this.playing) {
            this.playSegment(segment + 1);
          }
          this.currentSegment = segment + 1;
        }
      }, 500); // (this.totalTime / this.numDivisions) * 1000根据时间段长度计算延迟时间
    },

    togglePlay() {
      // 切换播放状态
      this.playing = !this.playing;
      if (this.playing) {
        this.playSegment(this.currentSegment);
      }
    },
    firstFrame() {
      console.log("firstFrame ...", this);
      this.playing = false;
      // 跳转到第一帧
      this.sliderValue = 0;
      this.currentSegment = 0;
    },
    lastFrame() {
      this.playing = false;
      // 跳转到最后一帧
      this.sliderValue = this.totalTime;
      this.currentSegment = this.numDivisions;
    },
    prevFrame() {
      this.playing = false;
      // 上一针操作
      if (this.sliderValue > 0) {
        this.sliderValue -= this.totalTime / this.numDivisions;
        this.currentSegment -= 1;
      }
    },
    nextFrame() {
      this.playing = false;
      // 下一针操作
      if (this.sliderValue < this.totalTime) {
        this.sliderValue += this.totalTime / this.numDivisions;
        this.currentSegment += 1;
      }
    }
  },
  mounted() {
    // 初始化时播放第一个时间段
    if (this.playing) {
      this.playSegment(this.currentSegment);
    }
  }
});

/***/ }),

/***/ "b707":
/*!*******************************************************************************!*\
  !*** ./src/views/slider/index.vue?vue&type=template&id=2874f4b3&scoped=true& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_75bd2a13_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2874f4b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"75bd2a13-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=2874f4b3&scoped=true& */ "2c8e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_75bd2a13_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2874f4b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_75bd2a13_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2874f4b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "c1099":
/*!*********************************!*\
  !*** ./src/assets/slider/1.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/1.9886e90f.png";

/***/ }),

/***/ "d370a":
/*!************************************!*\
  !*** ./src/views/slider/index.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_2874f4b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=2874f4b3&scoped=true& */ "b707");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "dafb");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_2874f4b3_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=2874f4b3&prod&lang=scss&scoped=true& */ "6792");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "2877");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_2874f4b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_2874f4b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2874f4b3",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "dafb":
/*!*************************************************************!*\
  !*** ./src/views/slider/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/thread-loader/dist/cjs.js!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "a721");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "db4b":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/slider/index.vue?vue&type=style&index=0&id=2874f4b3&prod&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=Slider.6840dec3.js.map