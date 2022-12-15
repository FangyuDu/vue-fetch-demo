<template lang="pug">
.max-w-7xl.mx-auto.px-4
  section.list__item
    h2.list__title fetch 获取数据
    .mb-4
      button.mr-5(@click="fetchData") fetch获取数据
      span axios依赖
    pre.log.mb-5 {{ data }}
  WithParams#withParams.
  DataForm#dataForm.
  FileUpload#fileUpload.
  FetchCancel#fetchCancel.
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import WithParams from './components/withParams.vue'
import DataForm from './components/dataForm.vue'
import FileUpload from './components/fileUpload.vue'
import FetchCancel from './components/fetchCancel.vue'

const data = ref<any>({})
const fetchData = async () => {
  const res = await fetch('http://localhost:3001/api/fetchJSON')
  // const data = await res.json()
  console.log(data)
  data.value = await res.json()
}

const { hash } = useRoute()
onMounted(() => {
  setTimeout(() => {
    if (hash) {
      console.log(hash)
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, 0)
})
</script>

<style lang="less" scoped>
:deep(.list__item) {
  counter-increment: a;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

:deep(.list__title) {
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
</style>