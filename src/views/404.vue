<template>
  <div class="content">
    <h1 class="content__title">404</h1>
    <p class="content__text">Oops. 页面找不到了</p>
    <a href="/">返回首页</a>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.content {
  text-align: center;
  position: relative;
  z-index: 9999;
  padding: 0px 1px;
}
.content h1 {
  font-size: 150px;
  text-transform: uppercase;
  font-weight: bold;
  color: #293b49;
}
.content__title,
.content__text {
  animation-name: anim-text;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.content p {
  color: #909090;
  margin-top: 0;
  margin-bottom: 1rem;
}

.title {
  animation-delay: calc(2s + 4s * 0.2);
}

.content a {
  color: #0fcfa5;
}

@keyframes anim-text {
  0% {
    transform: translate3d(calc(-1 * 10px), 0, 0) scale3d(-1, -1, 1);
    -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
  }
  2% {
    -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }
  4% {
    -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }
  5% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  6% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  7% {
    -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  8% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
  9% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }
  9.9% {
    transform: translate3d(calc(-1 * 10px), 0, 0) scale3d(-1, -1, 1);
  }
  10%,
  100% {
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
}
</style>
