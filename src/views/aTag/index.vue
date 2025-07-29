<template>
  <div class="CustomATagDemo">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6">
        <section class="code-box">
          <section class="code-box-demo">
            <a-divider orientation="left">event</a-divider>
            <div>
              <custom-a-tag
                v-for="item in levelOptions"
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
                v-for="item in eventOptions"
                :key="item.value"
                :value="item.value"
                :type="item.type"
                @close="handleClose"
              />
            </div>
          </section>
        </section>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <section class="code-box">
          <section class="code-box-demo">
            <a-divider orientation="left">event</a-divider>
            <CustomATag2
              :value="1"
              type="event"
              label="待处理"
              icon="clock-circle"
              tooltip="这个状态是待处理"
              closable
              hoverEffect
              customClass="my-custom-class"
              @close="handleClose"
            />
            <CustomATag2
              :value="2"
              type="event"
              label="待审核"
              icon="clock-circle"
              tooltip="这个状态是待审核"
              closable
              hoverEffect
              customClass="my-custom-class"
              @close="handleClose"
            />
            <a-divider orientation="left">level</a-divider>
            <CustomATag2
              :value="0"
              type="event"
              label="等级1"
              icon="clock-circle"
              tooltip="这个状态是等级1"
              closable
              hoverEffect
              customClass="my-custom-class"
              @close="handleClose"
            />
            <CustomATag2
              :value="1"
              type="event"
              label="等级2"
              icon="clock-circle"
              tooltip="这个状态是等级2"
              closable
              hoverEffect
              customClass="my-custom-class"
              @close="handleClose"
            />
          </section>
        </section>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CustomATag from "@/components/re-antdv/ATag.vue";
import CustomATag2 from "./CustomATag2.vue";
export default {
  components: { CustomATag, CustomATag2 },
  data() {
    return {
      levelOptions: [
        { label: "标签1", value: 1, type: "level", closable: true },
        { label: "标签2", value: 2, type: "level", closable: true },
        { label: "标签3", value: 3, type: "level", closable: true },
        { label: "标签4", value: 4, type: "level", closable: true }
      ],
      eventOptions: [
        { label: "标签0", value: 0, type: "event" },
        { label: "标签1", value: 1, type: "event" },
        { label: "标签2", value: 2, type: "event" },
        { label: "标签3", value: 3, type: "event" },
        { label: "标签4", value: 4, type: "event" },
        { label: "标签5", value: 5, type: "event" }
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