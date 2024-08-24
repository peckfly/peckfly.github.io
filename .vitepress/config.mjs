import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto-gen-sidebar.mjs"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "Peckfly's Blog",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle: '文章目录',
    // https://vitepress.dev/reference/default-theme-config
    outline: [2,6],
    logo: "favicon.ico", // 配置logo位置，public目录
    nav: [
      { text: '首页', link: '/' },
      { text: '后端',
        items: [
          { text: "Java", link: "/docs/backend/java" },
          { text: "Go", link: "/docs/backend/go" },
        ]
      },
      {
        text: '基础',
        items: [
          { text: "计算机网络", link: "/docs/cs-基础/network" },
          { text: "操作系统", link: "/docs/cs-基础/os" },
          { text: "Linux", link: "/docs/cs-基础/linux" },
        ]
      },
      {
        text: '项目',
        items: [
          { text: "分布式压测工具", link: "/docs/project/gopeck" },
        ]
      },
      {
        text: '算法',
        items: [
          { text: "模板", link: "/docs/algo/模板/Base/BinarySearch.md" },
        ]
      },
      {
        text: '技术',
        items: [
          { text: "Kubernetes", link: "/docs/tech/kubernetes" },
        ]
      },
      {
        text: '更多',
        items: [
          { text: "高可用", link: "/docs/tech/ha" },
        ]
      }
    ],
    sidebar: {
      "/docs/algo": set_sidebar("/docs/algo")
    },

    lastUpdated: true, // 显示上次修改时间

    socialLinks: [
      { icon: 'github', link: 'https://github.com/peckfly/peckfly.github.io' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>码云</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>',
        },
        link: "https://gitee.com/peckfly"
      },
    ],
    // 底部配置
    footer: {
      copyright: "Copyright@ 2024 Peckfly",
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
  // 配置markdown扩展
  markdown: {
    // lineNumbers: true, // 开启代码块行号
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    // anchor: {
    //   permalink: markdownItAnchor.permalink.headerLink(),
    // },

    // // options for @mdit-vue/plugin-toc
    // // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    // toc: { level: [2, 3] },
    // config: (md) => {
    //   // use more markdown-it plugins!
    //   md.use(tocPlugin);
    // },
  },
})
