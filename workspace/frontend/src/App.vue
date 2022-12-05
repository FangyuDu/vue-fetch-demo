<script setup lang="ts">
</script>

<template lang="pug">
nav.nav
  ul.max-w-7xl.mx-auto.px-4
    li
      router-link(to="/") 首页
    li
      router-link(to="/xhr") XHR 获取数据
    li
      router-link(to="/fetch") Fetch 获取数据
    li
      router-link(to="/websocket") Websocket 获取数据
    //- 长轮询
    li
      router-link(to="/longPolling") 长轮询
    //- 服务端推送
    li
      router-link(to="/sse") 服务端推送SSE
router-view.
</template>

<style lang="less" scoped>
.nav {
  // sticky
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  line-height: 50px;
}
.nav ul {
  display: flex;
  list-style: none;
}
.nav li {
  margin-right: 30px;
  :deep(.router-link-active) {
    color: var(--blue);
  }
}
</style>
