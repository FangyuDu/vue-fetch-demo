<template lang="pug">
section.list__item
  h2.list__title 表单传参
  .mb-4
    input.p-2.border(
      v-model="query.username",
      placeholder="请输入用户名",
      name='first-name',
      autocomplete='given-name',
      @keydown.enter="fetchDataWithParams"
    )
    button.ml-5(@click="fetchDataWithParams")  传参请求
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'

// params
const query = reactive({
  username: 'admin'
})

const data = ref<any>({})

const fetchDataWithParams = async () => {
  // 表单接口
  const res = await axios('http://localhost:3001/api/fetchForm', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    data: query
  })
  data.value = res.data
}
</script>
