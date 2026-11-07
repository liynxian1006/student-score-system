package com.example.scoresys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.scoresys.entity.Course;
import com.example.scoresys.mapper.CourseMapper;
import com.example.scoresys.service.CourseService;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course> implements CourseService {
}
