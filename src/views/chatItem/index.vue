<template>
  <div>
    <chat-item
      v-for="item in chatList"
      :key="item.id"
      :title="item.title"
    />
  </div>
</template>

<script>
import ChatItem from './ChatItem.vue';

export default {
  components: { ChatItem },
  data() {
    return {
      chatList: [
        { id: 1, title: '选项 1' },
        { id: 2, title: '选项 2' },
        { id: 3, title: '选项 3' },
      ]
    };
  }
};
</script>
