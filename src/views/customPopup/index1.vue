<template>
  <div class="custom-popup-demo">
    <button @click="showPopup">显示弹窗</button>
    
    <custom-popup 
      v-model="visible"
      title="自定义弹窗"
      :width="500"
      :height="300"
      :draggable="true"
      :mask="true"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div class="popup-content">
        这是弹窗的内容区域
      </div>
    </custom-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomPopup from './CustomPopup0.vue'

@Component({
  components: {
    CustomPopup
  }
})
export default class CustomPopupDemo extends Vue {
  private visible = false

  private showPopup(): void {
    this.visible = true
  }

  private handleConfirm(): void {
    console.log('点击了确认')
    this.visible = false
  }

  private handleCancel(): void {
    console.log('点击了取消')
    this.visible = false
  }
}
</script>

<style lang="scss" scoped>
.custom-popup-demo {
  padding: 20px;

  .popup-content {
    padding: 20px;
  }
}
</style>
