<template lang="pug">
section.list__item
  h2.list__title 覆盖默认配置
  .mb-4
    button(@click="fetchAxiosCancel", :disabled="loading_1", title="30秒后获得结果。")  请求{{ loading_1 ? '中。' : '' }}
    button.ml-5(@click="defaultFetch", :disabled="loading_2", title="默认3秒后超时。")  无覆写请求
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'

const loading_1 = ref(false)
const loading_2 = ref(false)

const data = ref<any>({})

const _localFetch = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 3000
})

const fetchAxiosCancel = async () => {
  loading_1.value = true
  // 期望 30s 后返回数据
  try {
    const res = await _localFetch('/turtleFetch', {
      timeout: 31 * 1e3
    })
    data.value = res.data
  } catch (error) {
    console.log(error)
    data.value = error
  } finally {
    loading_1.value = false
  }
}


const defaultFetch = async () => {
  loading_2.value = true
  // 期望 30s 后返回数据
  try {
    const res = await _localFetch('/turtleFetch')
    data.value = res.data
  } catch (error) {
    console.log(error)
    data.value = error
  } finally {
    loading_2.value = false
  }
}
</script>
