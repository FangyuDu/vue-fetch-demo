<script setup lang="ts">
</script>

<template lang="pug">
nav.nav
  ul
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
hr.
router-view.
</template>

<style scoped>
.nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav li {
  margin-right: 30px;
}
</style>
