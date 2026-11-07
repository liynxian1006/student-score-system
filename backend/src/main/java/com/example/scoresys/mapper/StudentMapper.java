package com.example.scoresys.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.scoresys.entity.Student;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudentMapper extends BaseMapper<Student> {
}
