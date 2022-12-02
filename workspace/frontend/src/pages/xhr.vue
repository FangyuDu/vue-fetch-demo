<template lang="pug">
button(@click="fetchData") axios获取数据
.log {{ data }}
hr/
button(@click="xhrFetch") axios获取数据
.log {{ xhrData }}
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

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
      console.log(xhr.responseText)
      xhrData.value = JSON.parse(xhr.responseText)
    }
  }
}
</script>
