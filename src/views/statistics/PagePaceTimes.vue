<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :xl="10" :xxl="6" :sm="24">
              <a-form-item label="时间范围">
                <a-range-picker :showTime="true" v-model="queryParam.date" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :xl="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <!-- <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button> -->
                <!-- <a-button style="margin-left: 8px" icon="download">导出</a-button> -->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        rowKey="name"
        :showPagination="false"
        :columns="columns"
        :data="loadData"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <router-link :to="{ name: 'PagePaceTime' , query: {pageType: record.pageType}}">详情</router-link>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getStopTimeList } from '@/api/manage'
export default {
  name: 'PagePaceTimes',
  components: {
    STable
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '页面',
          dataIndex: 'name'
        },
        {
          title: '累计停留时间',
          dataIndex: 'total',
          customRender: t => {
            let text = parseInt(t)
            const h = ~~(text / 60 / 60)
            const m = ~~((text - h * 60 * 60) / 60)
            const s = text - (h * 60 * 60 + m * 60)
            return `${h}时${m}分${s}秒`
          }
        },
        {
          title: '停留人次',
          dataIndex: 'pv'
        },
        {
          title: '停留人数',
          dataIndex: 'uv'
        },
        {
          title: '平均停留时间（人次）',
          dataIndex: 'avgpv',
          customRender: t => {
            const time = parseFloat(t);

            return time.toFixed(3);
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        let startTime
        let endTime
        if (Array.isArray(this.queryParam.date)) {
          startTime = this.queryParam.date[0].format('YYYY-MM-DD hh:mm:ss')
          endTime = this.queryParam.date[1].format('YYYY-MM-DD hh:mm:ss')
        }

        delete this.queryParam.date
        return getStopTimeList(
          Object.assign(parameter, this.queryParam, {
            pageSize: 1000,
            startTime,
            endTime
          })
        ).then(res => {
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
