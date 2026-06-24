# CLAUDE.md - sic-util 项目指南

## 项目概览

| 属性 | 值 |
|------|-----|
| 名称 | sic-util |
| 版本 | 0.2.9 |
| 描述 | 通用工具函数库（A universal tool function repository） |
| 许可证 | MIT |
| 包类型 | ES Module (`"type": "module"`) |
| 文档站点 | https://sic-web.github.io/sic-util/ |

### 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 语言 | TypeScript | ^5.4.5 |
| 构建工具 | Rollup | ^4.14.3 |
| 单元测试 | Vitest | ^1.5.0 |
| 文档生成 | VitePress | ^1.1.0 |
| API 文档 | @microsoft/api-extractor + api-documenter | ^7.43.1 / ^7.24.2 |
| 代码检查 | ESLint | ^9.0.0 |
| 类型声明生成 | rollup-plugin-dts | ^6.1.0 |

### 核心依赖

| 依赖 | 用途 |
|------|------|
| dayjs | 时间日期处理 |
| crypto-js | MD5 等加密计算 |
| jsencrypt | RSA 加密（密码传输） |
| uuid | 生成唯一标识（TraceId） |
| number-precision | 精确数字运算（避免浮点精度丢失） |
| print-js | 浏览器打印功能 |
| detect-browser | 浏览器版本检测 |
| china-division | 中国省市区数据 |

### 输出格式

构建产物同时输出三种格式：
- **ESM**: `dist/esm/` — ES Module，支持 tree-shaking
- **CJS**: `dist/cjs/` — CommonJS，兼容 Node.js require
- **UMD**: `dist/umd/index.js` — 通用格式，全局变量名为 `utils`
- **类型声明**: `dist/types/` — TypeScript 类型定义

---

## 目录结构说明

```
sic-util/
├── src/
│   ├── index.ts              # 入口文件，使用 iem:./modules/**/* 自动导出所有模块
│   ├── iem.d.ts              # iem: 前缀模块的类型声明
│   ├── types/
│   │   └── index.ts          # 公共类型定义（RgbColor, ResourceItem, TableHeaderItem, KeyVal）
│   ├── constant/
│   │   └── city.ts           # 中国省市区静态数据（二级/三级联动数据）
│   └── modules/              # 工具函数模块（按功能分类）
│       ├── author.ts         # 认证/权限/路由相关工具
│       ├── cityOptions.ts    # 城市选择器工具
│       ├── color.ts          # 颜色转换/主题色生成工具
│       ├── file.ts           # 文件操作工具（MD5、下载、预览）
│       ├── number.ts         # 数字/金额处理工具
│       ├── other.ts          # 杂项工具（打印、浏览器检测、表头处理、视频预览等）
│       ├── validation.ts     # 表单校验规则工具
│       └── demo.ts           # 示例模块（可删除）
├── test/                     # 单元测试（文件名与 modules 一一对应：xxx.spec.ts）
├── doc/                      # API 文档输出（api-extractor + api-documenter 生成的 Markdown）
├── .vitepress/               # VitePress 文档站点配置
├── rollup.config.js          # Rollup 构建配置（ESM/CJS/UMD/types 四种输出）
├── tsconfig.json             # TypeScript 配置
├── vitest.config.js          # Vitest 测试配置（jsdom 环境）
├── api-extractor.json        # API Extractor 配置
└── .eslintrc.js              # ESLint 配置
```

---

## 编码规范

### 函数命名模式

所有导出函数采用 **模块前缀 + 下划线分隔** 的命名方式，格式为 `模块名_功能描述`：

```typescript
// 模块前缀对应 modules/ 下的文件名
export const author_traceId = (...) => { ... };
export const author_strict = (...) => { ... };
export const file_calculate_md5 = (...) => { ... };
export const file_open = (...) => { ... };
export const num_expand = (...) => { ... };
export const num_expand_100 = (...) => { ... };
export const hex_to_rgb = (...) => { ... };
export const val_number = (...) => { ... };
export const val_phone = (...) => { ... };
export const sys_print = (...) => { ... };
export const tem_get_tableHeader = (...) => { ... };
export const timejs = (...) => { ... };
export const city_options = (...) => { ... };
```

**注意**：少数函数未严格遵循此规范（如 `getOptionConfig`、`getUrlConfig`），属于历史遗留。

### 函数风格

- 使用 **箭头函数 + const 导出** 作为标准写法
- 使用 **JSDoc 注释** 描述函数用途、参数和返回值
- 参数类型使用 TypeScript 类型注解
- 大量使用可选链操作符 `?.` 进行安全访问

```typescript
/**
 * 函数描述
 * @param {类型} 参数名 - 参数说明
 * @returns 返回值说明
 */
export const module_functionName = (param: type): returnType => {
  // 实现
};
```

### 类型定义

类型定义集中在 `src/types/index.ts` 中，使用 `type` 关键字定义：

```typescript
export type RgbColor = [number, number, number, number?];
export type ResourceItem = { resourceId: number; resourceName?: string };
export type TableHeaderItem = { sort?: number; id?: number; key?: string; /* ... */ };
export type KeyVal = { [key: string]: string };
```

模块内部的接口定义使用 `interface`，仅在模块内部使用时不导出：

```typescript
interface MenuInformation { /* ... */ }
interface IProps { url: string; name?: string; }
```

### 模块导出机制

项目使用 `rollup-plugin-import-export` 插件实现自动批量导出：

```typescript
// src/index.ts — 自动导出所有 modules 下的文件
export * from "iem:./modules/**/*";
```

`iem:` 是自定义前缀，类型声明在 `src/iem.d.ts` 中。新增模块文件时，只需在 `src/modules/` 下创建文件并导出函数，无需手动修改 `index.ts`。

### 校验函数模式

`validation.ts` 中的校验函数统一遵循以下模式，适配 Ant Design 等表单库的 `rules` 规范：

```typescript
export const val_xxx = (_: any, value: any) => {
  if (value) {
    // 1. 先检查空格
    if (/\s/.test(value)) {
      return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
    }
    // 2. 业务校验逻辑
    // ...
    return Promise.resolve();
  } else {
    return Promise.resolve(); // 空值通过（非必填场景）
  }
};
```

### 测试规范

测试文件放在 `test/` 目录，文件名格式为 `模块名.spec.ts`，与 `src/modules/` 一一对应：

```typescript
import { describe, expect, it } from "vitest";
import { author_traceId } from "../src/modules/author";

describe("author", () => {
  it("author_traceId", () => {
    const res = author_traceId("os", "/os_service/v1/agent/vip/saveOrUpdate");
    expect(extracted).toEqual(source);
  });
});
```

测试环境为 `jsdom`（配置在 `vitest.config.js` 中）。

---

## 常用工具函数

### author — 认证/权限/路由

| 函数 | 用途 |
|------|------|
| `author_traceId(origin, url)` | 生成请求 TraceId，格式如 `os-os-{uuid}` |
| `author_strict(list, id)` | 严格匹配按钮权限（根据 resourceId 判断） |
| `author_passwordCheck(str)` | 计算密码强度等级（0-3级：数字/字母/特殊字符） |
| `author_rsa(pubKey, password)` | RSA 加密密码，输出十六进制字符串 |
| `author_router_filter(origin, local)` | 处理接口路由数据，将本地路由信息补充进去（用于菜单生成） |
| `author_router_add(origin, local)` | 处理缓存路由数据，将 DOM 元素注入（用于渲染） |

### cityOptions — 城市选择

| 函数 | 用途 |
|------|------|
| `city_options(level)` | 获取省市区级联数据（`"two"` 二级 / `"three"` 三级，默认三级） |
| `city_two_code_text(provinceId, cityId?)` | 二级编码转城市名称 |
| `city_code_text(provinceId, cityId?, districtId?)` | 三级编码转城市名称 |

### color — 颜色处理

| 函数 | 用途 |
|------|------|
| `hex_to_rgb(hex)` | 十六进制颜色转 RGB 数组 |
| `rgb_to_hex(rgb)` | RGB 数组转十六进制颜色 |
| `reduce_opacity(rgb, opacity)` | 计算颜色降低透明度后的 RGB 值 |
| `get_multiple_color(value, opacity)` | 生成颜色的多种透明度变体（支持 hex 和 rgb 输入） |
| `theme_change(value)` | 动态生成主题色 CSS 变量并注入页面（生成 `--themeColor` 及 0-9.5 步进变量） |

### file — 文件操作

| 函数 | 用途 |
|------|------|
| `file_calculate_md5(file)` | 计算文件 MD5 哈希值（返回 Promise） |
| `file_open({ url, name? })` | 打开/预览文件，不可预览时触发下载 |
| `file_load({ url, name? })` | 通过 fetch 下载文件 |

### number — 数字/金额处理

| 函数 | 用途 |
|------|------|
| `num_expand(amount, unit?, accuracy?)` | 金额单位扩大（如 分→元），默认除以 100 |
| `num_expand_100(amount, accuracy?)` | 金额扩大两位（分→元 / 百分数→数） |
| `num_reduce(amount, unit?)` | 金额单位缩小（如 元→分），默认乘以 100 |
| `num_reduce_100(amount)` | 金额缩小两位（元→分 / 数→百分数） |
| `num_unit(amount)` | 数字自动添加单位（万/亿） |
| `num_text(number, type?)` | 数字转中文大写金额（如 `100000000` → `"壹亿元整"`） |

### other — 杂项工具

| 函数 | 用途 |
|------|------|
| `sys_print({ url })` | 浏览器打印（基于 print-js） |
| `sys_detectBrowser()` | 检测浏览器版本，过低时弹出提示 |
| `win_dynamic_fontSize()` | 根据屏幕宽度动态设置根字体大小（rem 适配） |
| `tem_get_tableHeader(keyVal, cache, initial)` | 表头数据转译（合并接口返回、缓存、默认表头） |
| `getOptionConfig(value, array)` | 从枚举配置数组中查找匹配项 |
| `getUrlConfig(url)` | 解析 URL 获取文件名、前缀路径、后缀名 |
| `timejs(props?, props1?, props2?)` | dayjs 封装（已配置中文 locale 和 quarterOfYear 插件） |
| `video_preview(videoUrl, frameTime?)` | 提取视频指定帧为 base64 预览图 |

### validation — 表单校验

| 函数 | 用途 |
|------|------|
| `val_number(_, value)` | 校验数字文本（不允许空格） |
| `val_two_percent(_, value)` | 校验两位小数百分比（0-100） |
| `val_three_percent(_, value)` | 校验三位小数百分比（0-100） |
| `val_amount(_, value)` | 校验金额（最多两位小数） |
| `val_idcard(_, value)` | 校验身份证号格式 |
| `val_phone(_, value)` | 校验手机号格式 |
| `val_landline(_, value)` | 校验联系电话格式（座机） |
| `val_email(_, value)` | 校验邮箱格式 |
| `val_space(_, value)` | 校验文本是否包含空格 |
| `val_beforeAfter_space(_, value)` | 校验文本前后是否有空格 |

---

## 公共类型

定义在 `src/types/index.ts`：

| 类型 | 定义 | 用途 |
|------|------|------|
| `RgbColor` | `[number, number, number, number?]` | RGB 颜色数组，第 4 项为可选透明度 |
| `ResourceItem` | `{ resourceId: number; resourceName?: string }` | 权限资源项 |
| `TableHeaderItem` | `{ sort?; id?; key?; name?; selected?; disable?; title?; dataIndex?; width?; fixed?; render? }` | 表格表头配置项 |
| `KeyVal` | `{ [key: string]: string }` | 通用键值对 |

---

## 常用脚本

```bash
# 开发模式（watch 编译）
npm run dev

# 构建（编译 + 生成 API 文档）
npm run build

# 运行测试
npm test

# 代码检查
npm run lint

# 生成 API 文档
npm run doc

# 文档站点开发
npm run docs:dev

# 文档站点构建
npm run docs:build
```

---

## 注意事项

1. **模块自动导出**：新增工具函数只需在 `src/modules/` 下创建或编辑文件并导出，`src/index.ts` 会通过 `iem:./modules/**/*` 自动导出。不需要手动修改入口文件。

2. **命名前缀规范**：导出函数应使用模块文件名作为前缀（如 `author_`、`file_`、`num_`、`val_`、`sys_`、`tem_`、`city_`），保持一致性。已有部分函数（如 `getOptionConfig`、`getUrlConfig`）未遵循此规范，属于历史遗留。

3. **number-precision**：涉及金额计算时必须使用 `number-precision` 库（`Num.divide`、`Num.times`），避免 JavaScript 浮点精度问题。不要直接使用 `/` 或 `*` 运算符处理金额。

4. **dayjs 配置**：`other.ts` 中已配置 dayjs 的中文 locale（`zh-cn`）和 `quarterOfYear` 插件。使用 `timejs()` 函数而非直接调用 `dayjs()`，可确保配置生效。

5. **校验函数返回值**：所有 `val_` 开头的校验函数返回 `Promise`（`Promise.resolve()` 或 `Promise.reject(new Error(...))`），直接适配 Ant Design Form 的 `rules` 规范。空值场景统一返回 `Promise.resolve()`（即非必填时放行）。

6. **浏览器兼容**：`sys_detectBrowser()` 中定义了最低兼容版本（Chrome 88、Safari 14、Firefox 78、Opera 74、Edge 88）。修改兼容范围时需同步更新 `BrowserNameVersion` 数组。

7. **城市数据**：`constant/city.ts` 中的省市区数据量较大，是静态全量数据。使用 `city_options("two")` 获取二级数据可减小打包体积。

8. **测试要求**：每个模块文件应有对应的 `test/xxx.spec.ts` 测试文件。使用 `vitest` 的 `describe/it/expect` 语法。测试环境为 `jsdom`，可模拟 DOM 操作。

9. **构建流程**：`npm run build` 会依次执行 Rollup 编译和 API 文档生成。`prepublishOnly` 钩子会在发布前自动清理 `dist/` 并重新构建。

10. **iem: 前缀**：`iem:./modules/**/*` 是 `rollup-plugin-import-export` 插件的自定义模块前缀，类型声明在 `src/iem.d.ts` 中。ESLint 需要在 `rules` 中配置 `import/no-unresolved` 忽略此前缀。
