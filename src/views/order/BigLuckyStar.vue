<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :xl="10" :xxl="6" :sm="24">
              <a-form-item label="时间范围">
                <a-range-picker @change="dateChange" v-model="queryParam.date" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button
                  type="primary"
                  :style="{marginRight: '15px'}"
                  @click="$refs.table.refresh(true)"
                >查询</a-button>
                <!-- <a-button style="margin-left: 8px" icon="download">导出</a-button> -->
                <Download name="大福星.xls" :query="date" url="/order/exportProductOrderList.htm" />
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
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
import { STable, Download } from '@/components'
import { getProductOrderList } from '@/api/manage'
export default {
  name: 'BigLuckyStar',
  components: {
    STable,
    Download
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      date: {},
      // 表头
      columns: [
        {
          title: '下单时间',
          dataIndex: 'createDate'
        },
        {
          title: '被投保人',
          dataIndex: 'insuredPerson'
        },
        {
          title: '被投保人性别',
          dataIndex: 'sex',
          customRender: text => ({ 1: '男', 2: '女' }[text])
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

        return getProductOrderList(
          Object.assign(parameter, {
            startTime,
            endTime
          })
        ).then(res => {
          this.$router.push({
            query: {
              startTime,
              endTime
            }
          })
          return {
            data: res.data,
            pageNo: res.pageNo,
            totalCount: res.count
          }
        })
      }
    }
  },
  created() {
    const { query } = this.$route
    this.queryParam.date = [moment(query.startTime), moment(query.endTime)]
    this.date.startTime = query.startTime
    this.date.endTime = query.endTime
  },
  methods: {
    dateChange(dates = []) {
      this.date = {
        startTime: dates[0] && dates[0].format('YYYY-MM-DD'),
        endTime: dates[1] && dates[1].format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style scoped>
</style>
