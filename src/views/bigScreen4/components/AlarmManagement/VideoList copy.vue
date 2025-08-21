<template>
  <div class="video-link-container">
    <div class="video-card-grid">
      <div v-for="(item, index) in videoItems" :key="index" class="video-card">
        <div class="video-card-inner">
          <div class="video-bg-container">
            <img :src="item.bgImage" alt="视频背景" class="video-bg" />
            <div class="play-button-container" @click="handlePlay(item.id)">
              <div class="play-button">
                <i class="play-icon"></i>
              </div>
            </div>
          </div>
          <div class="alarm-info">
            <p class="alarm-text">{{ item.alarmText }}</p>
            <p class="alarm-time">{{ item.alarmTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgImg from "@/assets/bigScreen/pumpOperation/video_bg.png";
export default {
  name: "VideoLink",
  data() {
    return {
      videoItems: [
        {
          id: 1,
          bgImage: bgImg,
          alarmText: "报警内容内容内容内容内容",
          alarmTime: "2025-07-23 16:00:00"
        },
        {
          id: 2,
          bgImage: bgImg,
          alarmText: "报警内容内容内容内容内容",
          alarmTime: "2025-07-23 16:00:00"
        },
        {
          id: 3,
          bgImage: bgImg,
          alarmText: "报警内容内容内容内容内容",
          alarmTime: "2025-07-23 16:00:00"
        },
        {
          id: 4,
          bgImage: bgImg,
          alarmText: "报警内容内容内容内容内容",
          alarmTime: "2025-07-23 16:00:00"
        },
        {
          id: 5,
          bgImage: bgImg,
          alarmText: "报警内容内容内容内容内容",
          alarmTime: "2025-07-23 16:00:00"
        }
        // 可以根据需要添加更多项
      ]
    };
  },
  methods: {
    handlePlay(id) {
      console.log(`播放视频 ${id}`);
      // 这里可以添加实际播放视频的逻辑
      Vue.prototype.$message &&
        Vue.prototype.$message.info(`正在播放视频 ${id}`);
    }
  }
};
</script>

<style scoped>
/* 容器样式 */
.video-link-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #0f172a;
  overflow: auto;
}

/* 网格布局 */
.video-card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  min-height: 100%;
}

/* 卡片样式 */
.video-card {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.video-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 背景图容器 */
.video-bg-container {
  position: relative;
  width: 100%;
  height: 150px; /* 背景图高度 */
  overflow: hidden;
}

/* 背景图样式 */
.video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.video-card:hover .video-bg {
  filter: brightness(0.7);
}

/* 播放按钮容器 */
.play-button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* 播放按钮样式 */
.play-button {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.play-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

/* 播放图标 */
.play-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 18px;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.9);
  margin-left: 2px;
}

/* 报警信息样式 */
.alarm-info {
  padding: 12px;
  background-color: rgba(15, 23, 42, 0.8);
  color: white;
}

.alarm-text {
  font-size: 14px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.alarm-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* 响应式调整 */
@media screen and (max-width: 1200px) {
  .video-card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 992px) {
  .video-card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .video-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 576px) {
  .video-card-grid {
    grid-template-columns: 1fr;
  }
}
</style>