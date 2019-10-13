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
                <a-button type="primary" @click="$refs.table.refresh(true)" style="margin-right: 15px;">查询</a-button>
                <Download
                  name="客户管理.xls"
                  :query="date"
                  url="/user/exportAppUserList.htm"/>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
        <span slot="action" slot-scope="text, record">
          <template>
            <router-link :to="{name: 'Customer', params: {id: record.id}}">详情</router-link>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Download } from '@/components'
import { getAppUserList } from '@/api/manage'
export default {
  name: 'CustomerList',
  components: {
    STable,
    Download
  },
  data () {
    return {
      // 查询参数
      queryParam: {
        date: [moment(), moment()]
      },
      date: {
        startTime: moment().format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      },
      // 表头
      columns: [
        {
          title: '用户ID',
          dataIndex: 'id'
        },
        {
          title: '手机后四位',
          dataIndex: 'phone'
        },
        {
          title: '代理人工号',
          dataIndex: 'agentNum'
        },
        {
          title: '注册时间',
          dataIndex: 'registerDate',
          customRender (text) {
            return moment(text).format('YYYY-MM-DD')
          }
        },
        {
          title: '测试',
          dataIndex: 'action',
          width: '60px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        let startTime
        let endTime
        if (Array.isArray(this.queryParam.date) && this.queryParam.date.length > 0) {
          startTime = this.queryParam.date[0].format('YYYY-MM-DD')
          endTime = this.queryParam.date[1].format('YYYY-MM-DD')
        }

        return getAppUserList(
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
  created(){
    const {query} = this.$route;
    this.queryParam.date = [
      moment(query.startTime),
      moment(query.endTime)
    ]
    this.date.startTime = query.startTime
    this.date.endTime = query.endTime
  },
  methods: {
    dateChange (dates = []) {
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
