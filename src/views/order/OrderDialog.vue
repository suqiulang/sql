<template>
  <div>
    <el-dialog :title="title" :visible="visible" @close="close" width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="订单来源" prop="from">
              <el-radio-group v-model="ruleForm.from">
                <el-radio label="移动端"></el-radio>
                <el-radio label="pc端"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支付" prop="pay">
              <el-radio-group v-model="ruleForm.pay">
                <el-radio :label="1">已支付</el-radio>
                <el-radio :label="2">未支付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post } from '@/utils/http'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    create: {
      type: Object,
      required: true
    }
  },
  name: 'MyDialog',
  data() {
    return {
      ruleForm: {
        name: '',
        start: '',
        cargo: '',
        count: '',
        unit: '',
        from: '',
        pay: '',
        price: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        start: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        end: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        cargo: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        from: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        pay: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { pattern: /^\d+$/, message: '必须是纯数字', trigger: 'blur' }
        ]
      },
    }
  },
  watch: {
    visible() {
      const {name , start,cargo,count,unit,from,price,pay} = this.create
      this.ruleForm = {name , start,cargo,count,unit,from,pay,price}
    }
  },
  computed:{
    title(){
      return this.create.id?'编辑订单':'新建订单'
    }
  },
  methods: {
    confirm() {
      this.$refs.ruleForm.validate((val) => {
        if (val) {
          post('/create', this.ruleForm).then((res) => {
            this.$notify({
              title: '成功',
              message: `操作${res.message}`,
              type: 'success'
            });
          })
        }
      })
    },
    close() {
      this.$refs.ruleForm.resetFields()
      this.$emit('edit',{})
      this.$emit('operate')
    }
  }
}
</script>

<style>
</style>