package com.example.scoresys.service;

import com.example.scoresys.entity.CourseStatVO;
import com.example.scoresys.entity.StudentStatVO;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface StatService {
    /** 概览数据：学生数、课程数、成绩记录数、总及格率 */
    Map<String, Object> overview();

    /** 学生成绩排名（按平均分降序） */
    List<StudentStatVO> studentRank();

    /** 课程成绩统计（平均分、及格率） */
    List<CourseStatVO> courseStat();
}
