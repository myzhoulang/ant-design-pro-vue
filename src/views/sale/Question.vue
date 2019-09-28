<template>
  <a-card>
    <s-table 
      ref="table" 
      rowKey="id" 
      :showPagination="false"
      :columns="columns" 
      :data="loadData">

      <template slot="helpQuestion" slot-scope="text">
        <a-tooltip placement="top" >
          <span><ellipsis :length="20" tooltip>{{ text }}</ellipsis></span>
        </a-tooltip>
      </template>
      <template slot="helpAnswer" slot-scope="text">
        <a-tooltip placement="top" >
          <span>
            <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
          </span>
        </a-tooltip>
      </template>
      <template slot="helpUrl" slot-scope="text">
        <a-tooltip placement="top" >
          <span><ellipsis :length="20" tooltip>{{ text }}</ellipsis></span>
        </a-tooltip>
      </template>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="showModal(record)">编辑</a>
        </template>
      </span>
    </s-table>


    <!--表单-->
    <a-modal
      title="问题编辑"
      :visible="showEdit"
      @ok="() => changeValue(false)"
      @cancel="cancel"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="问题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 17 }"
        >
        <!-- rules: [{ required: true, message: '请输入问题' }], -->
          <a-textarea
            :style="{height: '120px'}"
            placeholder="在此输入问题"
            v-decorator="[
              'helpQuestion',
              {
                initialValue: question.question
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="答案"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 17 }"
        >
         <!-- rules: [{ required: true, message: '请输入答案' }], -->
          <a-textarea
            :style="{height: '120px'}"
            v-decorator="[
              'helpAnswer',
              {
                initialValue: question.answer
              }
            ]"
            placeholder="在此输入答案" />
        </a-form-item>

        <a-form-item
          label="链接"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 17 }"
        >
        <!-- rules: [{ required: true, message: '请输入链接' }], -->
          <a-textarea
            :style="{height: '40px'}"
            v-decorator="[
              'helpUrl',
              {
                initialValue: question.link
              }
            ]"
            placeholder="在此输入链接" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getHelpList, editHelp } from '@/api/manage'
export default {
  name: 'Question',
  components: {
    STable,
    Ellipsis,
  },
  data () {
    return {
      memberLoading: false,
      question: {},
      showEdit: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      data: [ 
      ],
      columns: [
        {
          title: '常见问题帮助',
          dataIndex: 'productName',
          key: 'productName',
          width: '15%'
        },
        {
          title: '问题',
          dataIndex: 'helpQuestion',
          key: 'helpQuestions',
          width: '25%',
          scopedSlots: { customRender: 'helpQuestion' }
        },
        {
          title: '答案',
          dataIndex: 'helpAnswer',
          key: 'helpAnswer',
          width: '25%',
          scopedSlots: { customRender: 'helpAnswer' }
        },
        {
          title: '链接',
          dataIndex: 'helpUrl',
          key: 'helpUrl',
          width: '25%',
          scopedSlots: { customRender: 'helpUrl' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getHelpList(
          Object.assign(parameter)
        ).then(res => {
          return res
        })
      }
    }
  },
  methods: {
    changeValue () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const data = await editHelp({
            ...values,
            id: this.question.id
          });

          if(data.status === 200){
            this.showEdit = false
            this.$refs.table.refresh()
          }
        }
      })
    },
    showModal (question) {
      this.showEdit = true
      this.question = question
      this.$nextTick(() => {
        this.form.setFieldsValue({
          helpQuestion: question.helpQuestion,
          helpAnswer: question.helpAnswer,
          helpUrl: question.helpUrl
        })
      })
    },
    cancel () {
      this.showEdit = false
    },
    saveRow () {},
    handleChange () {}
  }
}
</script>

<style scoped>

</style>
