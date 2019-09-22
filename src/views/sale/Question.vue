<template>
  <a-card>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="memberLoading"
    >
      <template slot="title"></template>
      <template v-for="(col, i) in ['question', 'answer', 'link']" :slot="col" slot-scope="text, record">
        <a-textarea
          :key="col"
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          :placeholder="columns[i].title"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{ text }}</template>
      </template>
      <template slot="operation" slot-scope="text, record">
        <template v-if="record.editable">
          <span>
            <a @click="saveRow(record)">保存</a>
            <a-divider type="vertical" />
            <a @click="cancel(record.key)">取消</a>
          </span>
        </template>
        <span v-else>
          <a @click="showModal(record)">编辑</a>
        </span>
      </template>
    </a-table>

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
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            placeholder="在此输入问题"
            v-decorator="[
              'question',
              {
                rules: [{ required: true, message: '请输入问题' }],
                initialValue: question.question
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="答案"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            v-decorator="[
              'answer',
              {
                rules: [{ required: true, message: '请输入答案' }],
                initialValue: question.answer
              }
            ]"
            placeholder="在此输入答案" />
        </a-form-item>

        <a-form-item
          label="链接"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            v-decorator="[
              'link',
              {
                rules: [{ required: true, message: '请输入链接' }],
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
export default {
  name: 'Question',
  data () {
    return {
      memberLoading: false,
      question: {},
      showEdit: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      data: [
        {
          title: '安心百分百-1',
          key: 'axbfb1',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '安心百分百-2',
          key: 'axbfb2',
          question: '小明',
          answer: '0012',
          link: ''
        },
        {
          title: '安心百分百-3',
          key: 'axbfb3',
          question: '小明',
          answer: '0013',
          link: ''
        },
        {
          title: '安心百分百-4',
          key: 'axbfb4',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '安心百分百-5',
          key: 'axbfb5',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '安心百分百-6',
          key: 'axbfb6',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '大小福星-1',
          key: 'dxfx1',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '大小福星-2',
          key: 'dxfx2',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '大小福星-3',
          key: 'dxfx3',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '大小福星-4',
          key: 'dxfx4',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '大小福星-5',
          key: 'dxfx5',
          question: '小明',
          answer: '001',
          link: ''
        },
        {
          title: '大小福星-6',
          key: 'dxfx6',
          question: '小明',
          answer: '001',
          link: ''
        }
      ],
      columns: [
        {
          title: '常见问题帮助',
          dataIndex: 'title',
          key: 'title',
          width: '15%'
        },
        {
          title: '问题',
          dataIndex: 'question',
          key: 'question',
          width: '25%',
          scopedSlots: { customRender: 'question' }
        },
        {
          title: '答案',
          dataIndex: 'answer',
          key: 'answer',
          width: '25%',
          scopedSlots: { customRender: 'answer' }
        },
        {
          title: '链接',
          dataIndex: 'link',
          key: 'link',
          width: '25%',
          scopedSlots: { customRender: 'link' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  methods: {
    changeValue () {},
    showModal (question) {
      this.showEdit = true
      this.question = question
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
