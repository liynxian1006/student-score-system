package com.example.scoresys.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.scoresys.entity.Score;
import com.example.scoresys.entity.ScoreVO;
import com.example.scoresys.mapper.ScoreMapper;
import com.example.scoresys.service.ScoreService;
import org.springframework.stereotype.Service;

@Service
public class ScoreServiceImpl extends ServiceImpl<ScoreMapper, Score> implements ScoreService {
    @Override
    public IPage<ScoreVO> scorePage(long current, long size, String studentName, String courseName) {
        Page<ScoreVO> page = new Page<>(current, size);
        return baseMapper.selectScorePage(page, studentName, courseName);
    }
}
