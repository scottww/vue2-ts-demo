<template>
  <div class="a-input-demo">
    <my-input
      msg="Welcome to Your Vue.js App"
      name="name"
      age="18"
      gender="666"
      sdf="asd"
      :value="v"
      @input="onInput"
      @asd="other"
      style="border: solid 1px red"
    />
    <br />
    <an-input
      size="lg"
      :disabled="false"
      v-model="inputValue"
      placeholder="请输入"
      @input="handleInput"
    >
    </an-input>
    <div></div>
    <a-input placeholder="Basic usage" />
  </div>
</template>

<script>
import MyInput from "@/components/re-antdv/MyInput.vue";
import AnInput from "@/components/re-antdv/AnInput.vue";

export default {
  name: "AInputDemo",
  components: {
    MyInput,
    AnInput
  },
  data() {
    return {
      v: "",
      inputValue: ""
    };
  },
  mounted() {},
  methods: {
    onInput(e) {
      console.log("eee", e, e.target.value);
    },
    other(e) {
      console.log("otherEvent", e);
    },
    handleInput(v) {
      console.log("input框的值", v);
      this.inputValue = v;
    }
  }
};
</script>
