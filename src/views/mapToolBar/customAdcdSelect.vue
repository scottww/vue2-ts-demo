<template>
  <div class="custom-adcd-select">
    <el-row :gutter="10" class="">
      <el-form label-width="auto" label-position="left">
        <el-col :span="8">
          <el-form-item label="省:" style="margin-bottom: 0">
            <el-select
              v-model="selectedProvince"
              placeholder="选择省"
              @change="handleProvinceChange"
              size="mini"
              popper-class="custom-select-option"
            >
              <el-option
                v-for="province in provinces"
                :key="province.id"
                :label="province.fullName"
                :value="province.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="市:" style="margin-bottom: 0">
            <el-select
              v-model="selectedCity"
              placeholder="选择市"
              @change="handleCityChange"
              :disabled="!selectedProvince"
              size="mini"
              popper-class="custom-select-option"
            >
              <el-option
                v-for="city in cities"
                :key="city.id"
                :label="city.fullName"
                :value="city.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="区/县:" style="margin-bottom: 0">
            <el-select
              v-model="selectedCounty"
              placeholder="选择县"
              @change="handleCountyChange"
              :disabled="!selectedCity"
              size="mini"
              popper-class="custom-select-option"
            >
              <el-option
                v-for="county in counties"
                :key="county.id"
                :label="county.fullName"
                :value="county.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { PROVINCE, CITY, COUNTY } from "./data";
export default {
  data() {
    return {
      provinces: [...PROVINCE],
      cities: [...CITY],
      counties: [...COUNTY],
      selectedProvince: "33",
      selectedCity: null,
      selectedCounty: null
    };
  },
  methods: {
    handleProvinceChange(id) {
      this.selectedCity = null;
      this.selectedCounty = null;
      if (this.selectedProvince == "33") {
        this.cities = [...CITY];
      }
      console.log("findItem ...", findItem);
      const findItem = this.provinces.find(
        (i) => i.id == this.selectedProvince
      );
      // if (findItem) {
      //   this.mapToLocation(findItem);
      // }
      // this.getAdcdOptions(id);
      //
      if (this.selectedProvince != "33") {
        (this.cities = []), (this.counties = []);
      }
    },
    handleCityChange(id) {
      this.selectedCounty = null;
      if (this.selectedProvince == "3301") {
        this.counties = [...COUNTY];
      }
      const findItem = this.cities.find((i) => i.id == this.selectedCity);
      console.log("findItem ...", findItem);
      // if (findItem) {
      //   this.mapToLocation(findItem);
      // }
      // this.getAdcdOptions(id);
      if (this.selectedCity != "3301") {
        this.counties = [];
      }
    },
    handleCountyChange(id) {
      const findItem = this.cities.find((i) => i.id == this.selectedCounty);
      console.log("findItem ...", findItem);
      // if (findItem) {
      //   this.mapToLocation(findItem);
      // }
      // this.getAdcdOptions(id);
    },
    mapToLocation(item) {
      const { longitude, latitude, level } = item;
      if (!longitude || !latitude) {
        this.$message.warning("定位失败");
        return;
      }
      const zoomMap = {
        1: 7,
        2: 9,
        3: 11
      };
      const zoom = zoomMap[level];
      this.map.getView().animate({
        center: [longitude, latitude],
        zoom: zoom,
        duration: 1000 // 可选：动画持续时间（毫秒）
      });
    }
  }
};
</script>

<style lang="scss">
//下拉样式定制
.custom-select-option.el-select-dropdown {
  background-color: rgba(7, 88, 214, 0.8);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px 3px 3px 3px;
  border: none;
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.selected {
    color: #c8dbff;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #f5f7fa;
    background: #ffffff;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
    border-radius: 3px 3px 3px 3px;
    opacity: 0.8;
    color: #387eff;
  }
}
</style>
<style lang="scss" scoped>
//自定义区域
.custom-adcd-select {
  height: 60px;
  padding: 10px;
  background: linear-gradient(180deg, rgba(48, 157, 255, 0.8) 0%, #0758d6 100%);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
}

//自定义绘制区域
.custom-adcd-select ::v-deep {
  .el-form-item__label {
    color: #fff;
  }
  .el-input__inner {
    background-color: rgba(255, 255, 255, 0.8);
    color: #666;
  }
  .el-input__inner::placeholder {
    color: #999;
  }
  .el-input.is-disabled .el-input__inner::placeholder {
    color: #e6e6e6;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #94abca;
    color: #e6e6e6;
    border: none;
  }
  .el-input.is-disabled .el-input__icon {
    color: #e6e6e6;
  }
}
</style>