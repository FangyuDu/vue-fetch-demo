<template lang="pug">
.page.max-w-7xl.mx-auto.px-4
  .list__item(v-for="({title, items}, index) in sections" :key="index")
    h2.list__title {{title}}
    .grid.grid-cols-3.list-sub
      .list-sub__item.p-2(v-for="({ to, title: subTitle }, index) in items" :key="index")
        template(v-if="to")
          span.list-sub__link: router-link(:to="to") {{ subTitle }}
        span.text-disabled(v-else) {{ subTitle }}
</template>
<script setup lang="ts">
const baseItem = [
  { to: '/xhr', title: 'XHR 获取数据' },
  { to: '/fetch', title: 'Fetch 获取数据' },
  { to: '/websocket', title: 'Websocket 获取数据' },
  { to: '/longPolling', title: '长轮询' },
  { to: '/sse', title: '服务端推送SSE' }
]

const XHRItems = [
  { to: { path: '/xhr', hash: '#withParams' }, title: '传参请求' },
  { to: { path: '/xhr', hash: '#dataForm' }, title: '表单传参' },
  { title: '上传文件' },
  { title: 'Axios Cancel' },
  { title: '拦截器' },
  { title: '覆盖默认配置' },
  { title: '队列请求' }
]

const FetchItems = [
  { title: '传参请求' },
  { title: '表单传参' },
  { title: '上传文件' },
  { title: 'Fetch Cancel' }
]

const WebsocketItems = [
  { title: '多个连接' },
  { title: '分割连接群组' },
  { title: '广播' },
  { title: '断线重连' }
]

const LongPollingItems = [{ title: '传参请求' }]

const SSEItems = [{ title: '传参请求' }]

// 综合
const OtherItems = [
  { title: '分片上传' },
  { title: '断点续传' }
]

const sections = [
  {
    title: '基础请求',
    items: baseItem
  },
  {
    title: 'XHR/Axios',
    items: XHRItems
  },
  {
    title: 'Fetch',
    items: FetchItems
  },
  {
    title: 'Websocket',
    items: WebsocketItems
  },
  {
    title: '长轮询',
    items: LongPollingItems
  },
  {
    title: '服务端推送SSE',
    items: SSEItems
  },
  {
    title: 'WebRTC',
    items: []
  },
  {
    title: '综合',
    items: OtherItems
  }
]
</script>
<style lang="less" scoped>
.list__title {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
  &::before {
    content: counter(a) '. ';
  }
}

.list__item {
  counter-increment: a;
}

.list-sub {
  counter-reset: b;
}

.list-sub__item {
  counter-increment: b;
  &::before {
    font-size: 12px;
    line-height: 16px;
    margin-right: 15px;
    content: counter(a) '.' counter(b);
  }
  .list-sub__link {
    color: var(--foregroundAction);
  }
}

.text-disabled {
  color: var(--foregroundDisabled);
}
</style>
