<template>
  <div class="message-box">
    <div class="modal">
      <div class="box">
        <div class="text">{{ msg }}</div>
        <button @click="$emit('click')">按钮</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: #00000050;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  padding: 10px 0;
  min-width: 30%;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 0 3px #00000080;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text {
  margin-bottom: 1em;
}
</style>
