<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :xl="8" :sm="24">
              <a-form-item label="时间范围">
                <a-range-picker v-model="queryParam.date" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <!-- <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button> -->
                <!-- <a-button style="margin-left: 8px" icon="download">导出</a-button>
                <a-button style="margin-left: 8px" icon="question-circle">字段说明</a-button>-->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData"></s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getClickTimeByButtonType } from '@/api/manage'
export default {
  name: 'Quantity',
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
          title: '统计内容',
          dataIndex: 'name'
        },
        {
          title: '所属',
          dataIndex: ''
        },
        {
          title: '累计数量',
          dataIndex: 'pv'
        },
        {
          title: '累计人数',
          dataIndex: 'uv'
        },
        {
          title: '累计数量（新）',
          dataIndex: 'newpv'
        },
        {
          title: '累计人数（新）',
          dataIndex: 'newuv'
        },
        {
          title: '累计数量（老）',
          dataIndex: 'oldpv'
        },
        {
          title: '累计人数（老）',
          dataIndex: 'olduv'
        }
      ],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        let startTime
        let endTime
        if (Array.isArray(this.queryParam.date)) {
          startTime = this.queryParam.date[0].format('YYYY-MM-DD hh:mm:ss')
          endTime = this.queryParam.date[1].format('YYYY-MM-DD hh:mm:ss')
        }

        delete this.queryParam.date
        return getClickTimeByButtonType(
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
