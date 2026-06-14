# CLAUDE_GUIDE.md — sic-util

> 基于真实代码深度剖析，2026-06-14

---

#### 🎯 精准技术栈

| 维度 | 选型 |
|---|---|
| 语言 | 纯 TypeScript（无 React/UI 依赖） |
| 构建 | Rollup 4（输出 CJS + ESM + 类型声明三格式） |
| 文档 | VitePress + @microsoft/api-extractor + api-documenter |
| 测试 | Vitest |
| 依赖 | crypto-js、jsencrypt（RSA 加密）、dayjs、detect-browser、print-js、uuid、number-precision、china-division |

---

#### 📂 文件组织与命名微观规范

**目录划分：按模块功能划分**

```
src/
├── index.ts           # 入口（自动聚合：export * from "iem:./modules/**/*"）
├── iem.d.ts           # 全局类型声明
├── types/
│   └── index.ts       # 公共类型（TableHeaderItem、KeyVal、ResourceItem）
├── constant/
│   └── city.ts        # 城市数据（china-division）
└── modules/
    ├── validation.ts  # 表单验证规则（val_ 前缀）
    ├── number.ts      # 数字处理（num_ 前缀）
    ├── author.ts      # 权限/路由/加密（author_ 前缀）
    ├── file.ts        # 文件处理（file_ 前缀）
    ├── other.ts       # 杂项工具（sys_ / tem_ 前缀）
    ├── color.ts       # 颜色处理
    ├── cityOptions.ts # 城市选项
    └── demo.ts        # 示例
```

**文件命名规则**：
- 模块文件：**camelCase**（`validation.ts`、`number.ts`）
- 类型文件：`types/index.ts`

**导出规范**：
- 入口自动聚合，无需手动在 `index.ts` 添加
- 函数强制命名导出：`export const xxx = () => {}`
- 严禁 `export default`

**新增工具函数指引**：
```
1. 在 src/modules/ 下对应模块追加，或新建模块文件
2. 函数必须有 JSDoc 注释
3. 入口自动聚合，无需修改 index.ts
4. 验证函数返回 Promise（兼容 antd Form rules）
```

---

#### 💻 代码书写风格指纹

**1. 函数定义：命名导出 + 箭头函数 + JSDoc**

```tsx
// ✅ 本项目标准写法
/**
 * 生成TraceId
 * @param {string} origin 请求源（请求发起方）
 * @param {string} url 请求url
 * @returns - traceId，例如 "os-os-1d677771-4e85-460d-b669-682077a5067f"
 */
export const author_traceId = (origin: string, url: string): string => {
  const randomString = uuidv4();
  let traceId = randomString ?? "";
  if (origin && url) {
    if (url.includes("os_service")) {
      traceId = `${origin}-os-${randomString}`;
    }
    // ...
  }
  return traceId;
};

// ❌ 严禁的写法
export default function author_traceId() { }  // 默认导出
```

**2. 命名约定：前缀系统**

```tsx
// ✅ 验证函数：val_ 前缀
export const val_amount = (_: any, value: any) => { /* ... */ };
export const val_phone = (_: any, value: any) => { /* ... */ };
export const val_idcard = (_rule: any, value: any) => { /* ... */ };

// ✅ 数字函数：num_ 前缀
export const num_expand = (amount: any, unit = 100, accuracy = 2) => { /* ... */ };
export const num_expand_100 = (amount: any, accuracy = 2) => { /* ... */ };
export const num_reduce = (amount: any, unit: number = 100) => { /* ... */ };
export const num_text = (number: any, type = "upper") => { /* ... */ };

// ✅ 权限函数：author_ 前缀
export const author_strict = (list: ResourceItem[], id: number) => { /* ... */ };
export const author_rsa = (pubKey: string, password: string) => { /* ... */ };

// ✅ 系统函数：sys_ 前缀
export const sys_print = (props: { url: string }) => { /* ... */ };
export const sys_detectBrowser = () => { /* ... */ };

// ✅ 模板函数：tem_ 前缀
export const tem_get_tableHeader = (keyVal, cache, initial) => { /* ... */ };
```

**3. 验证函数：Promise 格式（兼容 antd Form rules）**

```tsx
// ✅ 本项目标准写法
export const val_amount = (_: any, value: any) => {
  if (value) {
    if (/\s/.test(value)) {
      return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
    } else if (isNaN(Number(value))) {
      return Promise.reject(new Error("请输入有效的数字文本！"));
    } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      return Promise.reject(new Error("最多支持两位小数！"));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};

// ❌ 严禁的写法：返回 boolean
export const val_amount = (value: any) => !!value && !isNaN(value);
```

**4. 数字精度：number-precision 库**

```tsx
// ✅ 本项目标准写法
import Num from "number-precision";

export const num_expand = (amount: any, unit = 100, accuracy = 2) => {
  if (amount || amount === 0) {
    const realAmount = Num.divide(amount, unit).toFixed(accuracy);
    return realAmount;
  } else {
    return amount;
  }
};

// ❌ 严禁的写法：原生 toFixed
(amount / 100).toFixed(2);  // 精度问题
```

**5. 类型定义：types/index.ts 统一管理**

```tsx
// ✅ 本项目标准写法
export interface TableHeaderItem {
  key?: string;
  name?: string;
  width?: number;
  sort?: number;
  selected?: boolean;
}

export interface ResourceItem {
  resourceId: number;
  resourceName?: string;
  key?: string;
  element?: any;
  more?: boolean;
}
```

---

#### 🚫 AI 行为强制约束

1. **严禁引入 React 或任何 UI 库**：这是纯工具库。
2. **所有函数必须有 JSDoc 注释**：用于 `@microsoft/api-extractor` 生成文档。
3. **金额计算必须用 `number-precision`**，严禁原生 `toFixed` 或手动除法。
4. **生成代码前必须声明**：当前模块名、函数前缀、是否有 JSDoc。
