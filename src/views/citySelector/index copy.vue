<template>
  <div>
    <button @click="show = true">选择城市</button>
    <div v-if="show" class="dialog">
      <CitySelector @select="onSelectCity" />
    </div>
    <p>当前选择：{{ selectedCity }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CitySelector from './citySelector.vue';

const selectedCity = ref('');
const show = ref(false);

function onSelectCity(city) {
  selectedCity.value = city;
  show.value = false;
}
</script>
