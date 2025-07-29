<template>
  <div class="CustomATagDemo">
    <section class="code-box">
      <section class="code-box-demo">
        <a-divider orientation="left">event</a-divider>
        <div>
          <custom-a-tag
            v-for="item in options1"
            :key="item.value"
            :value="item.value"
            :type="item.type"
            :closable="item.closable"
            @close="handleClose"
          />
        </div>
        <a-divider orientation="left">level</a-divider>
        <div>
          <custom-a-tag
            v-for="item in options2"
            :key="item.value"
            :value="item.value"
            :type="item.type"
            @close="handleClose"
          />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import CustomATag from "@/components/re-antdv/ATag.vue";
export default {
  components: { CustomATag },
  data() {
    return {
      options1: [
        { label: "标签1", value: 1, type: "event", closable: true },
        { label: "标签2", value: 2, type: "event", closable: true },
        { label: "标签3", value: 3, type: "event", closable: true },
        { label: "标签4", value: 4, type: "event", closable: true },
        { label: "标签5", value: 5, type: "event", closable: true }
      ],
      options2: [
        { label: "标签1", value: 1, type: "level" },
        { label: "标签2", value: 2, type: "level" },
        { label: "标签3", value: 3, type: "level" },
        { label: "标签4", value: 4, type: "level" },
        { label: "标签5", value: 5, type: "level" }
      ]
    };
  },
  methods: {
    handleClose(value) {
      console.log("标签被关闭，值是：", value);
    }
  }
};
</script>

<style scoped>
.CustomATagDemo {
  display: flex;
  flex-direction: column;
}
.code-box {
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 6px;
  transition: all 0.2s;
  background-color: #fff;
}
.code-box-demo {
  padding: 42px 24px 50px;
  color: rgba(0, 0, 0, 0.88);
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}
</style>