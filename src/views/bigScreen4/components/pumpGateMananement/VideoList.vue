<template>
  <div class="video-monitor-container">
    <div class="video-grid">
      <div v-for="(video, index) in videoList" :key="index" class="video-item">
        <div class="video-bg-container">
          <img :src="video.bgImage" alt="视频背景" class="video-bg" />
          <div class="play-button-container" @click="playVideo(index)">
            <div class="play-button">
              <i class="play-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgImg from "@/assets/bigScreen/pumpOperation/video_bg.png";
import play from "@/assets/bigScreen/pumpOperation/play.png";
export default {
  name: "VideoMonitor",
  data() {
    return {
      videoList: [
        {
          id: 1,
          bgImage: bgImg,
          videoUrl: "path/to/video1.mp4"
        },
        {
          id: 2,
          bgImage: bgImg,
          videoUrl: "path/to/video2.mp4"
        },
        {
          id: 3,
          bgImage: bgImg,
          videoUrl: "path/to/video3.mp4"
        },
        {
          id: 4,
          bgImage: bgImg,
          videoUrl: "path/to/video4.mp4"
        },
        {
          id: 5,
          bgImage: bgImg,
          videoUrl: "path/to/video1.mp4"
        },
        {
          id: 6,
          bgImage: bgImg,
          videoUrl: "path/to/video2.mp4"
        },
        {
          id: 7,
          bgImage: bgImg,
          videoUrl: "path/to/video3.mp4"
        },
        {
          id: 8,
          bgImage: bgImg,
          videoUrl: "path/to/video4.mp4"
        }
      ]
    };
  },
  methods: {
    // 播放视频方法
    playVideo(index) {
      const video = this.videos[index];
      console.log(`播放视频 ${video.id}: ${video.videoUrl}`);
      // 这里可以添加实际播放视频的逻辑
      // 例如打开模态框播放视频或跳转到视频播放页面
      Vue.prototype.$message &&
        Vue.prototype.$message.info(`正在播放视频 ${video.id}`);
    }
  }
};
</script>

<style scoped>
/* 容器样式 */
.video-monitor-container {
  width: 100%;
  height: 100%;
  /* background-color: #0f172a; */
  padding: 20px;
  box-sizing: border-box;
  overflow: auto; /* 添加这一行，启用滚动条 */
}

/* 网格布局 */
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  min-height: 100%; /* 将 height: 100% 改为 min-height: 100% */
}

/* 视频项样式 */
.video-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

/* 背景图容器 */
.video-bg-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 背景图样式 */
.video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.video-item:hover .video-bg {
  filter: brightness(0.7);
}

/* 播放按钮容器 */
.play-button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* 播放按钮样式 */
.play-button {
  width: 60px;
  height: 60px;
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
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 25px solid white;
  margin-left: 5px;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  .play-button-container {
    width: 60px;
    height: 60px;
  }

  .play-button {
    width: 40px;
    height: 40px;
  }

  .play-icon {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 18px solid white;
  }
}
</style>