---
title: 快速上手
order: 2
group:
  path: /
nav:
  title: 指南
  order: 1
  path: /guide
---

## 环境准备

首先得有 [node](https://nodejs.org/en/)，并确保 node 版本是 10.13 或以上。并且全局安装 lerna, yarn(因为本项目基于 yarn workspace，请务必使用 yarn，不要用 npm)

```bash
$ node -v
$ npm i -g yarn lerna
```

## 运行项目

```bash
// 下载代码
$ git clone git@172.16.120.120:hy-department-ai/hyrule-wild/hyrule.git

// 安装依赖
$ cd hyrule && yarn install

// 预览文档
$ yarn start
```

## 添加依赖

<Alert>
提示：请务必实用 yarn 来管理依赖包
</Alert>

一般分为三种场景：

```bash
// 给某个package安装依赖（将packageA作为packageB的依赖进行安装）：
$ yarn workspace packageB add packageA

// 给所有的package安装依赖:
$ yarn workspace add lodash

// 给root 安装依赖（一般的公用的开发工具都是安装在root里，如typescript）：
$ yarn add -W -D typescript
```

对应的三种场景删除依赖如下

```bash
$ yarn workspace packageB remove packageA
$ yarn workspaces remove lodash
$ yarn remove -W -D typescript
```

## 打包

(待完善)

## 发布

(待完善)
