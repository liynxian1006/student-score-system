package com.example.scoresys.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.scoresys.common.OptionVO;
import com.example.scoresys.common.Result;
import com.example.scoresys.entity.Student;
import com.example.scoresys.service.ScoreService;
import com.example.scoresys.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;
    private final ScoreService scoreService;

    public StudentController(StudentService studentService, ScoreService scoreService) {
        this.studentService = studentService;
        this.scoreService = scoreService;
    }

    @GetMapping("/page")
    public Result<IPage<Student>> page(@RequestParam(defaultValue = "1") long current,
                                       @RequestParam(defaultValue = "10") long size,
                                       @RequestParam(required = false) String name,
                                       @RequestParam(required = false) String className) {
        Page<Student> page = new Page<>(current, size);
        var qw = Wrappers.<Student>query();
        if (name != null && !name.isBlank()) qw.like("name", name);
        if (className != null && !className.isBlank()) qw.like("class_name", className);
        qw.orderByDesc("id");
        return Result.success(studentService.page(page, qw));
    }

    @GetMapping("/list")
    public Result<List<OptionVO>> list() {
        List<OptionVO> options = studentService.list().stream()
                .map(s -> new OptionVO(s.getId(), s.getName() + "（" + s.getStudentNo() + "）"))
                .collect(Collectors.toList());
        return Result.success(options);
    }

    @GetMapping("/{id}")
    public Result<Student> get(@PathVariable Long id) {
        return Result.success(studentService.getById(id));
    }

    @PostMapping
    public Result<Void> add(@RequestBody Student student) {
        if (studentService.count(Wrappers.<Student>query().eq("student_no", student.getStudentNo())) > 0) {
            return Result.error("学号已存在");
        }
        studentService.save(student);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody Student student) {
        if (student.getId() == null) return Result.error("ID不能为空");
        studentService.updateById(student);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        // 级联删除该学生的成绩记录，避免产生孤儿数据
        scoreService.remove(Wrappers.<com.example.scoresys.entity.Score>query().eq("student_id", id));
        studentService.removeById(id);
        return Result.success();
    }
}
