<!-- components/MySvg.vue -->
<template>
  <i class="mySvg" :class="name"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
