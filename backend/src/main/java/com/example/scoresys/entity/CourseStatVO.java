package com.example.scoresys.entity;

import lombok.Data;

import java.math.BigDecimal;

/** 课程成绩统计视图对象 */
@Data
public class CourseStatVO {
    private Long courseId;
    private String courseNo;
    private String courseName;
    /** 参考人数 */
    private Long studentCount;
    /** 平均分 */
    private BigDecimal avgScore;
    /** 及格率（百分比，如 85.50 表示 85.50%） */
    private BigDecimal passRate;
}
