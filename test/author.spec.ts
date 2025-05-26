import { describe, expect, it } from "vitest";
import { author_traceId, author_strict, author_passwordCheck, author_router_filter, author_router_add } from "../src/modules/author";

describe("author", () => {
  it("author_traceId", () => {
    const source = "os-os";
    const res = author_traceId("os", "/os_service/v1/agent/vip/saveOrUpdate");
    const extracted = res.match(/^(.*?)-(.*?)-/)?.[1] + "-" + res.match(/^(.*?)-(.*?)-/)?.[2];
    expect(extracted).toEqual(source);
  });
  it("author_strict", () => {
    const source = [
      { resourceId: 12, resourceName: "园区数据总览" },
      { resourceId: 13, resourceName: "园区统计列表" },
    ];
    const res1 = author_strict(source, 12);
    const res2 = author_strict(source, 13);
    const res3 = author_strict(source, 14);
    expect(res1).toEqual(true);
    expect(res2).toEqual(true);
    expect(res3).toEqual(false);
  });
  it("author_passwordCheck", () => {
    const res1 = author_passwordCheck("");
    const res2 = author_passwordCheck("123");
    const res3 = author_passwordCheck("123abcd");
    const res4 = author_passwordCheck("123abcd!");
    expect(res1).toEqual(0);
    expect(res2).toEqual(1);
    expect(res3).toEqual(2);
    expect(res4).toEqual(3);
  });

  it("author_router_filter", () => {
    const res1_1 = [
      {
        children: [],
        label: "首页",
        menuId: 1,
        parentId: 0,
        parentName: "",
        resourceList: [{ resourceId: 1, resourceName: "列表" }],
        sort: 1,
      },
      { children: [], label: "客户管理", menuId: 8, parentId: 0, parentName: "", resourceList: [], sort: 2 },
      { children: [], label: "发放明细", menuId: 9, parentId: 0, parentName: "", resourceList: [], sort: 3 },
      { children: [], label: "代理管理", menuId: 10, parentId: 0, parentName: "", resourceList: [], sort: 4 },
      {
        children: [
          {
            children: [],
            label: "进件企业",
            menuId: 15,
            parentId: 14,
            parentName: "进件管理",
            resourceList: [
              { resourceId: 9, resourceName: "查看详情" },
              { resourceId: 10, resourceName: "新增客户" },
            ],
            sort: 1,
          },
          {
            children: [],
            label: "进件代理",
            menuId: 16,
            parentId: 14,
            parentName: "进件管理",
            resourceList: [
              { resourceId: 11, resourceName: "查看详情" },
              { resourceId: 12, resourceName: "新增客户" },
            ],
            sort: 2,
          },
        ],
        label: "进件管理",
        menuId: 14,
        parentId: 0,
        parentName: "",
        resourceList: [],
        sort: 5,
      },
      {
        children: [{ children: [], label: "修改密码", menuId: 12, parentId: 11, parentName: "系统设置", resourceList: [], sort: 999 }],
        label: "系统设置",
        menuId: 11,
        parentId: 0,
        parentName: "",
        resourceList: [],
        sort: 999,
      },
    ];

    const res1_2 = [
      { menuid: 1, key: "/home", element: { compare: null }, resourcelist: [{ resourceId: 1, key: "/home/enterpriseRanking" }] },
      { menuid: 2, key: "/proxy/client" },
      { menuid: 3, key: "/proxy/grant" },
      { menuid: 4, key: "/proxy/agent" },
      {
        menuid: 17,
        key: "/proxy/application",
        children: [
          {
            menuid: 18,
            key: "/proxy/application/newCustome",
            resourcelist: [
              { resourceId: 13, key: "/proxy/application/newCustome/customeDetail" },
              { resourceId: 14, key: "/proxy/application/newCustome/addnewCustome", element: { compare: null } },
            ],
          },
        ],
      },
      { menuid: 8, key: "/sale/client" },
      { menuid: 9, key: "/sale/grant" },
      { menuid: 10, key: "/sale/agent" },
      {
        menuid: 14,
        key: "/sale/application",
        children: [
          {
            menuid: 15,
            key: "/sale/application/newCustome",
            resourcelist: [
              { resourceId: 9, key: "/sale/application/newCustome/customeDetail" },
              { resourceId: 10, key: "/sale/application/newCustome/addnewCustome", element: { compare: null } },
            ],
          },
          {
            menuid: 16,
            key: "/sale/application/newAgent",
            resourcelist: [
              { resourceId: 11, key: "/sale/application/newAgent/agentDetail" },
              { resourceId: 12, key: "/sale/application/newAgent/addNewAgent", element: { compare: null } },
            ],
          },
        ],
      },
      { menuid: 11, key: "/system", children: [{ menuid: 12, key: "/system/changePassword" }] },
    ];

    const res1 = author_router_filter(res1_1, res1_2);

    const source = [
      { key: "/home", menuid: 1, label: "首页", resourcelist: [{ resourceId: 1, resourceName: "列表" }] },
      { key: "/sale/client", menuid: 8, label: "客户管理", resourcelist: [] },
      { key: "/sale/grant", menuid: 9, label: "发放明细", resourcelist: [] },
      { key: "/sale/agent", menuid: 10, label: "代理管理", resourcelist: [] },
      {
        key: "/sale/application",
        menuid: 14,
        label: "进件管理",
        resourcelist: [],
        children: [
          {
            key: "/sale/application/newCustome",
            menuid: 15,
            label: "进件企业",
            resourcelist: [
              { resourceId: 9, resourceName: "查看详情" },
              { resourceId: 10, resourceName: "新增客户" },
            ],
          },
          {
            key: "/sale/application/newAgent",
            menuid: 16,
            label: "进件代理",
            resourcelist: [
              { resourceId: 11, resourceName: "查看详情" },
              { resourceId: 12, resourceName: "新增客户" },
            ],
          },
        ],
      },
      {
        key: "/system",
        menuid: 11,
        label: "系统设置",
        resourcelist: [],
        children: [{ key: "/system/changePassword", menuid: 12, label: "修改密码", resourcelist: [] }],
      },
    ];

    expect(source).toEqual(res1);
  });

  it("author_router_add", () => {
    const res1_1 = [
      {
        key: "/home",
        menuid: 1,
        label: "首页",
        resourcelist: [
          { resourceId: 76, resourceName: "列表" },
          { resourceId: 89, resourceName: "园区账户列表" },
          { resourceId: 90, resourceName: "快捷入口" },
        ],
      },
      {
        key: "/organize",
        menuid: 2,
        label: "组织人员",
        resourcelist: [],
        children: [
          {
            key: "/organize/architecture",
            menuid: 7,
            label: "组织架构",
            resourcelist: [
              { resourceId: 1, resourceName: "人员列表" },
              { resourceId: 2, resourceName: "新增部门" },
              { resourceId: 4, resourceName: "转移部门人员" },
              { resourceId: 43, resourceName: "删除部门" },
              { resourceId: 66, resourceName: "人员详情" },
              { resourceId: 67, resourceName: "取消合作" },
              { resourceId: 68, resourceName: "编辑部门" },
            ],
          },
          {
            key: "/organize/personnel",
            menuid: 8,
            label: "人员管理",
            resourcelist: [
              { resourceId: 73, resourceName: "新增人员" },
              { resourceId: 74, resourceName: "导出" },
              { resourceId: 81, resourceName: "人员详情" },
              { resourceId: 82, resourceName: "取消合作" },
              { resourceId: 83, resourceName: "转移部门人员" },
              { resourceId: 84, resourceName: "人员列表" },
            ],
          },
        ],
      },
      {
        key: "/task",
        menuid: 3,
        label: "任务管理",
        resourcelist: [
          { resourceId: 5, resourceName: "发布任务" },
          { resourceId: 6, resourceName: "发放佣金" },
          { resourceId: 7, resourceName: "列表" },
          { resourceId: 42, resourceName: "编辑" },
          { resourceId: 78, resourceName: "导出" },
          { resourceId: 80, resourceName: "所有部门任务二维码" },
        ],
      },
      {
        key: "/order",
        menuid: 4,
        label: "接单签约管理",
        resourcelist: [
          { resourceId: 9, resourceName: "列表" },
          { resourceId: 10, resourceName: "批量导入签约" },
          { resourceId: 11, resourceName: "导出" },
          { resourceId: 79, resourceName: "交付图详情" },
          { resourceId: 92, resourceName: "上传身份证" },
        ],
      },
      {
        key: "/finance",
        menuid: 5,
        label: "财务管理",
        resourcelist: [],
        children: [
          {
            key: "/finance/releaseManagement",
            menuid: 9,
            label: "发放管理",
            resourcelist: [
              { resourceId: 12, resourceName: "列表" },
              { resourceId: 15, resourceName: "详情" },
              { resourceId: 16, resourceName: "导出" },
              { resourceId: 17, resourceName: "确认/取消" },
              { resourceId: 51, resourceName: "新增" },
              { resourceId: 50, resourceName: "发放同步" },
              { resourceId: 88, resourceName: "下载回单" },
            ],
          },
          {
            key: "/finance/releaseDetails",
            menuid: 10,
            label: "发放明细",
            resourcelist: [
              { resourceId: 18, resourceName: "列表" },
              { resourceId: 19, resourceName: "导出" },
            ],
          },
          {
            key: "/finance/costManagement",
            menuid: 11,
            label: "费用管理",
            resourcelist: [
              { resourceId: 20, resourceName: "列表" },
              { resourceId: 21, resourceName: "充值" },
              { resourceId: 22, resourceName: "导出" },
            ],
          },
          {
            key: "/finance/invoiceManagement",
            menuid: 12,
            label: "发票管理",
            resourcelist: [
              { resourceId: 23, resourceName: "列表" },
              { resourceId: 24, resourceName: "发票申请" },
              { resourceId: 25, resourceName: "收件人管理" },
              { resourceId: 91, resourceName: "导出" },
            ],
          },
          {
            key: "/finance/releaseDraft",
            menuid: 18,
            label: "发放草稿箱",
            resourcelist: [
              { resourceId: 85, resourceName: "草稿列表" },
              { resourceId: 86, resourceName: "草稿详情" },
              { resourceId: 87, resourceName: "上传" },
              { resourceId: 88, resourceName: "取消" },
            ],
          },
        ],
      },
      {
        key: "/system",
        menuid: 6,
        label: "系统管理",
        resourcelist: [],
        children: [
          {
            key: "/system/enterpriseCenter",
            menuid: 13,
            label: "商户中心",
            resourcelist: [{ resourceId: 27, resourceName: "商户中心信息" }],
          },
          {
            key: "/system/contract",
            menuid: 14,
            label: "合同管理",
            resourcelist: [
              { resourceId: 28, resourceName: "列表" },
              { resourceId: 29, resourceName: "上传合同" },
              { resourceId: 31, resourceName: "删除" },
            ],
          },
          {
            key: "/system/userManagement",
            menuid: 15,
            label: "用户管理",
            resourcelist: [
              { resourceId: 32, resourceName: "列表" },
              { resourceId: 33, resourceName: "新增" },
              { resourceId: 34, resourceName: "修改" },
            ],
          },
          {
            key: "/system/permissions",
            menuid: 16,
            label: "权限管理",
            resourcelist: [
              { resourceId: 36, resourceName: "列表" },
              { resourceId: 37, resourceName: "新增" },
              { resourceId: 38, resourceName: "编辑" },
              { resourceId: 39, resourceName: "删除" },
            ],
          },
          { key: "/system/password", menuid: 17, label: "修改密码", resourcelist: [{ resourceId: 41, resourceName: "修改密码" }] },
          { key: "/system/paramsConfig", menuid: 19, label: "参数配置", resourcelist: [] },
        ],
      },
    ];
    const res1_2 = [
      { menuid: 1, key: "/home" },
      {
        menuid: 2,
        key: "/organize",
        children: [
          { menuid: 7, key: "/organize/architecture", resourcelist: [{ resourceId: 66, key: "/organize/personnel/individualCenter" }] },
          { menuid: 8, key: "/organize/personnel" },
        ],
      },
      { menuid: 3, key: "/task", element: { compare: null }, resourcelist: [{ resourceId: 5, key: "/task/publishTask" }] },
      {
        menuid: 4,
        key: "/order",
        resourcelist: [
          { resourceId: 10, key: "/order/signImport" },
          { resourceId: 79, key: "/order/orderDetail" },
        ],
      },
      {
        menuid: 5,
        key: "/finance",
        children: [
          {
            menuid: 9,
            key: "/finance/releaseManagement",
            resourcelist: [
              { resourceId: 51, key: "/finance/releaseManagement/releasePublish" },
              { resourceId: 15, key: "/finance/releaseManagement/releaseManagementDetails" },
            ],
          },
          { menuid: 10, key: "/finance/releaseDetails" },
          { menuid: 11, key: "/finance/costManagement", resourcelist: [{ resourceId: 21, key: "/finance/costManagement/recharge" }] },
          {
            menuid: 12,
            key: "/finance/invoiceManagement",
            element: { compare: null },
            resourcelist: [
              { resourceId: 24, key: "/finance/invoiceManagement/applyForinvoice", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/addressee", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/parkInvoice", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/invoiceType", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/invoiceMoney", more: true },
            ],
          },
          { menuid: 18, key: "/finance/releaseDraft", resourcelist: [{ resourceId: 85, key: "/finance/releaseDraft/draftDetail" }] },
        ],
      },
      {
        menuid: 6,
        key: "/system",
        children: [
          { menuid: 13, key: "/system/enterpriseCenter", element: { compare: null } },
          { menuid: 14, key: "/system/contract", resourcelist: [{ resourceId: 29, key: "/system/contract/addContract" }] },
          { menuid: 15, key: "/system/userManagement", resourcelist: [{ resourceId: 33, key: "/system/userManagement/adduser" }] },
          { menuid: 16, key: "/system/permissions", resourcelist: [{ resourceId: 37, key: "/system/permissions/addRole" }] },
          { menuid: 17, key: "/system/password" },
          { menuid: 19, key: "/system/paramsConfig", element: { compare: null } },
        ],
      },
    ];

    const source = [
      {
        key: "/home",
        menuid: 1,
        label: "首页",
        resourcelist: [
          { resourceId: 76, resourceName: "列表" },
          { resourceId: 89, resourceName: "园区账户列表" },
          { resourceId: 90, resourceName: "快捷入口" },
        ],
      },
      {
        key: "/organize",
        menuid: 2,
        label: "组织人员",
        resourcelist: [],
        children: [
          {
            key: "/organize/architecture",
            menuid: 7,
            label: "组织架构",
            resourcelist: [
              { resourceId: 1, resourceName: "人员列表" },
              { resourceId: 2, resourceName: "新增部门" },
              { resourceId: 4, resourceName: "转移部门人员" },
              { resourceId: 43, resourceName: "删除部门" },
              { resourceId: 66, resourceName: "人员详情", key: "/organize/personnel/individualCenter" },
              { resourceId: 67, resourceName: "取消合作" },
              { resourceId: 68, resourceName: "编辑部门" },
            ],
          },
          {
            key: "/organize/personnel",
            menuid: 8,
            label: "人员管理",
            resourcelist: [
              { resourceId: 73, resourceName: "新增人员" },
              { resourceId: 74, resourceName: "导出" },
              { resourceId: 81, resourceName: "人员详情" },
              { resourceId: 82, resourceName: "取消合作" },
              { resourceId: 83, resourceName: "转移部门人员" },
              { resourceId: 84, resourceName: "人员列表" },
            ],
          },
        ],
      },
      {
        key: "/task",
        menuid: 3,
        label: "任务管理",
        resourcelist: [
          { resourceId: 5, resourceName: "发布任务", key: "/task/publishTask" },
          { resourceId: 6, resourceName: "发放佣金" },
          { resourceId: 7, resourceName: "列表" },
          { resourceId: 42, resourceName: "编辑" },
          { resourceId: 78, resourceName: "导出" },
          { resourceId: 80, resourceName: "所有部门任务二维码" },
        ],

        element: { compare: null },
      },
      {
        key: "/order",
        menuid: 4,
        label: "接单签约管理",
        resourcelist: [
          { resourceId: 9, resourceName: "列表" },
          { resourceId: 10, resourceName: "批量导入签约", key: "/order/signImport" },
          { resourceId: 11, resourceName: "导出" },
          { resourceId: 79, resourceName: "交付图详情", key: "/order/orderDetail" },
          { resourceId: 92, resourceName: "上传身份证" },
        ],
      },
      {
        key: "/finance",
        menuid: 5,
        label: "财务管理",
        resourcelist: [],
        children: [
          {
            key: "/finance/releaseManagement",
            menuid: 9,
            label: "发放管理",
            resourcelist: [
              { resourceId: 12, resourceName: "列表" },
              { resourceId: 15, resourceName: "详情", key: "/finance/releaseManagement/releaseManagementDetails" },
              { resourceId: 16, resourceName: "导出" },
              { resourceId: 17, resourceName: "确认/取消" },
              { resourceId: 51, resourceName: "新增", key: "/finance/releaseManagement/releasePublish" },
              { resourceId: 50, resourceName: "发放同步" },
              { resourceId: 88, resourceName: "下载回单" },
            ],
          },
          {
            key: "/finance/releaseDetails",
            menuid: 10,
            label: "发放明细",
            resourcelist: [
              { resourceId: 18, resourceName: "列表" },
              { resourceId: 19, resourceName: "导出" },
            ],
          },
          {
            key: "/finance/costManagement",
            menuid: 11,
            label: "费用管理",
            resourcelist: [
              { resourceId: 20, resourceName: "列表" },
              { resourceId: 21, resourceName: "充值", key: "/finance/costManagement/recharge" },
              { resourceId: 22, resourceName: "导出" },
            ],
          },
          {
            key: "/finance/invoiceManagement",
            menuid: 12,
            label: "发票管理",
            resourcelist: [
              { resourceId: 23, resourceName: "列表" },
              { resourceId: 24, resourceName: "发票申请" },
              { resourceId: 25, resourceName: "收件人管理" },
              { resourceId: 91, resourceName: "导出" },
              { resourceId: 24, key: "/finance/invoiceManagement/applyForinvoice", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/addressee", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/parkInvoice", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/invoiceType", more: true },
              { resourceId: 24, key: "/finance/invoiceManagement/invoiceMoney", more: true },
            ],
            element: { compare: null },
          },
          {
            key: "/finance/releaseDraft",
            menuid: 18,
            label: "发放草稿箱",
            resourcelist: [
              { resourceId: 85, resourceName: "草稿列表", key: "/finance/releaseDraft/draftDetail" },
              { resourceId: 86, resourceName: "草稿详情" },
              { resourceId: 87, resourceName: "上传" },
              { resourceId: 88, resourceName: "取消" },
            ],
          },
        ],
      },
      {
        key: "/system",
        menuid: 6,
        label: "系统管理",
        resourcelist: [],
        children: [
          {
            key: "/system/enterpriseCenter",
            menuid: 13,
            label: "商户中心",
            resourcelist: [{ resourceId: 27, resourceName: "商户中心信息" }],
            element: { compare: null },
          },
          {
            key: "/system/contract",
            menuid: 14,
            label: "合同管理",
            resourcelist: [
              { resourceId: 28, resourceName: "列表" },
              { resourceId: 29, resourceName: "上传合同", key: "/system/contract/addContract" },
              { resourceId: 31, resourceName: "删除" },
            ],
          },
          {
            key: "/system/userManagement",
            menuid: 15,
            label: "用户管理",
            resourcelist: [
              { resourceId: 32, resourceName: "列表" },
              { resourceId: 33, resourceName: "新增", key: "/system/userManagement/adduser" },
              { resourceId: 34, resourceName: "修改" },
            ],
          },
          {
            key: "/system/permissions",
            menuid: 16,
            label: "权限管理",
            resourcelist: [
              { resourceId: 36, resourceName: "列表" },
              { resourceId: 37, resourceName: "新增", key: "/system/permissions/addRole" },
              { resourceId: 38, resourceName: "编辑" },
              { resourceId: 39, resourceName: "删除" },
            ],
          },
          { key: "/system/password", menuid: 17, label: "修改密码", resourcelist: [{ resourceId: 41, resourceName: "修改密码" }] },
          { key: "/system/paramsConfig", menuid: 19, label: "参数配置", resourcelist: [], element: { compare: null } },
        ],
      },
    ];

    const res1 = author_router_add(res1_1, res1_2);

    expect(source).toEqual(res1);
  });
});
