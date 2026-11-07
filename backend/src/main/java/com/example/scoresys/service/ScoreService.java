package com.example.scoresys.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.scoresys.entity.Score;
import com.example.scoresys.entity.ScoreVO;

public interface ScoreService extends IService<Score> {
    /** 分页查询成绩（关联学生、课程信息） */
    IPage<ScoreVO> scorePage(long current, long size, String studentName, String courseName);
}
