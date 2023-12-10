<template>
  <div>
    <input v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  inheritAttrs: false,
  computed: {
    newListeners() {
      //vue2.6.11 中存在$listeners, vue2.7.15中没有$listeners
      const attrs = this.$attrs;
      const emitCurrent = this.$emit;
      const map = {};
      //   Object.keys(attrs)
      //     .filter((key) => /^on[\w\W]+/.test(key))
      //     .map((key, fn) => {
      //       map[key] = (...res) => {
      //         emitCurrent(key, ...res);
      //         fn(...res);
      //       };
      //     });
      const listeners = this.$listeners;
      console.log(listeners);
      Object.keys(listeners).map((key, fn) => {
        map[key] = (...res) => {
          emitCurrent(key, ...res);
          fn(...res);
        };
      });
      console.log("map >>>", map);
      return map;
    }
  },
  created() {
    console.log("created", this.$attrs, this.$listeners);
  }
};
</script>

<style></style>
