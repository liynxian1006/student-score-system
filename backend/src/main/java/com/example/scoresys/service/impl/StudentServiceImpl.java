package com.example.scoresys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.scoresys.entity.Student;
import com.example.scoresys.mapper.StudentMapper;
import com.example.scoresys.service.StudentService;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl extends ServiceImpl<StudentMapper, Student> implements StudentService {
}
