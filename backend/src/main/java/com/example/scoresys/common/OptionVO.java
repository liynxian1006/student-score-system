package com.example.scoresys.common;

import lombok.Data;

/** 下拉选项：前端选择学生/课程时使用 */
@Data
public class OptionVO {
    private Long id;
    private String label;

    public OptionVO(Long id, String label) {
        this.id = id;
        this.label = label;
    }
}
