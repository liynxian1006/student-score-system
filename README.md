# 学生成绩管理系统

基于 **SpringBoot + MyBatis-Plus + Vue3** 的 B/S 架构 JavaWeb 课程项目。
包含学生管理、课程管理、成绩管理（录入/查询/修改/删除）与统计报表（平均分排名、课程及格率等）。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 后端 | Spring Boot 3.2.5、MyBatis-Plus 3.5.7、JDK 17 |
| 前端 | Vue 3、Vite 5、Element Plus 2、Axios、Vue Router 4 |
| 数据库 | MySQL 8.0 |
| 接口 | RESTful JSON（统一响应 `{code,msg,data}`） |

> 与“中级项目”（Tlias 员工/部门管理）无重复，本题为**学生成绩管理**领域。

## 目录结构

```
student-score-system/
├── sql/schema.sql          # 建库建表 + 示例数据
├── backend/                # Spring Boot 后端
│   ├── pom.xml
│   └── src/main/java/com/example/scoresys/
│       ├── controller/     # 学生/课程/成绩/统计 接口
│       ├── service/        # 业务层
│       ├── mapper/         # MyBatis-Plus Mapper + 统计SQL
│       ├── entity/         # 实体与视图对象
│       └── config/         # CORS、分页、Jackson、自动填充
└── frontend/               # Vue3 前端
    └── src/
        ├── views/          # 四个页面
        ├── router/         # 路由
        └── utils/request.js# Axios 封装
```

## 运行步骤

### 1. 准备数据库
```bash
mysql -uroot -p < sql/schema.sql
# 或：在 Navicat 中新建查询，整段执行 sql/schema.sql
```
脚本会创建 `score_system` 库及 `student / course / score` 三张表，并写入示例数据。

### 2. 启动后端（端口 8080）
```bash
cd backend
mvn clean package -DskipTests
java -jar target/student-score-system-1.0.0.jar
```
> 若运行环境注入了 `SERVER__PORT` 等变量导致端口被占用，用
> `env -u SERVER__PORT -u SERVER__HOST java -jar target/student-score-system-1.0.0.jar` 启动。
> 数据库账号密码可经环境变量覆盖：`DB_USERNAME` / `DB_PASSWORD`（默认 root / 123456）。

### 3. 启动前端
开发模式（默认 5173，已配置 `/api` 代理到 8080）：
```bash
cd frontend
npm install
npm run dev
```
生产构建（生成 `frontend/dist`，可交由 Nginx / 静态服务器托管）：
```bash
npm run build
```

### 4. 访问
浏览器打开前端地址（如 `http://localhost:5173`），即可进行学生、课程、成绩的管理与统计查看。

## 主要接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/students/page` | 学生分页查询 |
| POST/PUT/DELETE | `/api/students` | 学生增改删（删学生级联删成绩） |
| GET | `/api/courses/page` | 课程分页查询 |
| POST/PUT/DELETE | `/api/courses` | 课程增改删 |
| GET | `/api/scores/page` | 成绩分页（关联学生/课程名） |
| POST/PUT/DELETE | `/api/scores` | 成绩增改删（同生同课唯一） |
| GET | `/api/stat/overview` | 概览（学生/课程/成绩数、总及格率） |
| GET | `/api/stat/student-rank` | 学生平均分排名 |
| GET | `/api/stat/course-stat` | 课程平均分与及格率 |
