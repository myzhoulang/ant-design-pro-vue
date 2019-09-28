<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">

    <s-table 
      ref="table" 
      rowKey="id" 
      :showPagination="false"
      :columns="columns" 
      :data="loadData">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="showModal(record)">编辑</a>
        </template>
      </span>
    </s-table>


    <!--表单-->
    <a-modal
      title="编辑人数"
      :visible="showEdit"
      @ok="() => changeValue(false)"
      @cancel="cancel"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="选择人数"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input-number 
            :style="{width: '200px'}"
            placeholder="选择人数"
            v-decorator="[
              'applyNum',
            ]"/>
        </a-form-item>
        <a-form-item
          label="承保人数"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input-number
            :style="{width: '200px'}"
            v-decorator="[
              'insureNum'
            ]"
            placeholder="承保人数" />
        </a-form-item>

      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getProductList, editIProduct } from '@/api/manage'
export default {
  name: 'ProductSetting',
  components: {
    STable,
    Ellipsis,
  },
  data () {
    return {
      product: {},
      showEdit: false,
      columns: [
        {title: '产品', dataIndex: 'productName'},
        {title: '选择人数', dataIndex: 'applyNum'},
        {title: '承保人数', dataIndex: 'insureNum'},
        { 
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        },
      ],
      form: this.$form.createForm(this),
      loadData: parameter => {
        return getProductList(
          Object.assign(parameter)
        ).then(res => {
          return res
        })
      }
    }
  },
  methods: {
    showModal(product){
      this.showEdit = true
      this.product = product
      this.$nextTick(() => {
        this.form.setFieldsValue({
          insureNum: product.insureNum,
          applyNum: product.applyNum,
        })
      })
    },
    changeValue(){
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const data = await editIProduct({
            ...values,
            id: this.product.id
          });

          if(data.status === 200){
            this.showEdit = false
            this.$refs.table.refresh()
          }
        }
      })
    },
    cancel(){
      this.showEdit = false
    }
  }
}
</script>

<style scoped>

</style>
