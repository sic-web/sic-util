import { describe, it, expect } from "vitest";
import { tem_get_tableHeader, timejs } from "../src/modules/other";

describe("other", () => {
  it("sys_print", () => {
    expect("").toEqual("");
  });
  it("sys_detectBrowser", () => {
    expect("").toEqual("");
  });
  it("win_dynamic_fontSize", () => {
    expect("").toEqual("");
  });
  it("tem_get_tableHeader", () => {
    const source = [
      { key: "taskName", name: "任务名称", sort: 1, disable: true, width: 220, fixed: "left", selected: true },
      { key: "qrCodeStatus", name: "二维码", sort: 2, disable: false, width: 80, selected: true },
      { key: "zoneName", name: "承载园区", sort: 3, disable: false, width: 163, selected: true },
      { key: "auditStatus", name: "审核状态", sort: 4, disable: false, width: 80, selected: true },
      { key: "companyName", name: "企业名称", sort: 5, disable: false, width: 286, selected: true },
      { key: "taskStatus", name: "任务状态", sort: 6, disable: false, width: 80, selected: true },
      { key: "qrCodeImage", name: "二维码图片", sort: 7, disable: false, width: 90, selected: true },
      { key: "serviceFeeRate", name: "企业费率", sort: 8, disable: false, width: 90, selected: true },
      { key: "invoiceClassStr", name: "开票类目", sort: 9, disable: false, width: 286, selected: true },
      { key: "taskDateStr", name: "任务期限", sort: 10, disable: false, width: 130, selected: true },
      { key: "taskRequire", name: "任务要求", sort: 11, disable: false, width: 163, selected: true },
      { key: "remark", name: "任务备注", sort: 12, disable: false, width: 163, selected: true },
      { key: "createTime", name: "创建时间", sort: 13, disable: false, width: 163, selected: true },
      { key: "billFeeStr", name: "费用(单人/单次/元)", sort: 14, disable: false, width: 163, selected: true },
      { key: "taskId", name: "任务编号", sort: 15, disable: false, width: 80, selected: true },
      { key: "operate", sort: 16, disable: true, name: "操作", width: 140, fixed: "right", selected: true },
    ];

    const keyVal = {
      auditStatus: "审核状态",
      billFeeStr: "费用(单人/单次/元)",
      companyName: "企业名称",
      createTime: "创建时间",
      invoiceClassStr: "开票类目",
      qrCodeImage: "二维码图片",
      qrCodeStatus: "二维码",
      remark: "任务备注",
      serviceFeeRate: "企业费率",
      taskDateStr: "任务期限",
      taskId: "任务编号",
      taskName: "任务名称",
      taskRequire: "任务要求",
      taskStatus: "任务状态",
      zoneName: "承载园区",
    };

    const cache = [
      { key: "taskName", name: "任务名称", sort: 1, disable: true, width: 220, fixed: "left", selected: true },
      { key: "qrCodeStatus", name: "二维码", sort: 2, disable: false, width: 80, selected: true },
      { key: "zoneName", name: "承载园区", sort: 3, disable: false, width: 163, selected: true },
      { key: "auditStatus", name: "审核状态", sort: 4, disable: false, width: 80, selected: true },
      { key: "companyName", name: "企业名称", sort: 5, disable: false, width: 286, selected: true },
      { key: "taskStatus", name: "任务状态", sort: 6, disable: false, width: 80, selected: true },
      { key: "qrCodeImage", name: "二维码图片", sort: 7, disable: false, width: 90, selected: true },
      { key: "serviceFeeRate", name: "企业费率", sort: 8, disable: false, width: 90, selected: true },
      { key: "invoiceClassStr", name: "开票类目", sort: 9, disable: false, width: 286, selected: true },
      { key: "taskDateStr", name: "任务期限", sort: 10, disable: false, width: 130, selected: true },
      { key: "taskRequire", name: "任务要求", sort: 11, disable: false, width: 163, selected: true },
      { key: "remark", name: "任务备注", sort: 12, disable: false, width: 163, selected: true },
      { key: "createTime", name: "创建时间", sort: 13, disable: false, width: 163, selected: true },
      { key: "billFeeStr", name: "费用(单人/单次/元)", sort: 14, disable: false, width: 163, selected: true },
      { key: "taskId", name: "任务编号", sort: 15, disable: false, width: 80, selected: true },
      { key: "operate", sort: 16, disable: true, name: "操作", width: 140, fixed: "right", selected: true },
    ];

    const initial = [
      { key: "taskName", sort: 1, disable: true, width: 220, fixed: "left" },
      { key: "companyName", sort: 2, disable: false, width: 286 },
      { key: "serviceFeeRate", sort: 3, disable: false, width: 90 },
      { key: "zoneName", sort: 4, disable: false, width: 163 },
      { key: "auditStatus", sort: 5, disable: false, width: 80 },
      { key: "taskStatus", sort: 6, disable: false, width: 80 },
      { key: "qrCodeImage", sort: 7, disable: false, width: 90 },
      { key: "qrCodeStatus", sort: 8, disable: false, width: 80 },
      { key: "invoiceClassStr", sort: 9, disable: false, width: 286 },
      { key: "taskDateStr", sort: 10, disable: false, width: 130 },
      { key: "taskRequire", sort: 11, disable: false, width: 163 },
      { key: "remark", sort: 12, disable: false, width: 163 },
      { key: "createTime", sort: 13, disable: false, width: 163 },
      { key: "billFeeStr", sort: 14, disable: false, width: 163 },
      { key: "taskId", sort: 15, disable: false, width: 80 },
      { key: "operate", sort: 16, disable: true, name: "操作", width: 140, fixed: "right", selected: true },
    ];
    const res = tem_get_tableHeader(keyVal, cache, initial);
    expect(res).toEqual(source);
  });
  it("timejs", () => {
    const res1 = timejs().format();
    const res2 = timejs("2024-05-01T16:00:00.000Z").format();
    const res3 = timejs("2024-05-01T16:00:00.000Z").format("YYYY-MM-DD");
    expect(res1).not.toEqual("2024-05-07T18:13:08+08:00");
    expect(res2).toEqual("2024-05-02T00:00:00+08:00");
    expect(res3).toEqual("2024-05-02");
  });
});
import { getOptionConfig } from "../src/modules/other";
const PROJECTSTATUS = [
  { value: 1, label: "待支付", type: 4 },
  { value: 2, label: "审核中", type: 3 },
  { value: 3, label: "发放中", type: 2 },
  { value: 4, label: "已发放", type: 1 },
  { value: 5, label: "已取消", type: 5 },
  { value: 6, label: "驳回", type: 6 },
];
describe("getOptionConfig", () => {
  it("getOptionConfig", () => {
    const source = "已发放";
    const res = getOptionConfig(4, PROJECTSTATUS)?.label;
    const source1 = 5;
    const res1 = getOptionConfig(5, PROJECTSTATUS)?.type;
    expect(res).toEqual(source);
    expect(res1).toEqual(source1);
  });
});

import { getUrlConfig } from "../src/modules/other";
const url = "https://testfile.siciei.com/business_license/f22279c5f52a823468987aeb90469d0b/测试文件名.JPG";
describe("getUrlConfig", () => {
  it("getUrlConfig", () => {
    const source = "测试文件名.JPG";
    const res = getUrlConfig(url)?.fileName;
    const source1 = "https://testfile.siciei.com/business_license/f22279c5f52a823468987aeb90469d0b/测试文件名";
    const res1 = getUrlConfig(url)?.prefix;
    const source2 = "JPG";
    const res2 = getUrlConfig(url)?.suffix;
    expect(res).toEqual(source);
    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
  });
});
