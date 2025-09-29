<template>
  <div class="album-masonry">
    <!-- 控制列数的响应式容器 -->
    <div class="masonry" :style="{ columnCount: columnCount }">
      <div
        class="masonry-item"
        v-for="(img, idx) in images"
        :key="img.id || idx"
        @click="openPreview(idx)"
      >
        <img
          :src="img.thumb || img.src"
          :alt="img.alt || 'image ' + idx"
          loading="lazy"
          @load="onImgLoad($event, idx)"
          draggable="false"
        />
      </div>
    </div>

    <!-- 预览模态 -->
    <div
      v-if="previewVisible"
      class="preview-overlay"
      @click.self="closePreview"
    >
      <div class="preview-box" :class="{ zoomed: zoomed }">
        <button class="close-btn" @click="closePreview" title="关闭">✕</button>

        <button
          class="nav-btn prev"
          @click.stop="prev"
          :disabled="isFirst"
          title="上一张"
        >
          ‹
        </button>
        <button
          class="nav-btn next"
          @click.stop="next"
          :disabled="isLast"
          title="下一张"
        >
          ›
        </button>

        <div class="preview-inner">
          <img
            :src="currentImage.full || currentImage.src"
            :alt="currentImage.alt || 'preview'"
            @dblclick="toggleZoom"
            @load="onPreviewLoad"
            draggable="false"
            ref="previewImg"
          />
          <div class="meta">
            <span class="index"
              >{{ currentIndex + 1 }} / {{ images.length }}</span
            >
            <span class="caption">{{
              currentImage.caption || currentImage.alt || ""
            }}</span>
          </div>
        </div>

        <div class="preview-actions">
          <button @click="toggleZoom" title="放大/缩小">
            {{ zoomed ? "还原" : "放大" }}
          </button>
          <button @click="downloadCurrent" title="下载">下载</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumMasonry",
  props: {
    images: {
      type: Array,
      required: true
      // 每项结构建议：{ src:'full.jpg', thumb:'thumb.jpg', alt:'...', caption:'...' }
    },
    // 可选：在不同宽度下显示的列数（默认响应式）
    columns: {
      type: Object,
      default: () => ({ default: 4, 1200: 4, 900: 3, 600: 2, 0: 1 })
    }
  },
  data() {
    return {
      previewVisible: false,
      currentIndex: 0,
      zoomed: false,
      loaded: {}
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex] || {};
    },
    isFirst() {
      return this.currentIndex <= 0;
    },
    isLast() {
      return this.currentIndex >= this.images.length - 1;
    },
    columnCount() {
      // 基于窗口宽度从 columns prop 中选择列数
      const w = window.innerWidth;
      const breakpoints = Object.keys(this.columns)
        .map((k) => parseInt(k))
        .sort((a, b) => b - a);
      for (let bp of breakpoints) {
        if (w >= bp) return this.columns[bp];
      }
      return this.columns.default || 3;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("keydown", this.onKey);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("keydown", this.onKey);
  },
  methods: {
    openPreview(idx) {
      this.currentIndex = idx;
      this.previewVisible = true;
      this.zoomed = false;
      // 尝试预加载 full 图（如果提供）
      const full =
        this.images[idx] && (this.images[idx].full || this.images[idx].src);
      if (full) {
        const img = new Image();
        img.src = full;
      }
      document.body.style.overflow = "hidden";
    },
    closePreview() {
      this.previewVisible = false;
      this.zoomed = false;
      document.body.style.overflow = "";
    },
    next() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.zoomed = false;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.zoomed = false;
      }
    },
    toggleZoom() {
      this.zoomed = !this.zoomed;
      if (this.zoomed) {
        // 点击放大时让图片居中
        this.$nextTick(() => {
          const img = this.$refs.previewImg;
          if (img) img.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    },
    onKey(e) {
      if (!this.previewVisible) return;
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "Escape") this.closePreview();
    },
    onResize() {
      // 触发 columnCount 重新计算
      this.$forceUpdate();
    },
    downloadCurrent() {
      const url = this.currentImage.full || this.currentImage.src;
      if (!url) return;
      // 通过创建 a 下载
      const a = document.createElement("a");
      a.href = url;
      a.download = (
        this.currentImage.alt || `image-${this.currentIndex + 1}`
      ).replace(/\s+/g, "-");
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    onImgLoad(e, idx) {
      // 可用于占位 / 动画控制
      this.$set(this.loaded, idx, true);
    },
    onPreviewLoad() {
      // 可加入 loading spinner 支持
    }
  }
};
</script>

<style scoped>
.album-masonry {
  width: 100%;
  box-sizing: border-box;
}

/* 瀑布流容器：用 CSS columns 实现 */
.masonry {
  column-gap: 16px;
  /* column-count 由内联 style 控制 */
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #f5f5f5;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.masonry-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.masonry-item img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  user-select: none;
}

.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(4px);
}

.preview-box {
  position: relative;
  max-width: 95%;
  max-height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-inner {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-inner img {
  max-width: 100%;
  max-height: 80vh;
  transition: transform 0.25s ease;
  border-radius: 8px;
  cursor: grab;
  box-shadow: 0 10px 40px rgba(0,0,0,0.6);
}

.preview-box.zoomed img {
  transform: scale(2);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.45);
  border: none;
  color: white;
  font-size: 36px;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 5;
}
.nav-btn:hover { background: rgba(0,0,0,0.7); }
.nav-btn.prev { left: -12px; }
.nav-btn.next { right: -12px; }
.nav-btn[disabled] { opacity: 0.35; cursor: default; }

.close-btn {
  position: absolute;
  top: -12px;
  right: -12px;
  background: rgba(255,255,255,0.9);
  color: #333;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.meta {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #eee;
  font-size: 14px;
  line-height: 1.4;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}

.preview-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.preview-actions button {
  background: rgba(0,0,0,0.45);
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.preview-actions button:hover { background: rgba(0,0,0,0.7); }

/* 响应式 */
@media (max-width: 640px) {
  .nav-btn { font-size: 28px; padding: 8px; }
  .close-btn { width: 30px; height: 30px; font-size: 16px; }
  .preview-inner img { max-height: 70vh; }
}

</style>
