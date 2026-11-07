const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    recordVideo: { dir: __dirname, size: { width: 1366, height: 768 } }
  });
  const page = await context.newPage();
  const log = (m) => console.log('[rec]', m);

  const wait = (ms) => page.waitForTimeout(ms);
  const clickMenu = async (name) => {
    log('导航 -> ' + name);
    await page.click(`text=${name}`, { timeout: 10000 });
    await wait(2000);
  };

  try {
    log('打开前端首页 http://localhost:5173');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    await wait(1800);

    // 1) 学生管理：演示搜索
    await clickMenu('学生管理');
    try {
      const box = page.locator('input[placeholder*="姓名"], input[placeholder*="学号"], .el-input__inner').first();
      await box.fill('张');
      await page.click('text=查询');
      log('执行搜索：姓名含「张」');
      await wait(1800);
      await box.fill('');
      await page.click('text=查询');
      await wait(1400);
    } catch (e) { log('搜索演示跳过: ' + e.message); }

    // 2) 课程管理
    await clickMenu('课程管理');

    // 3) 成绩管理
    await clickMenu('成绩管理');

    // 4) 统计报表（停留久一点看图表）
    await clickMenu('统计报表');
    await wait(2800);

    log('走查完成');
  } catch (e) {
    log('ERROR: ' + e.message);
  } finally {
    await context.close();
    await browser.close();
  }

  // 找到刚生成的 webm 并重命名为 demo.webm
  const files = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.webm'))
    .map(f => ({ f, t: fs.statSync(path.join(__dirname, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  if (files.length) {
    fs.renameSync(path.join(__dirname, files[0].f), path.join(__dirname, 'demo.webm'));
    log('视频已保存: demo.webm');
  } else {
    log('未找到生成的 webm 文件');
  }
})();
