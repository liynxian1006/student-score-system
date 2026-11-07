<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="query" class="search">
        <el-form-item label="学生姓名">
          <el-input v-model="query.studentName" placeholder="学生姓名" clearable @keyup.enter="load" />
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="query.courseName" placeholder="课程名称" clearable @keyup.enter="load" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="load">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="success" @click="openAdd">录入成绩</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column prop="studentNo" label="学号" />
        <el-table-column prop="studentName" label="姓名" />
        <el-table-column prop="courseNo" label="课程号" />
        <el-table-column prop="courseName" label="课程" />
        <el-table-column prop="score" label="成绩" width="100" />
        <el-table-column prop="examTime" label="考试时间" />
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

      <el-dialog v-model="dialogVisible" :title="form.id ? '编辑成绩' : '录入成绩'" width="460px">
        <el-form :model="form" label-width="80px">
          <el-form-item label="学生">
            <el-select v-model="form.studentId" placeholder="选择学生" :disabled="!!form.id" filterable style="width: 100%">
              <el-option v-for="o in studentOptions" :key="o.id" :label="o.label" :value="o.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程">
            <el-select v-model="form.courseId" placeholder="选择课程" :disabled="!!form.id" filterable style="width: 100%">
              <el-option v-for="o in courseOptions" :key="o.id" :label="o.label" :value="o.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="成绩">
            <el-input-number v-model="form.score" :min="0" :max="100" :precision="2" style="width: 100%" />
          </el-form-item>
          <el-form-item label="考试时间">
            <el-date-picker v-model="form.examTime" type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择考试时间" style="width: 100%" />
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
const query = reactive({ studentName: '', courseName: '' })
const studentOptions = ref([])
const courseOptions = ref([])

const dialogVisible = ref(false)
const form = reactive({ id: null, studentId: null, courseId: null, score: null, examTime: '' })

async function load() {
  loading.value = true
  try {
    const data = await request.get('/scores/page', { params: { current: page.current, size: page.size, ...query } })
    tableData.value = data.records
    total.value = data.total
  } finally {
    loading.value = false
  }
}

function reset() {
  query.studentName = ''
  query.courseName = ''
  page.current = 1
  load()
}

async function loadOptions() {
  studentOptions.value = await request.get('/students/list')
  courseOptions.value = await request.get('/courses/list')
}

function openAdd() {
  Object.assign(form, { id: null, studentId: null, courseId: null, score: null, examTime: '' })
  dialogVisible.value = true
}

function openEdit(row) {
  Object.assign(form, {
    id: row.id,
    studentId: row.studentId,
    courseId: row.courseId,
    score: row.score,
    examTime: row.examTime
  })
  dialogVisible.value = true
}

async function submit() {
  if (form.id) {
    await request.put('/scores', form)
  } else {
    await request.post('/scores', form)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  load()
}

async function remove(row) {
  await ElMessageBox.confirm('确认删除该成绩记录？', '提示', { type: 'warning' })
  await request.delete(`/scores/${row.id}`)
  ElMessage.success('删除成功')
  load()
}

function handlePage(p) {
  page.current = p
  load()
}

onMounted(() => {
  loadOptions()
  load()
})
</script>

<style scoped>
.search { margin-bottom: 12px; }
.pager { margin-top: 12px; justify-content: flex-end; }
</style>
