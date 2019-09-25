<template>
  <div>
    <a-card :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="旧密码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            type="password"
            v-decorator="[
              'oldpass',
              {rules: [{ required: true, message: '旧密码不能为空' }]}
            ]"
            name="name"
            placeholder="请输入旧密码" />
        </a-form-item>
        <a-form-item
          label="新密码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '新密码不能为空' }]}
            ]"
            name="name"
            placeholder="请输入新密码" />
        </a-form-item>

        <a-form-item
          label="确认密码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'password2',
              {rules: [{ required: true, message: '确认密码不能为空' }]}
            ]"
            name="name"
            placeholder="请输入确认密码" />
        </a-form-item>
        
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getUserResultByUserId, getUserResultDetail } from '@/api/manage'
export default {
  name: 'UpdatePassword',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
