<template>
  <div class="district-menu">
    <!-- 顶部导航 -->
    <div class="menu-header">
      <div class="breadcrumb-wrapper">
        <span class="location-label">📍 当前位置：</span>
        <span class="breadcrumb">{{ defaultProvince }}</span>
        <template v-if="selectedCity">
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb" @click="selectedDistrict = ''">{{
            selectedCity
          }}</span>
        </template>
        <template v-if="selectedDistrict">
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb active">{{ selectedDistrict }}</span>
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

    <!-- 区县列表 -->
    <div class="district-list" v-if="districts.length">
      <div
        class="district-item"
        v-for="d in districts"
        :key="d"
        :class="{ active: selectedDistrict === d }"
        @click="selectDistrict(d)"
      >
        {{ d }}
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
export default {
  name: "BaseDropdown",
  props: {
    defaultProvince: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedCity: "",
      selectedDistrict: "",
      data: [
        {
          name: "浙江省",
          cities: [
            {
              name: "杭州市",
              districts: ["西湖区", "上城区", "拱墅区", "滨江区", "余杭区"]
            },
            {
              name: "宁波市",
              districts: ["海曙区", "鄞州区", "江北区"]
            },
            {
              name: "温州市",
              districts: ["鹿城区", "瓯海区", "龙湾区"]
            }
          ]
        }
      ]
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
    }
  },
  methods: {
    selectCity(name) {
      this.selectedCity = name;
      this.selectedDistrict = "";
    },
    selectDistrict(name) {
      this.selectedDistrict = name;
    },
    onConfirm() {
      this.$emit("select", {
        province: this.defaultProvince,
        city: this.selectedCity,
        district: this.selectedDistrict
      });
    },
    onCancel() {
      // this.$emit("cancel");
      this.selectedCity = "";
      this.selectedDistrict = "";
    }
  }
};
</script>

<style scoped>
.district-menu {
  background: #fff;
  min-width: 420px;
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
  font-weight: 500;
  color: #333;
  margin-right: 4px;
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
  margin-top: 8px;
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
