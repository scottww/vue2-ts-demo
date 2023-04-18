<template>
  <div class="skeleton">
    <!-- {{ loadingTime }}秒后加载 -->
    <div v-for="item in lists" :key="`card-${item.id}`">
      <div class="card">
        <div class="card-image">
          <img :src="item.img" alt="img" />
        </div>
        <div class="card-content">
          <h4>{{ item.name }}</h4>
          <div class="card-content__description">{{ item.description }}</div>
        </div>
      </div>
      <div class="card loading">
        <div class="card-image"></div>
        <div class="card-content">
          <h4></h4>
          <div class="card-content__description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skeleton",
  data() {
    return {
      loadingTime: 5,
      lists: [
        {
          id: 0,
          img: require("@/assets/img.png"),
          name: "CSS",
          description:
            "层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。"
        },
        {
          id: 1,
          img: require("@/assets/img.png"),
          name: "CSS",
          description:
            "层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。"
        },
        {
          id: 2,
          img: require("@/assets/img.png"),
          name: "CSS",
          description:
            "层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。"
        },
        {
          id: 3,
          img: require("@/assets/img.png"),
          name: "CSS",
          description:
            "层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。"
        }
      ]
    };
  },
  mounted() {
    const cardList = document.querySelectorAll(".card");
    console.log(cardList);
    setTimeout(() => {
      cardList.forEach((i) => {
        if (i.className === "card") {
          i.style.display = "block";
        }
        if (i.className === "card loading") {
          i.style.display = "none";
        }
      });
    }, this.loadingTime * 1000);
  }
};
</script>

<style lang="scss" scoped>
$loadingGrey: #ededed;
.skeleton {
  background-color: #f6f6f6;
  font-family: Helvetica;
  font-size: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
}
.card {
  display: none;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
}
.card.loading {
  display: block;
}
.card-image {
  height: 200px;
}
.card-image img {
  display: block;
  width: 100%;
  height: inherit;
  object-fit: cover;
}
.card-content {
  padding: 2rem 1.8rem;
}
h4 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
}
.card-content__description {
  font-size: 1rem;
  line-height: 1.4rem;
}

.loading .card-image,
.loading h4,
.loading .card-content__description {
  background-color: $loadingGrey;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    $loadingGrey;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.loading h4 {
  min-height: 1.6rem;
  border-radius: 4px;
  animation-delay: 0.05s;
}
.loading .card-content__description {
  min-height: 4rem;
  border-radius: 4px;
  animation-delay: 0.06s;
}
</style>
