<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="时间范围">
                <a-range-picker v-model="queryParam.date" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a-button style="margin-left: 8px" icon="download">导出</a-button>
                <a-button style="margin-left: 8px" icon="question-circle">字段说明</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">详情</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
export default {
  name: 'Test',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '统计内容',
          dataIndex: 'no'
        },
        {
          title: '所属',
          dataIndex: 'description'
        },
        {
          title: '累计数量',
          dataIndex: 'callNo',
          customRender: (text) => text + ' 次'
        },
        {
          title: '累计人数',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '累计数量（新）',
          dataIndex: 'updatedAt'
        },
        {
          title: '累计人数（新）',
          dataIndex: 'updatedAt'
        },
        {
          title: '累计数量（老）',
          dataIndex: 'updatedAt'
        },
        {
          title: '累计人数（老）',
          dataIndex: 'updatedAt'
        },
        {
          title: '备注',
          dataIndex: 'updatedAt'
        }
      ],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
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
