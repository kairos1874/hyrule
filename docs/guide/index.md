---
title: 介绍
order: 1
group:
  path: /
nav:
  title: 指南
  order: 1
  path: /guide
---

## 理念

## 架构

本仓库架构为 lerna + yarn workspace + dumi + father-build

- lerna 负责 monorepo 形式的多包管理，以及 npm 的发包
- yarn 负责管理依赖（使用的是 yarn workspace 模式）
- dumi 负责文档以及 demo
- father-build 负责打包构建（后续也有可能改用 gulp + babel 来打包）

为了更好的理解和参与本项目，建议学习先大致了解和学习一下 lerna, yarn workspace 以及 dumi, 以下是一些可以参考的文章：

- [Lerna 中文教程详解](https://segmentfault.com/a/1190000019350611)
- [lerna+yarn workspace+monorepo 项目的最佳实践](https://juejin.im/post/6844903918279852046)
- [dumi 官方文档](https://d.umijs.org/zh-CN)
