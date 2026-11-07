package com.example.scoresys.common;

import lombok.Data;

/**
 * 统一接口响应结构：{ code, msg, data }
 * code = 0 表示成功，非 0 表示业务/系统错误。
 */
@Data
public class Result<T> {
    private int code;
    private String msg;
    private T data;

    private Result(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(0, "success", data);
    }

    public static <T> Result<T> success() {
        return new Result<>(0, "success", null);
    }

    public static <T> Result<T> error(String msg) {
        return new Result<>(1, msg, null);
    }
}
