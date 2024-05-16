import { describe, expect, it } from "vitest";
import { author_traceId, author_strict, author_passwordCheck, author_router_filter } from "../src/modules/author";

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
});
