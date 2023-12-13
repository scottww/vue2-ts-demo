<template>
    <div>
      <MyTextArea
        id="myTextArea"
        label="My Text Area"
        v-model="textAreaValue"
        placeholder="Enter text here..."
      />
      <p>Text Area Value: {{ textAreaValue }}</p>
    </div>
  </template>
  
  <script>
  import MyTextArea from '@/components/re-antdv/ATextArea.vue';
  
  export default {
    components: {
      MyTextArea,
    },
    data() {
      return {
        textAreaValue: '',
      };
    },
  };
  </script>
  