package com.example.scoresys.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.scoresys.common.Result;
import com.example.scoresys.entity.Score;
import com.example.scoresys.entity.ScoreVO;
import com.example.scoresys.service.CourseService;
import com.example.scoresys.service.ScoreService;
import com.example.scoresys.service.StudentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;
    private final StudentService studentService;
    private final CourseService courseService;

    public ScoreController(ScoreService scoreService, StudentService studentService, CourseService courseService) {
        this.scoreService = scoreService;
        this.studentService = studentService;
        this.courseService = courseService;
    }

    @GetMapping("/page")
    public Result<IPage<ScoreVO>> page(@RequestParam(defaultValue = "1") long current,
                                       @RequestParam(defaultValue = "10") long size,
                                       @RequestParam(required = false) String studentName,
                                       @RequestParam(required = false) String courseName) {
        return Result.success(scoreService.scorePage(current, size, studentName, courseName));
    }

    @PostMapping
    public Result<Void> add(@RequestBody Score score) {
        if (score.getStudentId() == null || score.getCourseId() == null) {
            return Result.error("学生与课程不能为空");
        }
        if (studentService.getById(score.getStudentId()) == null) return Result.error("学生不存在");
        if (courseService.getById(score.getCourseId()) == null) return Result.error("课程不存在");
        if (scoreService.count(Wrappers.<Score>query()
                .eq("student_id", score.getStudentId())
                .eq("course_id", score.getCourseId())) > 0) {
            return Result.error("该学生此课程成绩已存在");
        }
        scoreService.save(score);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody Score score) {
        if (score.getId() == null) return Result.error("ID不能为空");
        scoreService.updateById(score);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        scoreService.removeById(id);
        return Result.success();
    }
}
