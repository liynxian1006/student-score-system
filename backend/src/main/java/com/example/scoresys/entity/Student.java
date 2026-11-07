package com.example.scoresys.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("student")
public class Student {
    @TableId(type = IdType.AUTO)
    private Long id;

    /** 学号 */
    private String studentNo;

    /** 姓名 */
    private String name;

    /** 性别：1-男 2-女 */
    private Integer gender;

    /** 年龄 */
    private Integer age;

    /** 班级 */
    private String className;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
