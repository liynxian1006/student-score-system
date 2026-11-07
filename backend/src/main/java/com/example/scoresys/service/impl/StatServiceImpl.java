package com.example.scoresys.service.impl;

import com.example.scoresys.entity.CourseStatVO;
import com.example.scoresys.entity.StudentStatVO;
import com.example.scoresys.mapper.ScoreMapper;
import com.example.scoresys.service.StatService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatServiceImpl implements StatService {

    private final ScoreMapper scoreMapper;

    public StatServiceImpl(ScoreMapper scoreMapper) {
        this.scoreMapper = scoreMapper;
    }

    @Override
    public Map<String, Object> overview() {
        Map<String, Object> map = new HashMap<>(8);
        map.put("studentCount", scoreMapper.countStudent());
        map.put("courseCount", scoreMapper.countCourse());
        map.put("scoreCount", scoreMapper.countScore());
        BigDecimal passRate = scoreMapper.overallPassRate();
        map.put("passRate", passRate == null ? BigDecimal.ZERO : passRate);
        return map;
    }

    @Override
    public List<StudentStatVO> studentRank() {
        return scoreMapper.selectStudentStat();
    }

    @Override
    public List<CourseStatVO> courseStat() {
        return scoreMapper.selectCourseStat();
    }
}
