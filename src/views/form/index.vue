<template>
  <div class="form-demo">
    <my-form>
      <template #footer>
        <div class="flex-v-h">
          <button>登 录</button>
        </div>
      </template>
    </my-form>
  </div>
</template>

<script>
import MyForm from "@/components/form/index.vue";
export default {
  name: "MyFormDemo",
  components: { MyForm }
};
</script>

<style lang="scss" scoped>
.form-demo {
  position: relative;
  top: 5%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, 0);
  // background: rgba(24, 20, 20, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  // border-radius: 10px;
}
.flex-v-h{
  margin-top: 15px;
}
</style>