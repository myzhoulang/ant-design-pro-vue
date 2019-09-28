<template>
  <div>
    <a-card :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="name"
        :showPagination="false"
        :columns="columns"
        :data="loadData"
      ></s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getStopTime } from '@/api/manage'
export default {
  name: 'PagePaceTime',
  components: {
    STable
  },
  data() {
    return {
      // 表头
      columns: [],
      loadData: parameter => {
        const { query } = this.$route
        return getStopTime(
          Object.assign(parameter, {
            pageSize: 1000,
            pageType: query.pageType
          })
        ).then(res => {
          this.columns = res.data.map(item => {
            return {
              title: item.label,
              dataIndex: item.label
            }
          })

          this.columns.unshift({ title: '页面名', dataIndex: 'name' })
          let data = []
          let names = ['uv', 'pv']
          let titles = ['人数', '人次']
          for (let i = 0; i < 2; i++) {
            let j = {
              name: titles[i]
            }
            res.data.forEach(item => {
              j[item.label] = item[names[i]]
            })
            data.push(j)
          }
          res.data = data
          return res
        })
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
