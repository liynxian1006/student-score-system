package com.example.scoresys.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("score")
public class Score {
    @TableId(type = IdType.AUTO)
    private Long id;

    /** 学生ID */
    private Long studentId;

    /** 课程ID */
    private Long courseId;

    /** 成绩 */
    private BigDecimal score;

    /** 考试/录入时间 */
    private LocalDateTime examTime;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
