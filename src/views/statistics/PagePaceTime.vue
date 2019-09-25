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
      >
      </s-table>
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
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        // {
        //   title: '页面',
        //   dataIndex: 'name'
        // },
        // {
        //   title: '累计停留时间',
        //   dataIndex: 'total',
        //   customRender: (t) => {
        //     let text = parseInt(t)
        //     const h = ~~(text / 60 / 60)
        //     const m = ~~((text - h * 60) / 60)
        //     const s = text - (h * 60 + m * 60)
        //     return `${h}时${m}分${s}秒`
        //   }
        // },
        // {
        //   title: '停留人次',
        //   dataIndex: 'pv',
        //   customRender: (text) => text + ' 次'
        // },
        // {
        //   title: '停留人数',
        //   dataIndex: 'uv',
        // },
        // {
        //   title: '平均停留时间（人次）',
        //   dataIndex: 'avgpv'
        // },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   width: '150px',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      loadData: parameter => {
        const {query} = this.$route
        return getStopTime(Object.assign(parameter, this.queryParam, {
            pageSize: 1000,
            pageType: query.pageType
          }))
          .then(res => {
            this.columns = res.data.map(item => {
              return {
                title: item.label,
                dataIndex: item.label
              }
            })

            this.columns.unshift({title: '页面名', dataIndex: 'name'})
            let data = []
            let names = ['uv', 'pv']
            let titles = ['人数', '人次']
            for(let i = 0; i<2;i++){
              let j = {
                name: titles[i]
              }
              res.data.forEach(item =>  {
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
  methods: {

  }
}
</script>

<style scoped>

</style>
