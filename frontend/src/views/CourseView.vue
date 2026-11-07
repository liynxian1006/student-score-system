<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="query" class="search">
        <el-form-item label="课程名">
          <el-input v-model="query.name" placeholder="课程名" clearable @keyup.enter="load" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="load">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="success" @click="openAdd">新增课程</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column prop="courseNo" label="课程号" />
        <el-table-column prop="name" label="课程名" />
        <el-table-column prop="credit" label="学分" width="100" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="openEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="remove(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="pager" background layout="total, prev, pager, next"
        :total="total" :current-page="page.current" :page-size="page.size"
        @current-change="handlePage" />

      <el-dialog v-model="dialogVisible" :title="form.id ? '编辑课程' : '新增课程'" width="420px">
        <el-form :model="form" label-width="70px">
          <el-form-item label="课程号"><el-input v-model="form.courseNo" :disabled="!!form.id" /></el-form-item>
          <el-form-item label="课程名"><el-input v-model="form.name" /></el-form-item>
          <el-form-item label="学分">
            <el-input-number v-model="form.credit" :min="0" :max="10" :precision="1" :step="0.5" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const page = reactive({ current: 1, size: 10 })
const query = reactive({ name: '' })

const dialogVisible = ref(false)
const form = reactive({ id: null, courseNo: '', name: '', credit: 0 })

async function load() {
  loading.value = true
  try {
    const data = await request.get('/courses/page', { params: { current: page.current, size: page.size, ...query } })
    tableData.value = data.records
    total.value = data.total
  } finally {
    loading.value = false
  }
}

function reset() {
  query.name = ''
  page.current = 1
  load()
}

function openAdd() {
  Object.assign(form, { id: null, courseNo: '', name: '', credit: 0 })
  dialogVisible.value = true
}

function openEdit(row) {
  Object.assign(form, { ...row })
  dialogVisible.value = true
}

async function submit() {
  if (form.id) {
    await request.put('/courses', form)
  } else {
    await request.post('/courses', form)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  load()
}

async function remove(row) {
  await ElMessageBox.confirm(`确认删除课程「${row.name}」？相关成绩也会一并删除。`, '提示', { type: 'warning' })
  await request.delete(`/courses/${row.id}`)
  ElMessage.success('删除成功')
  load()
}

function handlePage(p) {
  page.current = p
  load()
}

onMounted(load)
</script>

<style scoped>
.search { margin-bottom: 12px; }
.pager { margin-top: 12px; justify-content: flex-end; }
</style>
