<template>
  <a-button type="primary" @click="download" :icon="icon">{{ title }}</a-button>
</template>

<script>
import jsFileDownload from 'js-file-download'
import { axios } from '@/utils/request'

export default {
  props: {
    icon: {
      type: String
    },
    title: {
      type: String,
      default: '导出'
    },
    name: {
      required: true,
        type: String
    },
    url: {
      required: true,
      type: String
    },
    query: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    download () {
      axios
        .post(this.url, {}, { params: this.query, responseType: 'arraybuffer',  headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        .then(data => jsFileDownload(data, this.name))
    }
  }
}
</script>
