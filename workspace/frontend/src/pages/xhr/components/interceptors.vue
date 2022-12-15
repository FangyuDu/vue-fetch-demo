<template lang="pug">
section.list__item
  h2.list__title 拦截器
  .mb-4
    button(@click="fetch401", :disabled="loading")  请求{{ loading ? '中。' : '' }}
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'

const loading = ref(false)

const data = ref<any>({})

const NO_PERMISSION = 401

const _localFetch = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 1000
})

// 请求内容拦截器
_localFetch.interceptors.request.use(
  config => {
    // 在 headers 中添加 token
    if (config.headers) {
      config.headers.Authorization = 'Bearer 123456'
    }
    console.log('request config', config) 
    return config
  },
  error => {
    console.log('request error', error)
    return Promise.reject(error)
  }
)

// 响应内容拦截器
_localFetch.interceptors.response.use(
  response => {
    console.log('response', response)
    return response
  },
  error => {
    console.log('response error', error)
    if (error.response?.status === NO_PERMISSION) {
      // 无权限
      alert('无权限')
    }    
    return Promise.reject(error)
  }
)

const fetch401 = async () => {
  loading.value = true
  // 期望 30s 后返回数据
  try {
    const res = await _localFetch('/fetch401', {
      params: {
        name: 'admin'
      }
    })
    data.value = res.data
  } catch (error) {
    console.log(error)
    data.value = error
  } finally {
    loading.value = false
  }
}
</script>
