package com.example.scoresys.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** 成绩列表展示视图对象（关联学生姓名、课程名） */
@Data
public class ScoreVO {
    private Long id;
    private Long studentId;
    private String studentNo;
    private String studentName;
    private Long courseId;
    private String courseNo;
    private String courseName;
    private BigDecimal score;
    private LocalDateTime examTime;
}
