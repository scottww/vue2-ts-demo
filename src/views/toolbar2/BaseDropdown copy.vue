<template>
  <div class="base-dropdown">
    <select v-model="selectedProvince" @change="onProvinceChange">
      <option disabled value="">选择省</option>
      <option v-for="p in provinces" :key="p.name" :value="p.name">
        {{ p.name }}
      </option>
    </select>

    <select v-model="selectedCity" @change="onCityChange" v-if="cities.length">
      <option disabled value="">选择市</option>
      <option v-for="c in cities" :key="c.name" :value="c.name">
        {{ c.name }}
      </option>
    </select>

    <select v-model="selectedDistrict" @change="onFinalChange" v-if="districts.length">
      <option disabled value="">选择区</option>
      <option v-for="d in districts" :key="d" :value="d">
        {{ d }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  data() {
    return {
      selectedProvince: '',
      selectedCity: '',
      selectedDistrict: '',
      data: [
        {
          name: '河北省',
          cities: [
            {
              name: '石家庄市',
              districts: ['长安区', '桥西区', '裕华区']
            },
            {
              name: '保定市',
              districts: ['竞秀区', '莲池区', '涞水县']
            }
          ]
        },
        {
          name: '山东省',
          cities: [
            {
              name: '济南市',
              districts: ['历下区', '槐荫区', '市中区']
            },
            {
              name: '青岛市',
              districts: ['市南区', '李沧区', '城阳区']
            }
          ]
        }
      ]
    };
  },
  computed: {
    provinces() {
      return this.data;
    },
    cities() {
      const province = this.data.find(p => p.name === this.selectedProvince);
      return province ? province.cities : [];
    },
    districts() {
      const city = this.cities.find(c => c.name === this.selectedCity);
      return city ? city.districts : [];
    }
  },
  methods: {
    onProvinceChange() {
      this.selectedCity = '';
      this.selectedDistrict = '';
    },
    onCityChange() {
      this.selectedDistrict = '';
    },
    onFinalChange() {
      this.$emit('select', {
        province: this.selectedProvince,
        city: this.selectedCity,
        district: this.selectedDistrict
      });
    }
  }
};
</script>

<style scoped>
.base-dropdown {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 160px;
}
select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
}
</style>
