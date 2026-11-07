package com.example.scoresys.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.scoresys.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ScoreMapper extends BaseMapper<Score> {

    /**
     * 分页查询成绩列表，关联学生与课程信息。
     */
    @Select("<script>" +
            "SELECT s.id, s.student_id AS studentId, st.student_no AS studentNo, st.name AS studentName, " +
            "       s.course_id AS courseId, c.course_no AS courseNo, c.name AS courseName, s.score, s.exam_time AS examTime " +
            "FROM score s " +
            "LEFT JOIN student st ON s.student_id = st.id " +
            "LEFT JOIN course c ON s.course_id = c.id " +
            "WHERE 1=1 " +
            "<if test='studentName != null and studentName != \"\"'> AND st.name LIKE CONCAT('%', #{studentName}, '%') </if>" +
            "<if test='courseName != null and courseName != \"\"'> AND c.name LIKE CONCAT('%', #{courseName}, '%') </if>" +
            "ORDER BY s.id DESC" +
            "</script>")
    IPage<ScoreVO> selectScorePage(IPage<ScoreVO> page,
                                   @Param("studentName") String studentName,
                                   @Param("courseName") String courseName);

    /** 学生成绩统计：每个学生的已修课程数与平均分（降序） */
    @Select("SELECT st.id AS studentId, st.student_no AS studentNo, st.name AS studentName, " +
            "       COALESCE(COUNT(s.id),0) AS courseCount, " +
            "       COALESCE(ROUND(AVG(s.score),2),0) AS avgScore " +
            "FROM student st LEFT JOIN score s ON st.id = s.student_id " +
            "GROUP BY st.id, st.student_no, st.name ORDER BY avgScore DESC")
    List<StudentStatVO> selectStudentStat();

    /** 课程成绩统计：每门课的参考人数、平均分与及格率 */
    @Select("SELECT c.id AS courseId, c.course_no AS courseNo, c.name AS courseName, " +
            "       COALESCE(COUNT(s.id),0) AS studentCount, " +
            "       COALESCE(ROUND(AVG(s.score),2),0) AS avgScore, " +
            "       COALESCE(ROUND(SUM(CASE WHEN s.score >= 60 THEN 1 ELSE 0 END)*100.0/NULLIF(COUNT(s.id),0),2),0) AS passRate " +
            "FROM course c LEFT JOIN score s ON c.id = s.course_id " +
            "GROUP BY c.id, c.course_no, c.name ORDER BY avgScore DESC")
    List<CourseStatVO> selectCourseStat();

    @Select("SELECT COUNT(*) FROM student")
    int countStudent();

    @Select("SELECT COUNT(*) FROM course")
    int countCourse();

    @Select("SELECT COUNT(*) FROM score")
    int countScore();

    @Select("SELECT COALESCE(ROUND(SUM(CASE WHEN score >= 60 THEN 1 ELSE 0 END)*100.0/NULLIF(COUNT(*),0),2),0) FROM score")
    java.math.BigDecimal overallPassRate();
}
