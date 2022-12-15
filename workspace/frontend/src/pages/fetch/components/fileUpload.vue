<template lang="pug">
section.list__item
  h2.list__title 文件上传
  .mb-4
    input.p-2.border(
      ref="fileInputRef",
      name="file",
      type="file",
      @change="handleFileChange"
    )
    button.ml-5(@click="upload") 上传
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import { ref } from 'vue'

const data = ref<any>({})

const fileInputRef = ref<HTMLInputElement>()

const upload = async () => {
  const url = 'http://localhost:3001/api/fetchUpload'
  // 上传文件
  // // 获取文件
  const file = fileInputRef.value?.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  // fetch
  const res = await fetch(url, {
    method: 'POST',
    body: formData
  })
  data.value = await res.json()
}
</script>
