<template>
  <div class="hero-container">
    <!-- 粒子背景容器 -->
    <div id="particles-js"></div>

    <!-- 居中内容 -->
    <div class="text-content">
      <h1>Eula</h1>
      <h2>Genshin Impact</h2>
    </div>
  </div>
</template>

<script>
import "particles.js";

export default {
  name: "EulaHero",
  mounted() {
    // 初始化粒子背景
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#00ccff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          out_mode: "bounce"
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 }
        }
      },
      retina_detect: true
    });
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: fa-Coustard;
  src: url(../../assets/coustard/Coustard-Black.ttf);
}

.hero-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .text-content {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: fa-Coustard, sans-serif;

    h1 {
      font-size: 10vw;
      background-image: url("~@/assets/eula.png");
      background-size: cover;
      background-position: center;
      color: transparent;

      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      // ✨ 发光边框效果
      text-shadow:
        0 0 10px #00ccff,
        0 0 20px #00ccff,
        0 0 30px #00ccff;
      filter: drop-shadow(0 0 12px #00ccff);

      animation: scrollBackground 10s linear infinite;
    }

    h2 {
      font-size: 2rem;
      color: #ffffffcc;
      margin-top: 1rem;
    }
  }
}

@keyframes scrollBackground {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
