<template>
  <div class="css-demo flex-v-h">
    <div class="css-demo__box flex-v-h rotate">
      <span>字</span>
    </div>
    <div class="css-demo__box flex-v-h"><span>字</span></div>
    <!-- backdrop-filter -->
    <div class="css-demo__box flex-v-h"><span>opacity</span></div>
    <div class="css-demo__box flex-v-h"><span>filter</span></div>
    <div class="css-demo__box flex-v-h"><span>backdrop-filter</span></div>
  </div>
</template>

<style scoped>
.css-demo {
  background: #fff;
  padding: 20px;
  border: 1px dashed #666;
  /* background: url('https://picsum.photos/500/300') no-repeat center/cover; */
  background: url("~@/assets/300.jpg") no-repeat center/cover;
}
.css-demo__box {
  width: 100px;
  height: 50px;
  /* background-color: red; */
  margin: 10px;
  /* border-radius: 50%; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.rotate {
  animation: rotate 2s linear infinite;
}

span {
  font-size: 20px;
}

.flex-v-h {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.css-demo__box:nth-child(1) {
  background-color: red;
}

.css-demo__box:nth-child(2) {
  background-color: orange;
}

.css-demo__box:nth-child(3) {
  /* background-color: green; */
  /* background: rgba(0, 0, 0, 0.5); */
  width: 200px;
}

.css-demo__box:nth-child(4) {
  /* background-color: yellow; */
  filter: blur(10px);
  width: 200px;
}

.css-demo__box:nth-child(5) {
  /* background-color: purple; */
  backdrop-filter: blur(10px);
  width: 200px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>