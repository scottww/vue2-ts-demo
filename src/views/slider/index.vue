<template>
  <div class="slider-demo">
    <div class="container">
      <div class="left-panel">
        <div class="top">
          <div class="btn-change">
            <el-button-group v-model="currentBtnValue">
              <el-button
                v-for="(item, index) in btnList"
                :type="currentBtnValue === item.value ? 'primary' : ''"
                size="mini"
                :key="`btn-${index}`"
                @click="changeBtn(item)"
                >{{ item.text }}</el-button
              >
            </el-button-group>
          </div>
          <el-slider
            v-model="sliderValue"
            :min="0"
            :max="totalTime"
            :step="1"
            :show-tooltip="false"
            @change="handleSliderChange"
          ></el-slider>
          <p>{{ currentTime }}</p>
          <el-button
            size="mini"
            @click="firstFrame"
            :disabled="sliderValue === 0"
            >第一帧</el-button
          >
          <el-button
            size="mini"
            @click="prevFrame"
            :disabled="sliderValue === 0"
            >上一帧</el-button
          >
          <el-button
            size="mini"
            @click="nextFrame"
            :disabled="sliderValue === totalTime"
            >下一帧</el-button
          >
          <el-button
            size="mini"
            @click="lastFrame"
            :disabled="sliderValue === totalTime"
            >最后一帧</el-button
          >
          <el-button size="mini" @click="togglePlay">{{
            playing ? "暂停" : "播放"
          }}</el-button>
        </div>
        <div class="bottom">
          <div class="imageBlock">
            <img src="@/assets/slider/1.png" alt="png" />
          </div>
        </div>
      </div>

      <div class="right-panel">
        <ul>
          <li
            v-for="(item, index) in timeList"
            :key="index"
            :class="{ active: currentSegment === index }"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { Slider, Button } from 'element-ui';

export default {
  // components: {
  //   'el-slider': Slider,
  //   'el-button': Button
  // },
  data() {
    return {
      totalTime: 100, // 总时间，单位可以根据需要调整
      sliderValue: 0, // 滑块当前值
      numDivisions: 10, // 将滑块分割为10等份
      playing: false, // 播放状态
      currentSegment: 0, // 当前播放的时间段
      currentBtnValue: 1,
      btnList: [
        {
          text: "1小时降雨量",
          value: 1
        },
        {
          text: "6小时降雨量",
          value: 6
        },
        {
          text: "12小时降雨量",
          value: 12
        },
        {
          text: "24小时降雨量",
          value: 24
        }
      ],
      timeList: [
        {
          value: "05-21 08:00"
        },
        {
          value: "05-21 09:00"
        },
        {
          value: "05-21 10:00"
        },
        {
          value: "05-21 11:00"
        },
        {
          value: "05-21 12:00"
        },
        {
          value: "05-21 13:00"
        },
        {
          value: "05-21 14:00"
        },
        {
          value: "05-21 15:00"
        },
        {
          value: "05-21 16:00"
        },
        {
          value: "05-21 17:00"
        },
        {
          value: "05-21 18:00"
        }
      ]
    };
  },
  computed: {
    currentTime() {
      // 计算当前时间，可以根据需要将滑块的值转换成实际的时间格式
      return this.sliderValue;
    }
  },
  methods: {
    changeBtn(item) {
      console.log("changeBtn ...", item);
      this.currentBtnValue = item.value;
    },
    handleSliderChange(value) {
      console.log("handleSliderChange ...", value);
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
      }, 500); // (this.totalTime / this.numDivisions) * 1000根据时间段长度计算延迟时间
    },
    togglePlay() {
      // 切换播放状态
      this.playing = !this.playing;
      if (this.playing) {
        this.playSegment(this.currentSegment);
      }
    },
    firstFrame() {
      console.log("firstFrame ...", this);
      this.playing = false;
      // 跳转到第一帧
      this.sliderValue = 0;
      this.currentSegment = 0;
    },
    lastFrame() {
      this.playing = false;
      // 跳转到最后一帧
      this.sliderValue = this.totalTime;
      this.currentSegment = this.numDivisions;
    },
    prevFrame() {
      this.playing = false;
      // 上一针操作
      if (this.sliderValue > 0) {
        this.sliderValue -= this.totalTime / this.numDivisions;
        this.currentSegment -= 1;
      }
    },
    nextFrame() {
      this.playing = false;
      // 下一针操作
      if (this.sliderValue < this.totalTime) {
        this.sliderValue += this.totalTime / this.numDivisions;
        this.currentSegment += 1;
      }
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

<style lang="scss" scoped>
.slider-demo {
  .container {
    display: flex;
  }
  .left-panel {
    flex: 7;
    padding: 0 10px;
    .top {
      border-bottom: 1px solid #ddd;
      padding: 10px;
    }
    .bottom {
      //图片区
      .imageBlock img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
  .right-panel {
    flex: 3;
    li {
      border-bottom: 1px solid #ddd;
      padding: 4px 0;
      cursor: pointer;
      &:hover {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }

  .active {
    background-color: #1890ff;
    color: #fff;
  }
}
</style>
