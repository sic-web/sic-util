import dayjs from 'dayjs';

/**
 * timejs 依赖于 dayjs 构建，形成管理时间的工具函数
 * TypeScript 中的 `timejs` 函数接受一个参数 `props`，并返回使用 `props` 调用 `dayjs` 的结果。
 * @param {any} props - `timejs` 函数中的 `props` 参数预计为 `any` 类型，这意味着它可以接受任何数据类型作为其值。
 *
 * @returns `timejs` 函数正在返回使用 `props` 参数调用 `dayjs` 函数的结果。
 */
declare const timejs: (props?: any, props1?: any, props2?: any) => dayjs.Dayjs;

export { timejs };
