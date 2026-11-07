package com.example.scoresys.controller;

import com.example.scoresys.common.Result;
import com.example.scoresys.service.StatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/stat")
public class StatController {

    private final StatService statService;

    public StatController(StatService statService) {
        this.statService = statService;
    }

    @GetMapping("/overview")
    public Result<Map<String, Object>> overview() {
        return Result.success(statService.overview());
    }

    @GetMapping("/student-rank")
    public Result<?> studentRank() {
        return Result.success(statService.studentRank());
    }

    @GetMapping("/course-stat")
    public Result<?> courseStat() {
        return Result.success(statService.courseStat());
    }
}
