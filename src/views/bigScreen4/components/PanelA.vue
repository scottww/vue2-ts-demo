<template>
  <div class="module">
    <h3>{{ title }}</h3>
    <p>这里是{{ title }}的内容</p>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.module {
  font-size: 16px;
}
</style>