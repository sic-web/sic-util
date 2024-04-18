import { describe, expect, it } from "vitest";
import { tem_get_tableHeader } from "../src/modules/temporary";

describe("temporary", () => {
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
});
