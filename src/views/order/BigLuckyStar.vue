<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :xl="10" :xxl="6" :sm="24">
              <a-form-item label="时间范围">
                <a-range-picker v-model="queryParam.date" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" :style="{marginRight: '15px'}" @click="$refs.table.refresh(true)">查询</a-button>
                <!-- <a-button style="margin-left: 8px" icon="download">导出</a-button> -->
                <Download name="大福星."/>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
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
import { STable, Download } from '@/components'
import { getProductOrderList } from '@/api/manage'
export default {
  name: 'BigLuckyStar',
  components: {
    STable,
    Download
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '下单时间',
          dataIndex: 'no'
        },
        {
          title: '被投保人',
          dataIndex: 'insuredPerson'
        },
        {
          title: '被投保人性别',
          dataIndex: 'sex',
          customRender: text => ({ 1: '男', 0: '女' })[text]
        },
        {
          title: '年龄',
          dataIndex: 'age'
        },
        {
          title: '保额',
          dataIndex: 'insuredAmount'
        },
        {
          title: '手机后四位',
          dataIndex: 'phone'
        },
        {
          title: '工号',
          dataIndex: 'userId'
        }
      ],
      loadData: parameter => {
        let startTime
        let endTime
        if (Array.isArray(this.queryParam.date) && this.queryParam.date.length > 0) {
          startTime = this.queryParam.date[0].format('YYYY-MM-DD')
          endTime = this.queryParam.date[1].format('YYYY-MM-DD')
        }

        delete this.queryParam.date
        return getProductOrderList(
          Object.assign(parameter, this.queryParam, {
            startTime,
            endTime
          })
        )
          .then(res => {
            return {
              data: res.data,
              pageNo: res.pageNo,
              totalCount: res.count
            }
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
