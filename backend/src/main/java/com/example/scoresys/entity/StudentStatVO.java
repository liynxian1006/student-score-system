package com.example.scoresys.entity;

import lombok.Data;

import java.math.BigDecimal;

/** 学生成绩统计视图对象 */
@Data
public class StudentStatVO {
    private Long studentId;
    private String studentNo;
    private String studentName;
    /** 已修课程数 */
    private Long courseCount;
    /** 平均分 */
    private BigDecimal avgScore;
}
