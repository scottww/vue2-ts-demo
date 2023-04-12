<template>
  <div class="tabs-example">
    <h-tabs :tabs="['Tab1', 'Tab2', 'Tab3']">
      <template #tab1>
        <p>Content for Tab 1 goes here</p>
      </template>
      <template #Tab2>
        <p>Content for Tab 2 goes here</p>
      </template>
      <template #Tab3>
        <p>Content for Tab 3 goes here</p>
      </template>
    </h-tabs>
  </div>
</template>

<script>
import HTabs from "@/components/HTabs.vue";
export default {
  name: "Tabs",
  components: {
    HTabs
  }
};
</script>
<style scoped>
.tabs-example {
  width: 500px;
}
</style>
