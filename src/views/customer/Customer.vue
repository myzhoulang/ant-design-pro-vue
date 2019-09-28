<template>
  <div>
    <a-card :bordered="false">
      <s-table
        ref="table"
        rowKey="id"
        :showPagination="false"
        :columns="columns"
        :data="loadData"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click.prevent="showReport(record)">详情</a>
          </template>
        </span>
      </s-table>
    </a-card>

    <!-- 问题和答案 -->
    <a-modal v-model="visible" :title="title" onOk="ok">
      <a-collapse defaultActiveKey="1" :bordered="false">
        <a-collapse-panel 
          :key="questionName" 
          v-for="(answerName, questionName ) in dataSource" >
          <template slot="header">
            {{ questionName }}
          </template>
          <p>{{answerName.join(',')}}</p>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getUserResultByUserId, getUserResultDetail } from '@/api/manage'
const types = {1: '本人',2: '配偶',3: '子女' }
export default {
  name: 'Customer',
  components: {
    STable
  },
  data () {
    return {
      title: '',
      visible: false,
      dataSource : {},
      // 表头
      columns: [
        {
          title: '报告',
          dataIndex: 'userType',
          customRender(text){
            return types[text] + '的测试'
          }
        },
        {
          title: '测试时间',
          dataIndex: 'createDate',
          customRender(text){
            return moment(text).format('YYYY-MM-DD')
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
        const {params} = this.$route;
        return getUserResultByUserId({
          id:params.id
        })
        .then(res => {
          return res
        })
      }
    }
  },
  methods: {
    showReport (record){
      this.title = types[record.userType] + '的测试'
      const {params} = this.$route 
      getUserResultDetail({
        userId: params.id,
        id: record.id
      }).then(result => {
        let dataSource = {};
        for(let item of result.data) {
          dataSource[item.questionName] = result.data.filter(item2 => item2.questionName === item.questionName).map(item => item.answerName)
        }
        this.dataSource = dataSource
      })
      this.visible = true;
    },

    ok (){
      this.visible = true;
    }
  }
}
</script>

<style scoped>
</style>
