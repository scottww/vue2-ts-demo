<template>
  <div class="CustomSelectDemo" style="padding: 10px;">
    <CustomSelect
      v-model="selected"
      :options="list"
      :auto-width="true"
      placeholder="选择水果"
      :clearable="false"
      searchable
    />
    <p style="margin-top: 20px; color: #fff">当前选择：{{ selected }}</p>
  </div>
</template>

<script>
import CustomSelect from "./CustomSelect.vue";

export default {
  components: { CustomSelect },
  data() {
    return {
      selected: "",
      list: [
        { label: "苹果苹果苹果苹果这是一个非常非常非常长的选项文本测试这是一个非常非常非常长的选项文本测试这是一个非常非常非常长的选项文本测试", value: "apple" },
        { label: "香蕉", value: "banana" },
        { label: "葡萄", value: "grape", disabled: true },
        { label: "橘子橘子橘子", value: "orange" },
        { label: "西瓜西瓜西瓜西瓜西瓜", value: "watermelon" },
        { label: "苹果苹果苹果苹果这是一个非常非常非常长的选项文本测试这是一个非常非常非常长的选项文本测试这是一个非常非常非常长的选项文本测试", value: "apple" },
        { label: "香蕉", value: "banana2" },
        { label: "葡萄", value: "grape2", disabled: true },
        { label: "橘子橘子橘子", value: "orange2" },
        { label: "西瓜西瓜西瓜西瓜西瓜", value: "watermelon2" }
      ]
    };
  }
};
</script>
