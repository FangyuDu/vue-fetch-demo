<template lang="pug">
section.list__item
  h2.list__title 队列请求
  .mb-4
    button(@click="sequenceQuery", :disabled="loading_all")  队列请求{{ loading_all ? '中。' : '' }}
  .flex.w-full
    pre.flex-1.log.mb-5
      p(v-for="(item, index) in taskList" :key="index")
        | {{ item.taksName }}: {{ LOADING_STATUS[item.loading] }}
    pre.flex-1.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'

const loading_all = ref(false)

// 尝试使用中文枚举⭐
const enum LOADING_STATUS {
  未开始 = 0,
  请求中 = 1,
  请求完成 = 2,
  请求失败 = 3
}

const _localFetch = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 3000
})

// 长度为 10 的请求队列参数
const queryList = Array.from({ length: 10 }, (_, i) => ({
  username: `task_${i + 1}`
}))

const taskList = reactive<any[]>(queryList.map((params) => {
  return {
    taksName: params.username,
    loading: LOADING_STATUS.未开始,
    task: () => _localFetch('/fetchJSON2', { params }),
  }
}))

const data = ref<any>({})

const sequenceQuery = async () => {
  loading_all.value = true
  for (const item of taskList) {
    item.loading = LOADING_STATUS.请求中
    try {
      const res = await item.task()
      await new Promise((resolve) => setTimeout(resolve, 200))
      item.loading = LOADING_STATUS.请求完成
      data.value = res.data
    } catch (error) {
      item.loading = LOADING_STATUS.请求失败
      console.log(error)
      data.value = error
    }
  }
  loading_all.value = false
}
</script>
