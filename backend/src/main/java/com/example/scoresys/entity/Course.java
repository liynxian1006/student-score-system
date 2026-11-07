package com.example.scoresys.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("course")
public class Course {
    @TableId(type = IdType.AUTO)
    private Long id;

    /** 课程号 */
    private String courseNo;

    /** 课程名 */
    private String name;

    /** 学分 */
    private BigDecimal credit;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
