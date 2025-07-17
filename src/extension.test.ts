import { describe, expect, it } from "vitest";

// 示例函数
function add(a: number, b: number): number {
  return a + b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 测试套件
describe("数学函数测试", () => {
  it("应该正确相加两个数字", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  it("应该正确相乘两个数字", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });
});

describe("字符串函数测试", () => {
  it("应该正确地将字符串首字母大写", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("WORLD")).toBe("World");
    expect(capitalize("")).toBe("");
  });

  it("应该处理特殊情况", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("123abc")).toBe("123abc");
  });
});
