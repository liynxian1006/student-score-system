-- ============================================================
-- 学生成绩管理系统 数据库脚本
-- 数据库：MySQL 8.0
-- 执行方式（任选其一）：
--   1) 用 Navicat 新建查询，整段执行；
--   2) 命令行：mysql -uroot -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS `score_system`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `score_system`;

-- 学生表
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `student_no`  VARCHAR(20)  NOT NULL COMMENT '学号',
  `name`        VARCHAR(50)  NOT NULL COMMENT '姓名',
  `gender`      TINYINT      NOT NULL DEFAULT 1 COMMENT '1-男 2-女',
  `age`         INT          NULL COMMENT '年龄',
  `class_name`  VARCHAR(50)  NULL COMMENT '班级',
  `create_time` DATETIME     DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_student_no` (`student_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生表';

-- 课程表
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id`          BIGINT        NOT NULL AUTO_INCREMENT,
  `course_no`   VARCHAR(20)   NOT NULL COMMENT '课程号',
  `name`        VARCHAR(50)   NOT NULL COMMENT '课程名',
  `credit`      DECIMAL(3,1)  NOT NULL DEFAULT 0.0 COMMENT '学分',
  `create_time` DATETIME      DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_course_no` (`course_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='课程表';

-- 成绩表
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `student_id`  BIGINT       NOT NULL COMMENT '学生ID',
  `course_id`   BIGINT       NOT NULL COMMENT '课程ID',
  `score`       DECIMAL(5,2) NULL COMMENT '成绩',
  `exam_time`   DATETIME     NULL COMMENT '考试/录入时间',
  `create_time` DATETIME     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_stu_course` (`student_id`, `course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成绩表';

-- ===================== 示例数据 =====================

INSERT INTO `student` (`student_no`, `name`, `gender`, `age`, `class_name`) VALUES
('2024001', '张伟', 1, 20, '计算机2301'),
('2024002', '李娜', 2, 19, '计算机2301'),
('2024003', '王强', 1, 21, '软件2302'),
('2024004', '赵敏', 2, 20, '软件2302'),
('2024005', '刘洋', 1, 20, '计算机2301');

INSERT INTO `course` (`course_no`, `name`, `credit`) VALUES
('C001', '高等数学', 4.0),
('C002', '大学英语', 3.0),
('C003', '数据结构', 4.0),
('C004', 'Java程序设计', 3.5);

INSERT INTO `score` (`student_id`, `course_id`, `score`, `exam_time`) VALUES
(1, 1, 88.5, '2024-06-20 09:00:00'),
(1, 2, 76.0, '2024-06-21 09:00:00'),
(1, 3, 92.0, '2024-06-22 09:00:00'),
(2, 1, 95.0, '2024-06-20 09:00:00'),
(2, 2, 81.5, '2024-06-21 09:00:00'),
(2, 3, 88.0, '2024-06-22 09:00:00'),
(3, 1, 58.0, '2024-06-20 09:00:00'),
(3, 4, 67.5, '2024-06-23 09:00:00'),
(4, 2, 90.0, '2024-06-21 09:00:00'),
(4, 3, 73.0, '2024-06-22 09:00:00'),
(5, 1, 84.0, '2024-06-20 09:00:00'),
(5, 4, 79.5, '2024-06-23 09:00:00');
