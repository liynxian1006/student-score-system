<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">
      <div class="logo">成绩管理系统</div>
      <el-menu
        :default-active="activeMenu"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
      >
        <el-menu-item index="/students">
          <el-icon><User /></el-icon><span>学生管理</span>
        </el-menu-item>
        <el-menu-item index="/courses">
          <el-icon><Notebook /></el-icon><span>课程管理</span>
        </el-menu-item>
        <el-menu-item index="/scores">
          <el-icon><EditPen /></el-icon><span>成绩管理</span>
        </el-menu-item>
        <el-menu-item index="/stat">
          <el-icon><DataLine /></el-icon><span>统计报表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <span class="title">{{ currentTitle }}</span>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
const currentTitle = computed(() => route.meta.title || '学生成绩管理系统')
</script>

<style scoped>
.layout { height: 100vh; }
.aside { background-color: #304156; }
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  background-color: #2b3a4d;
}
.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}
.title { font-size: 18px; font-weight: 600; color: #303133; }
.main { background-color: #f0f2f5; padding: 16px; }
</style>
