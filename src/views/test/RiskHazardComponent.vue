<template>
  <div class="risk-hazard-container">
    <!-- 背景Canvas -->
    <canvas ref="backgroundCanvas" class="background-canvas"></canvas>

    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="dropdown" @click="toggleDropdown">
        <span class="dropdown-text">{{ currentYear }}年</span>
        <div class="dropdown-arrow"></div>
        <div class="dropdown-menu" v-if="isDropdownOpen">
          <div v-for="year in years" :key="year"
               class="dropdown-item" @click="selectYear(year)">{{ year }}年</div>
        </div>
      </div>
    </div>

    <!-- 数据显示层 -->
    <div class="data-layer">
      <div class="hazard-count">隐患总数: {{ totalHazards }}</div>
      <!-- 分类数据 -->
      <div class="categories-container">
        <div v-for="(category, index) in categories" :key="index" class="category-item">
          <div class="category-name">{{ category.name }}</div>
          <div class="category-value">{{ category.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RiskHazardComponent',
  data() {
    return {
      years: [2025, 2024, 2023],
      currentYear: 2025,
      isDropdownOpen: false,
      totalHazards: 65,
      hazardData: {
        '2025': 65,
        '2024': 53,
        '2023': 45,
      },
      categories: [
        { name: '设备设施', value: 17, color: '#FFB74D' },
        { name: '消防安全', value: 6, color: '#4DD0E1' },
        { name: '安全防护', value: 2, color: '#4DB6AC' },
        { name: '工程实体', value: 5, color: '#BA68C8' },
        { name: '巡查信息', value: 29, color: '#64B5F6' },
        { name: '其他类型', value: 6, color: '#90CAF9' }
      ],
      particles: [],
      animationId: null,
      dotPositions: []
    };
  },
  mounted() {
    // 初始化Canvas
    this.initCanvas();
    // 加载数据
    this.loadHazardData();
  },
  beforeDestroy() {
    // 销毁动画
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectYear(year) {
      this.currentYear = year;
      this.isDropdownOpen = false;
      this.loadHazardData();
    },
    loadHazardData() {
      // 模拟API调用
      setTimeout(() => {
        this.totalHazards = this.hazardData[this.currentYear] || 0;
        // 更新粒子效果
        this.updateParticles();
      }, 500);
    },
    initCanvas() {
      const canvas = this.$refs.backgroundCanvas;
      const ctx = canvas.getContext('2d');
      

      // 设置Canvas尺寸
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        this.drawBackground();
      };
      

      // 监听窗口大小变化
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      

      // 初始化粒子
      this.initParticles();
      // 初始化圆点位置
      this.initDotPositions();
      // 开始动画
      this.animate();
    },
    initParticles() {
      this.particles = [];
      const particleCount = 300;
      

      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.$refs.backgroundCanvas.width,
          y: Math.random() * this.$refs.backgroundCanvas.height,
          radius: Math.random() * 1.5 + 0.5,
          color: `rgba(64, 201, 255, ${Math.random() * 0.5 + 0.1})`,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3
        });
      }
    },
    initDotPositions() {
      // 根据分类数据生成圆点位置
      this.dotPositions = [];
      const centerX = this.$refs.backgroundCanvas.width / 2;
      const centerY = this.$refs.backgroundCanvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.6;
      

      this.categories.forEach((category, index) => {
        const angle = (index / this.categories.length) * Math.PI * 2;
        this.dotPositions.push({
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          color: category.color,
          radius: 8 + Math.sqrt(category.value) * 2,
          pulse: Math.random() * Math.PI * 2
        });
      });
    },
    updateParticles() {
      // 根据隐患总数更新粒子效果
      const canvas = this.$refs.backgroundCanvas;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      

      this.particles.forEach(particle => {
        // 让粒子向中心聚集或扩散
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (this.totalHazards / 100) * 0.02;
        

        particle.speedX += dx * force / distance;
        particle.speedY += dy * force / distance;
        

        // 速度限制
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (speed > 0.5) {
          particle.speedX = (particle.speedX / speed) * 0.5;
          particle.speedY = (particle.speedY / speed) * 0.5;
        }
      });
    },
    drawBackground() {
      const canvas = this.$refs.backgroundCanvas;
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      

      // 绘制渐变背景
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 1.5
      );
      gradient.addColorStop(0, 'rgba(10, 25, 41, 0.8)');
      gradient.addColorStop(1, 'rgba(10, 25, 41, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      

      // 绘制粒子
      this.particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        

        // 更新粒子位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });
      

      // 绘制中心圆环
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(64, 201, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      

      // 绘制内部圆环
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(64, 201, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      

      // 绘制中心图标（简化版）
      ctx.fillStyle = 'rgba(64, 201, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(centerX - 10, centerY - 15);
      ctx.lineTo(centerX + 10, centerY - 15);
      ctx.lineTo(centerX + 10, centerY - 5);
      ctx.lineTo(centerX + 5, centerY - 5);
      ctx.lineTo(centerX + 5, centerY + 5);
      ctx.lineTo(centerX - 5, centerY + 5);
      ctx.lineTo(centerX - 5, centerY - 5);
      ctx.lineTo(centerX - 10, centerY - 5);
      ctx.closePath();
      ctx.fill();
      

      // 绘制顶部小灯
      ctx.beginPath();
      ctx.arc(centerX, centerY - 20, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 105, 180, 0.8)';
      ctx.fill();
      

      // 绘制彩色圆点
      this.dotPositions.forEach(dot => {
        dot.pulse += 0.05;
        const pulseFactor = Math.sin(dot.pulse) * 0.3 + 0.7;
        

        // 绘制外圈光晕
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * 1.5 * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}33`; // 添加透明度
        ctx.fill();
        

        // 绘制圆点
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });
      

      // 绘制连接线
      this.dotPositions.forEach((dot, index) => {
        const nextDot = this.dotPositions[(index + 1) % this.dotPositions.length];
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.quadraticCurveTo(centerX, centerY, nextDot.x, nextDot.y);
        ctx.strokeStyle = 'rgba(64, 201, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    },
    animate() {
      this.drawBackground();
      this.animationId = requestAnimationFrame(this.animate);
    }
  }
};
</script>

<style scoped>
.risk-hazard-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-color: #0a1929;
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
  font-family: 'Microsoft YaHei', sans-serif;
}

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.toolbar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  z-index: 20;
}

.dropdown {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(16, 55, 102, 0.7);
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #1e6bb8;
}

.dropdown-text {
  margin-right: 8px;
  font-size: 14px;
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
  transition: transform 0.3s ease;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background-color: rgba(16, 55, 102, 0.9);
  border: 1px solid #1e6bb8;
  border-radius: 4px;
  width: 100px;
  z-index: 20;
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(30, 107, 184, 0.5);
}

.data-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hazard-count {
  font-size: 28px;
  font-weight: bold;
  color: #40c9ff;
  text-shadow: 0 0 10px rgba(64, 201, 255, 0.7);
  margin-bottom: 20px;
}

.categories-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 15px;
  padding: 8px 12px;
  background-color: rgba(16, 55, 102, 0.5);
  border-radius: 4px;
  border: 1px solid rgba(30, 107, 184, 0.3);
  min-width: 100px;
}

.category-name {
  font-size: 14px;
  color: #8cb8e0;
  margin-bottom: 5px;
}

.category-value {
  font-size: 18px;
  font-weight: bold;
  color: #40c9ff;
}
</style>