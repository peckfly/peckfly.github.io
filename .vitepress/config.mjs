import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto-gen-sidebar.mjs"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Peckfly's Blog",
  head: [["link", { rel: "icon", href: "/public/favicon.ico" }]],
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
          { text: "模板", link: "/docs/algo/模板/基础/二分" },
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
      { icon: 'github', link: 'https://github.com/peckfly/blog' },
      {
        icon: {
          svg: '<svg t="1704626282666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4228"></path></svg>',
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
