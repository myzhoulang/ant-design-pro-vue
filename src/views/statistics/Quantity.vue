<template>
  <div>
    <a-card :bordered="false" size="middle">
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
                    name="数量统计.xls"
                    :query="date"
                    url="/button/click/exportClickTimeByButtonType.htm"/>
                <!-- <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button> -->
                <!-- <a-button style="margin-left: 8px" icon="download">导出</a-button>
                <a-button style="margin-left: 8px" icon="question-circle">字段说明</a-button>-->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        :showPagination="false"
        rowKey="code"
        :columns="columns"
        :data="loadData"></s-table>
    </a-card>
  </div>
</template>

<script>
import { STable, Download } from '@/components'
import { getClickTimeByButtonType } from '@/api/manage'
export default {
  name: 'Quantity',
  components: {
    STable,
    Download
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      date: {},
      // 表头
      columns: [
        {
          title: '统计内容',
          dataIndex: 'name',
          width: '12%'
        },
        {
          title: '所属',
          dataIndex: '',
          width: '8%'
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
        let startTime
        let endTime
        if (Array.isArray(this.queryParam.date) && this.queryParam.date.length > 0) {
          startTime = this.queryParam.date[0].format('YYYY-MM-DD')
          endTime = this.queryParam.date[1].format('YYYY-MM-DD')
        }

        delete this.queryParam.date
        return getClickTimeByButtonType(
          Object.assign(parameter, this.queryParam, {
            pageSize: 100,
            startTime,
            endTime
          })
        ).then(res => {
          return res
        })
      }
    }
  },
  methods: {
    dateChange (dates = []) {
      this.date = {
        startTime: dates[0].format('YYYY-MM-DD'),
        endTime: dates[1].format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style scoped>
</style>
