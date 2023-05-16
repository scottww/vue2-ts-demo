<template>
  <div class="categorys">
    <div v-for="(category, index) in categorys" :key="index">
      <div class="categorys__title">{{ category.name }}</div>
      <div class="categorys__list" v-if="hasItems(category)">
        <ul>
          <li
            class="list-item"
            v-for="(item, idx) in category.items"
            :key="idx"
          >
            <a :href="item.path">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "HCategorys"
})
export default class HCategorys extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  public data!: any[];
  private categorys = this.data;
  //计算属性
  // get categorys1() {
  //   return this.data;
  // }

  hasItems(category: { items: [] | any[] }) {
    return category.items ? (category.items.length ? true : false) : false;
  }
}
</script>

<style lang="scss" scoped>
.categorys {
  width: 240px;
}
.categorys__title {
  font-size: 12px;
  color: #999;
  line-height: 26px;
  margin-top: 15px;
}
.categorys__list {
  .list-item {
    a {
      font-size: 14px;
      color: #333;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
      font-weight: 400;
      &.active {
      }
      &:hover {
        color: var(--theme-color);
      }
    }
  }
}
// a {
//   color: var(--theme-color);
//   text-decoration: none;
// }
</style>
