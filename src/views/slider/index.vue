<template>
  <div>
    <el-slider
      v-model="sliderValue"
      :min="0"
      :max="totalTime"
      :step="1"
      :show-tooltip="false"
      @change="handleSliderChange"
    ></el-slider>
    <p>{{ currentTime }}</p>
    <el-button @click="toFirst" :disabled="sliderValue === 0">first</el-button>
    <el-button @click="prevFrame" :disabled="sliderValue === 0">prev</el-button>
    <el-button @click="nextFrame" :disabled="sliderValue === totalTime"
      >next</el-button
    >
    <el-button @click="toLast" :disabled="sliderValue === 100">last</el-button>
    <el-button @click="togglePlay">{{ playing ? "暂停" : "播放" }}</el-button>
  </div>
</template>

<script>
import { Slider, Button } from "element-ui";

export default {
  components: {
    "el-slider": Slider,
    "el-button": Button
  },
  data() {
    return {
      totalTime: 100, // 总时间，单位可以根据需要调整
      sliderValue: 0, // 滑块当前值
      numDivisions: 10, // 将滑块分割为10等份
      playing: false, // 播放状态
      currentSegment: 0 // 当前播放的时间段
    };
  },
  computed: {
    currentTime() {
      // 计算当前时间，可以根据需要将滑块的值转换成实际的时间格式
      return this.sliderValue;
    }
  },
  methods: {
    handleSliderChange(value) {
      // 计算当前播放的时间段
      this.currentSegment = Math.floor(
        value / (this.totalTime / this.numDivisions)
      );
      // 可以在这里触发播放操作
      if (this.playing) {
        this.playSegment(this.currentSegment);
      }
    },
    playSegment(segment) {
      // 在每个时间段结束后自动播放下一个时间段
      setTimeout(() => {
        if (segment < this.numDivisions) {
          this.sliderValue =
            (segment + 1) * (this.totalTime / this.numDivisions);
          if (this.playing) {
            this.playSegment(segment + 1);
          }
        }
      }, 500); // this.totalTime / this.numDivisions) * 1000根据时间段长度计算延迟时间
    },
    togglePlay() {
      // 切换播放状态
      this.playing = !this.playing;
      if (this.playing) {
        this.playSegment(this.currentSegment);
      }
    },
    prevFrame() {
      // 上一针操作
      this.playing = false;
      if (this.sliderValue > 0) {
        this.sliderValue -= this.totalTime / this.numDivisions;
        this.currentSegment -= 1;
      }
    },
    nextFrame() {
      // 下一针操作
      this.playing = false;
      if (this.sliderValue < this.totalTime) {
        this.sliderValue += this.totalTime / this.numDivisions;
        this.currentSegment += 1;
      }
    },
    toFirst() {
      this.playing = false;
      this.sliderValue = 0;
    },
    toLast() {
      this.playing = false;
      this.sliderValue = 100;
    }
  },
  mounted() {
    // 初始化时播放第一个时间段
    if (this.playing) {
      this.playSegment(this.currentSegment);
    }
  }
};
</script>

<style scoped>
/* 在这里添加自定义样式 */
</style>
