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

Hyrule 取名来自于任天堂著名的高分游戏大作《塞尔达传说：旷野之息》里的海拉鲁大陆，logo 来自于游戏的宣传照。 主角 Link 站在悬崖边的石头上，眺望着海拉鲁大陆，在他面前是一个充满无限可能的开放世界，当然咯，还有无数的冒险和挑战等着他去克服。

本仓库用于前端团队的技术沉淀，主要包含以下：

- 介绍团队技术栈，开发规范，代码规范，和开发指引
- @hyrule/util：团队工具库
- hyrule-ui：UI 组件库
- @hyrule/theme：前端设计规范，以及主题定制
- @hyrule/template：脚手架模版（工程项目模版，组件库模版）
- @hyrule/visual：前端可视化方面的沉淀
- @hyrule/snippet：代码片段整理
- 团队文档的统一整合
- cicd 的整合

## 架构

本仓库架构为 lerna + yarn workspace + dumi + father-build

- lerna 负责 monorepo 形式的多包管理，已经 npm 的发包
- yarn 负责管理依赖（使用的是 yarn workspace 模式）
- dumi 负责文档以及 demo
- father-build 负责打包构建（后续也有可能改用 gulp + babel 来打包）

为了更好的理解和参与本项目，建议学习先大致了解和学习一下 lerna, yarn workspace 以及 dumi, 以下是一些可以参考的文章：

- [Lerna 中文教程详解](https://segmentfault.com/a/1190000019350611)
- [lerna+yarn workspace+monorepo 项目的最佳实践](https://juejin.im/post/6844903918279852046)
- [dumi 官方文档](https://d.umijs.org/zh-CN)

## 私有源

（待完善）

本项目构建之后，是需要发包的，后续考虑用 Sinopia 在公司内网部署搞一个私有源，并打通发包和安装依赖的全流程

## 部署

本文档已接入 Jenkins 自动化部署，
