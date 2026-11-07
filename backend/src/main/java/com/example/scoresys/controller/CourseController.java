package com.example.scoresys.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.scoresys.common.OptionVO;
import com.example.scoresys.common.Result;
import com.example.scoresys.entity.Course;
import com.example.scoresys.service.CourseService;
import com.example.scoresys.service.ScoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final ScoreService scoreService;

    public CourseController(CourseService courseService, ScoreService scoreService) {
        this.courseService = courseService;
        this.scoreService = scoreService;
    }

    @GetMapping("/page")
    public Result<IPage<Course>> page(@RequestParam(defaultValue = "1") long current,
                                      @RequestParam(defaultValue = "10") long size,
                                      @RequestParam(required = false) String name) {
        Page<Course> page = new Page<>(current, size);
        var qw = Wrappers.<Course>query();
        if (name != null && !name.isBlank()) qw.like("name", name);
        qw.orderByDesc("id");
        return Result.success(courseService.page(page, qw));
    }

    @GetMapping("/list")
    public Result<List<OptionVO>> list() {
        List<OptionVO> options = courseService.list().stream()
                .map(c -> new OptionVO(c.getId(), c.getName() + "（" + c.getCourseNo() + "）"))
                .collect(Collectors.toList());
        return Result.success(options);
    }

    @GetMapping("/{id}")
    public Result<Course> get(@PathVariable Long id) {
        return Result.success(courseService.getById(id));
    }

    @PostMapping
    public Result<Void> add(@RequestBody Course course) {
        if (courseService.count(Wrappers.<Course>query().eq("course_no", course.getCourseNo())) > 0) {
            return Result.error("课程号已存在");
        }
        courseService.save(course);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody Course course) {
        if (course.getId() == null) return Result.error("ID不能为空");
        courseService.updateById(course);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        // 级联删除该课程的成绩记录
        scoreService.remove(Wrappers.<com.example.scoresys.entity.Score>query().eq("course_id", id));
        courseService.removeById(id);
        return Result.success();
    }
}
