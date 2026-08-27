import type { Capability, ExperienceEntry, PortfolioProject } from '@/types/resume';

export const capabilities: readonly Capability[] = [
  {
    title: 'All in Agent',
    radarLabel: 'Agent',
    score: 4.5,
    description:
      '全力探索未来 Agent 架构，\n研究**下一代 Skills**、可控**长线执行**稳定性、\n推行高可用性 **benchmark**，为软件生态赋能。',
  },
  {
    title: 'AI 基础',
    radarLabel: 'AI',
    score: 4,
    description:
      '专注于**多模态**领域，\n研究原生少步 **Diffusion / Flow** 范式，\n持续关注**生成理解统一**模型前沿。',
  },

  {
    title: '工程能力',
    radarLabel: '前端全栈',
    score: 4.5,
    description: '掌握主流**前端**技术，并具有**全栈**视野，\n重视设计模式、编码规范与系统架构。',
  },
  {
    title: '游戏社区',
    radarLabel: '游戏',
    score: 3.5,
    description:
      '持续为**《星露谷物语》**、**《饥荒》**社区贡献 **模组**，\n了解游戏开发流程、系统设计与玩家体验。',
  },
  {
    title: '产品能力',
    radarLabel: '产品',
    score: 3.5,
    description: '从一个**想法**到产品**交付**，\n从探索**研究**到工程**落地**。',
  },
];

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    id: 'valley-agent',
    category: 'AGENT / GAME',
    title: 'Valley Agent',
    summary: '让 Agent 在开放世界里持续理解、规划与行动。',
    description:
      '面向《星露谷物语》的游戏智能体实验：用大模型理解任务与环境，以行为树承接稳定执行，并围绕状态感知、工具调用和失败恢复探索可长期运行的 Agent 架构。',
    image: '/agent-farm.png',
    imageAlt: 'AI 智能体在像素农场游戏中规划并执行任务的产品界面',
    tags: ['LLM', 'Behavior Tree', 'Python', 'Game Agent'],
    highlights: [
      '基于行为树构建的上层控制',
      '下一代可成长的 Skills',
      '高频动态信息，低频可缓存知识',
      '异常恢复与长线运行',
    ],
    links: [
      { label: '项目地址', href: 'https://github.com/lct01lct/valley-agent' },
      {
        label: '研究报告',
        href: 'https://my.feishu.cn/wiki/TEzhwV2FwiARH6kK7qXcqmvNnuh',
      },
    ],
  },
  {
    id: 'elasticdit',
    category: 'AI / RESEARCH',
    title: 'ElasticDiT',
    summary: '用一套弹性架构动态平衡移动端生成画质与时延。',
    description:
      '面向移动端高分辨率图像生成的弹性 Diffusion Transformer。通过空间压缩率与 DiT 深度的运行时重配置，结合稀疏注意力和轻量 VAE，在单套参数内覆盖不同硬件预算。',
    image: '/elasticdit.png',
    imageAlt: 'ElasticDiT 弹性架构与稀疏注意力论文方法图',
    tags: ['DiT', 'SSBA', 'T-DVAE', 'Flow-GRPO'],
    highlights: [
      '多算力弹性架构',
      '多阶段联合训练 DiT 与两阶段蒸馏 VAE',
      'Shift Sparse Block Attention',
      'T-DVAE 轻量化 VAE',
      'Flow-GRPO',
    ],
    links: [{ label: '技术报告', href: 'https://arxiv.org/abs/2605.15684' }],
  },
  {
    id: 'win10-in-vue',
    category: 'FULL STACK / WEB',
    title: 'Win10-in-Vue',
    summary: '把拥有文件系统与应用生态的 Windows 桌面带进浏览器。',
    description:
      '运行在浏览器的 Windows：分离模型层与渲染层，以 Monorepo 组织文件系统、窗口交互、插件 API、终端与软件商店等能力。',
    image: '/windows-vue.png',
    imageAlt: '运行在浏览器中的 Windows 桌面与软件商店界面',
    tags: ['Vue 3', 'TypeScript', 'NestJS', 'Monorepo'],
    highlights: [
      '文件系统与桌面联动',
      '插件化应用生态',
      '窗口交互与状态管理',
      '丝滑体验与绝对还原',
    ],
    links: [
      { label: '项目地址', href: 'https://github.com/lct01lct/Win10-in-Vue' },
      { label: '体验地址', href: 'https://lct01lct.github.io/Win10-in-Vue/#/' },
    ],
  },
];

export const experiences: readonly ExperienceEntry[] = [
  {
    id: 'aigc-foundation-model',
    kind: '工作',
    title: 'AIGC 基模型',
    period: '2024.11 — 2026.01',
    start: [2024, 11],
    end: [2026, 1],
    location: '上海',
    tags: ['Diffusion Transformer', 'Sparse DiT', 'High-compression VAE', 'Data Flywheel'],
    highlights: [
      '围绕 DiT 稀疏策略、多算力弹性架构、高压缩 VAE 与数据飞轮推进端侧生成技术突破。',
      '1.3B 模型在图像质量与语义跟随能力上均超过 SD3.5 2.5B，兼顾生成效果与部署效率。',
      '支撑长焦与夜景 AIGC 图像超分、夕阳形态重塑，助力 Mate 80 系列与 Mate X7 影像能力进阶。',
    ],
  },
  {
    id: 'pangu-beta-console',
    kind: '工作',
    title: '盘古心声公测前台',
    period: '2024.09 — 2024.11',
    start: [2024, 9],
    end: [2024, 11],
    location: '上海',
    tags: ['WeLink Mini Program', 'HarmonyOS', 'Gateway', 'TypeScript'],
    highlights: [
      '基于 WeLink 小程序从 0 到 1 构建公测前台，完成项目架构、核心页面与关键交互链路落地。',
      '适配原生鸿蒙系统，处理运行环境与平台能力差异，保证核心功能在目标设备上的兼容性与体验一致性。',
      '解决复杂网关通信问题，梳理请求链路、鉴权与异常状态，统一通信封装并提升接口调用的稳定性。',
    ],
  },
  {
    id: 'ds-component-library',
    kind: '实习',
    title: 'DS 前端通用组件库',
    period: '2023.01 — 2023.04',
    start: [2023, 1],
    end: [2023, 4],
    location: '上海',
    tags: ['Vue 3', 'TypeScript', 'Vitest', 'Tailwind CSS'],
    highlights: [
      '参与通用组件开发与优化，维护组件库文档和 app-container。',
      '摆脱第三方组件库依赖，重写 file-upload、form-item、popover、button 等核心组件。',
      '兼顾原有 API 兼容性、复杂业务边界与多个组件之间的联动行为。',
    ],
  },
  {
    id: 'automation-education',
    kind: '教育',
    title: '自动化专业',
    period: '2020.10 — 2024.06',
    start: [2020, 10],
    end: [2024, 6],
    tags: ['Automation', 'Programming', 'Mathematical Modeling', 'Competition'],
    highlights: [
      '在自动化专业学习，并通过编程、数学建模与跨学科实践持续拓展技术边界。',
      '获“互联网+”大学生创新创业大赛省级金奖、大学生创业比赛省级二等奖。',
      '保持主动学习与快速迁移能力，将课程知识转化为竞赛方案、软件作品与工程实践。',
    ],
  },
];
