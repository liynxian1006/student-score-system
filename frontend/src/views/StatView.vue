<template>
  <div>
    <el-row :gutter="16" class="cards">
      <el-col :span="6">
        <el-card shadow="hover"><div class="kpi">
          <div class="num">{{ overview.studentCount }}</div><div class="lbl">学生总数</div>
        </div></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"><div class="kpi">
          <div class="num">{{ overview.courseCount }}</div><div class="lbl">课程总数</div>
        </div></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"><div class="kpi">
          <div class="num">{{ overview.scoreCount }}</div><div class="lbl">成绩记录数</div>
        </div></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"><div class="kpi">
          <div class="num">{{ overview.passRate }}%</div><div class="lbl">总及格率</div>
        </div></el-card>
      </el-col>
    </el-row>

    <el-card class="block">
      <template #header>学生成绩排名（按平均分降序）</template>
      <el-table :data="studentRank" border stripe>
        <el-table-column type="index" label="排名" width="80" />
        <el-table-column prop="studentNo" label="学号" />
        <el-table-column prop="studentName" label="姓名" />
        <el-table-column prop="courseCount" label="已修课程数" width="130" />
        <el-table-column prop="avgScore" label="平均分" width="120" sortable />
      </el-table>
    </el-card>

    <el-card class="block">
      <template #header>课程成绩统计</template>
      <el-table :data="courseStat" border stripe>
        <el-table-column prop="courseNo" label="课程号" />
        <el-table-column prop="courseName" label="课程" />
        <el-table-column prop="studentCount" label="参考人数" width="120" />
        <el-table-column prop="avgScore" label="平均分" width="120" sortable />
        <el-table-column label="及格率" width="120">
          <template #default="{ row }">{{ row.passRate }}%</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

const overview = ref({ studentCount: 0, courseCount: 0, scoreCount: 0, passRate: 0 })
const studentRank = ref([])
const courseStat = ref([])

async function load() {
  overview.value = await request.get('/stat/overview')
  studentRank.value = await request.get('/stat/student-rank')
  courseStat.value = await request.get('/stat/course-stat')
}

onMounted(load)
</script>

<style scoped>
.cards { margin-bottom: 16px; }
.kpi { text-align: center; }
.kpi .num { font-size: 28px; font-weight: bold; color: #409eff; }
.kpi .lbl { color: #909399; margin-top: 4px; }
.block { margin-bottom: 16px; }
</style>
