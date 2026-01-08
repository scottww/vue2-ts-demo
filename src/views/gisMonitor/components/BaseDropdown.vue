<template>
  <div class="district-menu">
    <!-- 顶部导航 -->
    <div class="menu-header">
      <div class="breadcrumb-wrapper">
        <span class="location-label">
          <PngHoverIcon :src="locateIcon" width="14"></PngHoverIcon
          >当前位置：</span
        >
        <span class="breadcrumb">{{ defaultProvince }}</span>
        <template v-if="selectedCity">
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb" @click="selectedDistrict = null">{{
            selectedCity
          }}</span>
        </template>
        <template v-if="selectedDistrict">
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb active">{{ selectedDistrict.name }}</span>
        </template>
      </div>
      <span class="close-btn" @click="onCancel">✕</span>
    </div>

    <!-- 城市列表 -->
    <div class="district-list">
      <div
        class="district-item"
        v-for="c in cities"
        :key="c.name"
        :class="{ active: selectedCity === c.name }"
        @click="selectCity(c.name)"
      >
        {{ c.name }}
      </div>
    </div>

    <!-- 分隔横线 -->
    <div class="header-divider" v-if="selectedCity"></div>

    <!-- 区县列表 -->
    <div class="district-list" v-if="districts.length">
      <div
        class="district-item"
        v-for="d in districts"
        :key="d.name"
        :class="{ active: selectedDistrict === d.name }"
        @click="selectDistrict(d)"
      >
        {{ d.name }}
      </div>
    </div>

    <!-- 操作按钮 -->
    <!-- <div class="menu-footer" v-if="selectedCity && selectedDistrict">
      <button class="btn confirm" @click="onConfirm">确定</button>
      <button class="btn cancel" @click="onCancel">取消</button>
    </div> -->

    <!-- 确定 / 取消按钮 -->
    <div class="menu-footer">
      <button class="btn confirm" @click="onConfirm">确定</button>
      <button class="btn cancel" @click="onCancel">取消</button>
    </div>
  </div>
</template>

<script>
import PngHoverIcon from "./PngHoverIcon.vue";
import { ZHEJIANG_DISTRICTS } from "./zhejiang";

export default {
  components: { PngHoverIcon },
  name: "BaseDropdown",
  props: {
    defaultProvince: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      locateIcon: require("@/assets/images/oneMap/location2.png"),
      selectedCity: null,
      selectedDistrict: null,
      data: [ZHEJIANG_DISTRICTS],
    };
  },
  computed: {
    cities() {
      const province = this.data.find((p) => p.name === this.defaultProvince);
      return province ? province.cities : [];
    },
    districts() {
      const city = this.cities.find((c) => c.name === this.selectedCity);
      return city ? city.districts : [];
    },
  },
  methods: {
    selectCity(name) {
      this.selectedCity = name;
      this.selectedDistrict = null;
    },
    selectDistrict(district) {
      console.log("selectDistrict ...", district);
      this.selectedDistrict = district;
    },
    onConfirm() {
      // const districtName = this.selectedDistrict
      //   ? this.selectedDistrict.name
      //   : null;
      // const longitude = this.selectedDistrict
      //   ? this.selectedDistrict.longitude
      //   : null;
      // const latitude = this.selectedDistrict
      //   ? this.selectedDistrict.latitude
      //   : null;
      // this.$emit("select", {
      //   province: this.defaultProvince,
      //   city: this.selectedCity,
      //   district: districtName,
      //   longitude,
      //   latitude
      // });
      // 选中的区县或市
      const district = this.selectedDistrict;
      const city = this.cities.find((c) => c.name === this.selectedCity);

      // 名称
      const districtName = district ? district.name : null;
      const cityName = this.selectedCity;

      // 经纬度优先区县，其次市
      const longitude =
        district && district.longitude != null
          ? district.longitude
          : city && city.longitude != null
          ? city.longitude
          : null;

      const latitude =
        district && district.latitude != null
          ? district.latitude
          : city && city.latitude != null
          ? city.latitude
          : null;

      let zoomLevel;
      if (district) {
        zoomLevel = 12;
      } else if (city) {
        zoomLevel = 10;
      } else {
        zoomLevel = 7;
      }

      this.$emit("select", {
        province: this.defaultProvince,
        city: cityName,
        district: districtName,
        longitude,
        latitude,
        zoomLevel
      });
    },
    onCancel() {
      this.$emit("close");
      this.selectedCity = null;
      this.selectedDistrict = null;
    },
  },
};
</script>

<style scoped>
.district-menu {
  background: #fff;
  /* 一行5个 */
  min-width: 370px;
  /* padding: 10px; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); */
  border-radius: 6px;
}

/* 顶部面包屑导航 */
.menu-header {
  height: 40px;
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 6px;
}

.breadcrumb-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.location-label {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  color: #333;
  /* margin-right: 4px; */
  gap: 4px; /* 图标和文字之间的间距，可根据实际调整 */
}

.breadcrumb {
  color: #1890ff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb:hover {
  text-decoration: underline;
}

.breadcrumb.active {
  font-weight: bold;
  color: #000;
  cursor: default;
}

.breadcrumb-separator {
  color: #999;
  user-select: none;
}

.close-btn {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  padding: 0 6px;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #f5222d;
}

/* 横线分隔条样式 */
.header-divider {
  border-top: 1px solid #e8e8e8;
  margin: 8px 0 12px;
}

/* 城市和区县列表 */
.district-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.district-item {
  padding: 6px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.district-item:hover {
  background: #e6f7ff;
  color: #1890ff;
}

.district-item.active {
  background: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
}

/* 操作按钮区域 */
.menu-footer {
  text-align: right;
  margin-top: 18px;
}

.btn {
  padding: 4px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
}

.confirm {
  background-color: #1890ff;
  color: white;
}

.cancel {
  background-color: #f5f5f5;
}
</style>
