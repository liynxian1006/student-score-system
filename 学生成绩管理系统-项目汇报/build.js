const PptxGenJS = require('pptxgenjs');
const path = require('path');

const BLUE = '2563EB', CYAN = '06B6D4', ORANGE = 'F59E0B', DARK = '1E293B',
      GRAY = '64748B', LIGHT = 'EFF6FF', BORDER = 'BFDBFE', WHITE = 'FFFFFF',
      CONCLUDE = '1E293B', LIGHTGRAY = 'F8FAFC';

const FONT = 'Microsoft YaHei';
const A = 'assets';
const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'W', width: 13.333, height: 7.5 });
pptx.layout = 'W';
pptx.author = '课程设计';
pptx.title = '学生成绩管理系统 · 课程设计汇报';

function header(slide, title) {
  slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.55, w: 0.08, h: 0.5, fill: { color: BLUE } });
  slide.addText(title, { x: 0.7, y: 0.5, w: 11, h: 0.6, fontFace: FONT, fontSize: 26, bold: true, color: DARK });
  slide.addShape(pptx.ShapeType.line, { x: 0.5, y: 1.2, w: 12.33, h: 0, line: { color: 'E2E8F0', width: 1 } });
}
function footer(slide, num) {
  slide.addText('学生成绩管理系统 · 课程设计汇报', { x: 0.5, y: 7.0, w: 6, h: 0.3, fontFace: FONT, fontSize: 11, color: '94A3B8' });
  slide.addText(`${num} / 12`, { x: 11.0, y: 7.0, w: 1.83, h: 0.3, fontFace: FONT, fontSize: 11, color: '94A3B8', align: 'right' });
}
function conclude(slide, text, y) {
  slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: y, w: 12.33, h: 0.55, fill: { color: CONCLUDE }, rectRadius: 0.08 });
  slide.addText(text, { x: 0.5, y: y, w: 12.33, h: 0.55, fontFace: FONT, fontSize: 14, color: WHITE, align: 'center', valign: 'middle' });
}

// ---------- Slide 1: Cover ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.16, h: 7.5, fill: { color: BLUE } });
  s.addText('课程设计汇报', { x: 0.9, y: 2.1, w: 8, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: BLUE, charSpacing: 3 });
  s.addText('学生成绩管理系统', { x: 0.9, y: 2.5, w: 11, h: 1.0, fontFace: FONT, fontSize: 50, bold: true, color: DARK });
  s.addText('基于 SpringBoot + Vue3 的前后端分离 Web 应用', { x: 0.9, y: 3.7, w: 11, h: 0.5, fontFace: FONT, fontSize: 20, color: GRAY });
  s.addShape(pptx.ShapeType.rect, { x: 0.92, y: 4.35, w: 1.2, h: 0.06, fill: { color: ORANGE } });
  s.addText(
    [
      { text: '课程：JavaWeb 开发技术', options: { fontFace: FONT, fontSize: 13, color: '94A3B8' } },
      { text: '    日期：2026.11', options: { fontFace: FONT, fontSize: 13, color: '94A3B8' } },
      { text: '    汇报人：__________', options: { fontFace: FONT, fontSize: 13, color: '94A3B8' } },
    ],
    { x: 0.9, y: 5.4, w: 11, h: 0.4 }
  );
}

// ---------- Slide 2: Catalog ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  s.addText('CONTENTS', { x: 0.7, y: 2.0, w: 4, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: BLUE, charSpacing: 4 });
  s.addText('目录', { x: 0.7, y: 2.35, w: 4, h: 1.0, fontFace: FONT, fontSize: 42, bold: true, color: DARK });
  s.addShape(pptx.ShapeType.rect, { x: 0.72, y: 3.5, w: 0.8, h: 0.06, fill: { color: ORANGE } });
  const items = [['01', '项目背景与选题'], ['02', '技术架构与数据库设计'], ['03', '功能模块与实现'], ['04', '项目演示与总结']];
  let y = 2.0;
  items.forEach(([n, t]) => {
    s.addText(n, { x: 6.0, y: y, w: 1.0, h: 0.8, fontFace: FONT, fontSize: 28, bold: true, color: BLUE });
    s.addText(t, { x: 7.1, y: y, w: 6, h: 0.8, fontFace: FONT, fontSize: 20, color: DARK, valign: 'middle' });
    s.addShape(pptx.ShapeType.line, { x: 6.0, y: y + 0.85, w: 6.3, h: 0, line: { color: 'E2E8F0', width: 1 } });
    y += 1.05;
  });
}

// ---------- Slide 3: 背景与选题 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '项目背景与选题');
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.5, w: 4.0, h: 4.4, fill: { color: BLUE }, rectRadius: 0.1 });
  s.addText('01', { x: 0.5, y: 2.1, w: 4.0, h: 1.2, fontFace: FONT, fontSize: 48, bold: true, color: WHITE, align: 'center' });
  s.addText('为什么做这个题目', { x: 0.5, y: 3.4, w: 4.0, h: 0.5, fontFace: FONT, fontSize: 18, color: 'DBEAFE', align: 'center' });
  const cards = [
    ['选题要求', '课程要求自选 JavaWeb 题目，须为 B/S 架构、含后端、前端与数据库存储。'],
    ['差异化定位', '中级项目为 Tlias（员工/部门管理），本选题改做「学生成绩管理」，避免重复。'],
    ['能力覆盖', '贴近教务真实场景，覆盖 CRUD、多表关联、聚合统计等核心知识点。'],
  ];
  let y = 1.5;
  cards.forEach(([t, d]) => {
    s.addShape(pptx.ShapeType.rect, { x: 4.9, y: y, w: 7.9, h: 1.32, fill: { color: LIGHT }, line: { color: BORDER, width: 1 }, rectRadius: 0.08 });
    s.addText(t, { x: 5.1, y: y + 0.12, w: 7.5, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color: DARK });
    s.addText(d, { x: 5.1, y: y + 0.55, w: 7.5, h: 0.7, fontFace: FONT, fontSize: 14, color: '475569', lineSpacingMultiple: 1.1 });
    y += 1.5;
  });
  conclude(s, '结论：以「学生—课程—成绩」三实体建模，完整覆盖 Web 全栈开发能力。', 6.2);
  footer(s, 3);
}

// ---------- Slide 4: 技术栈 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '技术栈');
  const cols = [
    ['前端', ['Vue 3 + Vite 5', 'Element Plus（UI 组件）', 'Axios（接口请求）', 'Vue Router（路由）']],
    ['后端', ['Spring Boot 3.2', 'MyBatis-Plus 3.5', 'RESTful 风格接口', '统一响应体 Result<T>']],
    ['数据存储', ['MySQL 8.0', '库名 score_system', '三张核心表', '示例数据已初始化']],
  ];
  let x = 0.5;
  cols.forEach(([t, list]) => {
    s.addShape(pptx.ShapeType.rect, { x: x, y: 1.6, w: 3.94, h: 4.0, fill: { color: LIGHT }, line: { color: BORDER, width: 1 }, rectRadius: 0.1 });
    s.addText(t, { x: x, y: 1.8, w: 3.94, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: BLUE, align: 'center' });
    s.addText(list.map((it) => ({ text: '· ' + it, options: { fontFace: FONT, fontSize: 15, color: '334155', breakLine: true, paraSpaceAfter: 10 } })),
      { x: x + 0.3, y: 2.5, w: 3.34, h: 3.0, valign: 'top' });
    x += 4.17;
  });
  conclude(s, '结论：前后端分离 + MyBatis-Plus，开发效率高、结构清晰，是主流 JavaWeb 技术组合。', 6.0);
  footer(s, 4);
}

// ---------- Slide 5: 系统架构 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '系统架构（前后端分离）');
  const boxes = [
    { x: 0.4, c: BLUE, t: ['前端 Vue3', 'Vite + Element Plus', '端口 5173'] },
    { x: 3.3, c: CYAN, t: ['Axios 请求', 'RESTful API'] },
    { x: 6.2, c: BLUE, t: ['SpringBoot 3', 'MyBatis-Plus', '端口 8080'] },
    { x: 9.1, c: DARK, t: ['MySQL 8.0', 'score_system 库', '持久化存储'] },
  ];
  const y = 2.6, w = 2.2, h = 1.4;
  boxes.forEach((b, i) => {
    s.addShape(pptx.ShapeType.rect, { x: b.x, y: y, w: w, h: h, fill: { color: b.c }, rectRadius: 0.1 });
    s.addText(b.t.map((line, j) => ({ text: line, options: { fontFace: FONT, fontSize: j === 0 ? 16 : 13, bold: j === 0, color: WHITE, align: 'center', breakLine: true, paraSpaceAfter: 4 } })),
      { x: b.x, y: y, w: w, h: h, valign: 'middle' });
    if (i < 3) s.addShape(pptx.ShapeType.line, { x: b.x + w, y: y + h / 2, w: 0.7, h: 0, line: { color: '94A3B8', width: 2, endArrowType: 'triangle' } });
  });
  s.addText('浏览器中的 Vue 前端经 Axios 调用后端 REST 接口，后端由 MyBatis-Plus 操作 MySQL 完成持久化。',
    { x: 0.5, y: 4.5, w: 12.33, h: 0.6, fontFace: FONT, fontSize: 15, color: '475569', align: 'center' });
  footer(s, 5);
}

// ---------- Slide 6: 数据库设计 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '数据库设计');
  const head = (t) => ({ text: t, options: { fill: { color: BLUE }, color: WHITE, bold: true, fontSize: 15, align: 'center', valign: 'middle' } });
  const rows = [
    [head('数据表'), head('主键'), head('核心字段'), head('关联关系')],
    ['student', 'id', 'student_no, name, gender, age, class_name', { text: '1 : N → score', options: { color: BLUE, bold: true, align: 'center', fontSize: 14 } }],
    [{ text: 'course', options: { fill: { color: LIGHTGRAY } } }, { text: 'id', options: { fill: { color: LIGHTGRAY } } }, { text: 'course_no, name, credit', options: { fill: { color: LIGHTGRAY } } }, { text: '1 : N → score', options: { color: BLUE, bold: true, align: 'center', fontSize: 14, fill: { color: LIGHTGRAY } } }],
    ['score', 'id', 'student_id, course_id, score, exam_time', { text: '唯一(student_id, course_id)', options: { color: ORANGE, bold: true, align: 'center', fontSize: 14 } }],
  ];
  s.addTable(rows, { x: 0.5, y: 1.7, w: 12.33, colW: [2.0, 1.3, 6.0, 3.03], rowH: [0.5, 0.9, 0.9, 0.9], fontSize: 14, fontFace: FONT, border: { type: 'solid', color: 'E2E8F0', pt: 1 }, align: 'center', valign: 'middle' });
  conclude(s, '三张表经 score 形成多对多关系；删除学生/课程时级联清空其成绩，保证数据一致性。', 6.0);
  footer(s, 6);
}

// ---------- Slide 7: 功能模块概览 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '功能模块概览');
  const mods = [
    ['学生管理', '学生信息增删改查、分页与按姓名/学号模糊搜索。'],
    ['课程管理', '课程信息维护，含课程编号、名称、学分等字段。'],
    ['成绩管理', '录入/修改成绩，关联学生与课程，防重复录入。'],
    ['统计报表', '概览、学生平均分排名、课程及格率等聚合统计。'],
  ];
  const pos = [[0.5, 1.6], [6.9, 1.6], [0.5, 3.4], [6.9, 3.4]];
  mods.forEach(([t, d], i) => {
    const [x, y] = pos[i];
    s.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 5.9, h: 1.6, fill: { color: LIGHT }, line: { color: BORDER, width: 1 }, rectRadius: 0.1 });
    s.addText(t, { x: x + 0.3, y: y + 0.2, w: 5.3, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: BLUE });
    s.addText(d, { x: x + 0.3, y: y + 0.75, w: 5.3, h: 0.7, fontFace: FONT, fontSize: 14, color: '475569', lineSpacingMultiple: 1.1 });
  });
  conclude(s, '结论：四个模块形成「录入 → 关联 → 统计」闭环，覆盖教务管理核心流程。', 5.4);
  footer(s, 7);
}

// ---------- Slide 8: 学生管理演示 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '核心功能演示 · 学生管理');
  s.addImage({ path: path.join(A, 'screen_student.png'), x: 0.5, y: 1.5, w: 7.6, h: 4.27 });
  s.addShape(pptx.ShapeType.rect, { x: 8.4, y: 1.5, w: 4.4, h: 4.27, fill: { color: LIGHT }, line: { color: BORDER, width: 1 }, rectRadius: 0.1 });
  s.addText('页面能力', { x: 8.6, y: 1.7, w: 4.0, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color: DARK });
  s.addText(
    ['· 表格分页展示全部学生', '· 按姓名 / 学号模糊搜索', '· 新增 / 编辑 / 删除操作', '· 删除时级联清除该生成绩'].map((t) => ({ text: t, options: { fontFace: FONT, fontSize: 14, color: '475569', breakLine: true, paraSpaceAfter: 12 } })),
    { x: 8.6, y: 2.3, w: 4.0, h: 2.4 });
  s.addShape(pptx.ShapeType.rect, { x: 8.6, y: 4.9, w: 4.0, h: 0.7, fill: { color: 'FFF7ED' }, line: { color: 'FED7AA', width: 1 }, rectRadius: 0.08 });
  s.addText('演示中已用「张」做姓名搜索，结果即时刷新。', { x: 8.7, y: 4.9, w: 3.8, h: 0.7, fontFace: FONT, fontSize: 12, color: '9A3412', valign: 'middle' });
  footer(s, 8);
}

// ---------- Slide 9: 课程/成绩/统计演示 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '核心功能演示 · 课程 / 成绩 / 统计');
  const imgs = [['screen_course.png', '课程管理'], ['screen_score.png', '成绩管理'], ['screen_stat.png', '统计报表']];
  let x = 0.5;
  imgs.forEach(([f, cap]) => {
    s.addShape(pptx.ShapeType.rect, { x: x, y: 1.6, w: 3.91, h: 2.5, fill: { color: WHITE }, line: { color: 'E2E8F0', width: 1 }, rectRadius: 0.08 });
    s.addImage({ path: path.join(A, f), x: x + 0.1, y: 1.7, w: 3.71, h: 2.09 });
    s.addText(cap, { x: x, y: 3.85, w: 3.91, h: 0.35, fontFace: FONT, fontSize: 14, color: GRAY, align: 'center' });
    x += 4.17;
  });
  conclude(s, '成绩页关联展示学生姓名与课程名称；统计页给出平均分排名与课程及格率等聚合结果。', 5.0);
  footer(s, 9);
}

// ---------- Slide 10: 关键技术点 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '关键技术点');
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.5, w: 3.6, h: 4.4, fill: { color: BLUE }, rectRadius: 0.1 });
  s.addText('6', { x: 0.5, y: 2.1, w: 3.6, h: 1.4, fontFace: FONT, fontSize: 60, bold: true, color: WHITE, align: 'center' });
  s.addText('个工程实践要点', { x: 0.5, y: 3.6, w: 3.6, h: 0.5, fontFace: FONT, fontSize: 17, color: 'DBEAFE', align: 'center' });
  const pts = [
    ['统一响应体', 'Result<T> 规范 {code,msg,data}'],
    ['分页拦截器', 'MyBatis-Plus 自动分页'],
    ['级联删除', '删学生/课程同步清成绩'],
    ['唯一约束', '同生同课不可重复录入'],
    ['全局 CORS', '解决前后端跨域'],
    ['日期格式', 'Jackson 统一 yyyy-MM-dd HH:mm:ss'],
  ];
  let y = 1.55;
  pts.forEach(([t, d]) => {
    s.addShape(pptx.ShapeType.rect, { x: 4.5, y: y, w: 0.12, h: 0.55, fill: { color: ORANGE } });
    s.addText([{ text: t + '：', options: { bold: true, color: DARK } }, { text: d, options: { color: '475569' } }],
      { x: 4.8, y: y, w: 8.0, h: 0.6, fontFace: FONT, fontSize: 15, valign: 'middle' });
    y += 0.72;
  });
  footer(s, 10);
}

// ---------- Slide 11: 项目总结 ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  header(s, '项目总结与收获');
  const cols = [
    ['已掌握能力', 'SpringBoot 工程搭建、MyBatis-Plus 持久层、Vue3 组件化开发、RESTful 接口设计与联调。'],
    ['工程亮点', '统一响应、分页、级联删除、唯一约束等细节处理完备，代码可直接运行并演示。'],
    ['可扩展方向', '增加登录鉴权、按班级/课程筛选、导出 Excel、接入 ECharts 可视化图表。'],
  ];
  let x = 0.5;
  cols.forEach(([t, d]) => {
    s.addShape(pptx.ShapeType.rect, { x: x, y: 1.6, w: 3.94, h: 4.0, fill: { color: LIGHT }, line: { color: BORDER, width: 1 }, rectRadius: 0.1 });
    s.addText(t, { x: x, y: 1.8, w: 3.94, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: BLUE, align: 'center' });
    s.addText(d, { x: x + 0.3, y: 2.5, w: 3.34, h: 3.0, fontFace: FONT, fontSize: 14, color: '475569', lineSpacingMultiple: 1.2 });
    x += 4.17;
  });
  conclude(s, '一句话总结：从零完成了一个可运行、可演示、结构规范的全栈 JavaWeb 课程项目。', 6.0);
  footer(s, 11);
}

// ---------- Slide 12: Ending ----------
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  s.addShape(pptx.ShapeType.rect, { x: 11.0, y: 0, w: 2.33, h: 2.33, fill: { color: BLUE }, rectRadius: 0, rotate: 0, transparency: 88 });
  s.addText('谢谢观看', { x: 0, y: 2.6, w: 13.33, h: 1.2, fontFace: FONT, fontSize: 56, bold: true, color: DARK, align: 'center' });
  s.addShape(pptx.ShapeType.rect, { x: 6.16, y: 3.95, w: 1.0, h: 0.06, fill: { color: ORANGE } });
  s.addText('请老师批评指正', { x: 0, y: 4.2, w: 13.33, h: 0.5, fontFace: FONT, fontSize: 22, color: GRAY, align: 'center' });
  s.addText(
    [
      { text: '课程：JavaWeb 开发技术', options: { fontFace: FONT, fontSize: 14, color: '94A3B8' } },
      { text: '    日期：2026.11', options: { fontFace: FONT, fontSize: 14, color: '94A3B8' } },
      { text: '    汇报人：__________', options: { fontFace: FONT, fontSize: 14, color: '94A3B8' } },
    ],
    { x: 0, y: 5.6, w: 13.33, h: 0.4, align: 'center' }
  );
}

const OUT = 'output.pptx';
pptx.writeFile({ fileName: OUT }).then(() => console.log('生成成功:', OUT)).catch((e) => { console.error('失败:', e); process.exit(1); });
