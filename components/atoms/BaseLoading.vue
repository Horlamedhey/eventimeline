<template>
  <div class="loadingio-spinner-eclipse-434wf2pon3a">
    <div class="ldio-qsi76kw0mz9">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
}
</script>

<style lang="scss" scoped>
@keyframes ldio-qsi76kw0mz9 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loadingio-spinner-eclipse-434wf2pon3a {
  width: 30px;
  height: 30px;
  display: inline-block;
  overflow: hidden;
  background: #fff;
}
.ldio-qsi76kw0mz9 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.3);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */

  div {
    box-sizing: content-box;
    position: absolute;
    animation: ldio-qsi76kw0mz9 0.5s linear infinite;
    width: 80px;
    height: 80px;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    box-shadow: 0 5px 0 0 #4d31bf;
    transform-origin: 40px 41px;
  }
}
</style>
