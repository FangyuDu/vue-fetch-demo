<template lang="pug">
.max-w-7xl.mx-auto.px-4
  section.list__item
    h2.list__title Axios 获取数据
    .mb-4
      button.mr-5(@click="fetchData") axios获取数据
      span axios依赖
    pre.log.mb-5 {{ data }}
  section.list__item
    h2.list__title 原生xhr获取数据
    .mb-4
      button.mr-5(@click="xhrFetch") xhr获取数据
      span 原生xhr获取数据
    pre.log.mb-5 {{ xhrData }}
  WithParams#withParams.
  DataForm#dataForm.
  FileUpload#fileUpload.
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import WithParams from './components/withParams.vue'
import DataForm from './components/dataForm.vue'
import FileUpload from './components/fileUpload.vue'
import { useRoute } from 'vue-router'

const data = ref<any>({})
const xhrData = ref<any>({})

// axios
const fetchData = async () => {
  const res = await axios('http://localhost:3001/api/fetchJSON')
  data.value = res.data
}

// default
const xhrFetch = async () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:3001/api/fetchJSON')
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      xhrData.value = JSON.parse(xhr.responseText)
    }
  }
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
