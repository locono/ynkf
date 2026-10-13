# 云南咖啡 · ynkf.net

> 从北纬 21° 的高原，到杯中的一抹果酸。

一个关于云南咖啡的**非商业、非官方**静态科普站点。以产区地理为骨架，以「从种子到杯子」为叙事线，以品牌数据为可扩展核心。

**全站只有一个页面**：所有内容集中在 `index.html`，通过锚点导航，滚动时自动高亮当前章节。

## 页面结构（单页章节）

| 锚点 | 章节 | 内容 |
| --- | --- | --- |
| `#home` | 主视觉 | 全屏 SVG 主视觉（梯田 / 红果 / 晾晒场）+ 定位语 |
| — | 核心数据条 | 种植面积、全国产量占比、核心产区、主栽品种 |
| `#guide` | 内容导览 | 四条线索入口卡（产区与风土 / 品种与加工 / 品牌馆 / 咖啡文化）+「一粒豆的云南旅程」 |
| `#terroir` | 01 产区与风土 | 地理优势数字卡、手绘云南地图（4 个可点产区点位）、四大产区卡片、种植历史时间线 |
| `#varieties` | 02 品种与加工 | 五个主栽品种、风味轮、四种处理法总览卡、烘焙程度示意（`#process` 锚点落在处理法段） |
| `#brands` | 03 品牌馆 | 24 个品牌 · 四类形态 Tab + 产区筛选 + 关键词搜索 + 就地展开详情 |
| `#culture` | 04 咖啡文化 | 各地咖啡节（6 地：普洱 / 保山 / 临沧 / 德宏 / 昆明 / 大理，含形态、时间与看点） |
| `#about` | 05 关于 | 单排两栏：左「关于」章节头（引言 + 非商业/纯静态/无追踪数据条）、右「网站定位声明」（`#statement`） |

## 目录

```
├── index.html            # 全站唯一页面（含全部 5 个章节）
├── robots.txt
└── assets/
    ├── css/main.css      # 全站样式（设计变量集中在 :root）
    └── js/
        ├── site.js       # 导航滚动变实底、单页滚动高亮、回到顶部、滚动揭示、数字滚动、地图联动
        ├── brands-data.js# 品牌数据源（window.BRANDS）
        └── brands.js     # 品牌馆筛选 / 搜索 / 详情 / URL 同步
```

## 技术特点

- **全静态单页**：纯 HTML / CSS / 原生 JavaScript，无构建步骤、无框架、无 CDN 依赖。
- **零外部资源**：字体走系统字体栈，图标与插画全部为内联 SVG，favicon 为 data URI。
- **无追踪**：不含任何统计脚本、Cookie 或第三方请求。
- **锚点导航**：点击导航平滑滚动到章节；滚动时自动高亮当前章节；右下角有「回到顶部」。
- **响应式**：1080 / 860 / 620 三档断点，移动端走汉堡抽屉。
- **支持 `prefers-reduced-motion`**。

## 部署

### 推送到 GitHub

```bash
git init
git add .
git commit -m "feat: 云南咖啡单页静态站"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### Cloudflare Pages（推荐）

1. 进入 Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git。
2. 选择仓库，构建配置保持默认（**Build command 留空**，Build output directory 填 `/`）。
3. Save and Deploy。之后每次 push 到主分支会自动重新部署。

### GitHub Pages

Settings → Pages → Source 选择 `Deploy from a branch` → 分支选 `main`、目录选 `/ (root)` → Save。

### 本地预览

无需构建，直接打开 `index.html` 即可；或用任意静态服务器：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 上线前需要改的地方

1. **联系邮箱**：页脚「内容纠错 / 联系」按钮为两行胶囊（第一行文字 + 图标，第二行邮箱 `imuse@163.com`），点击整颗按钮即复制邮箱，按钮下方常驻提示「点击邮箱可复制」，复制成功后原地切换为「邮箱已复制」，不跳转。改邮箱只需改 `index.html` 中 `.mailbox` 的 `data-mail` 属性、`mailbtn__addr` 显示文本与按钮 `aria-label` 三处。
2. **品牌数据**：`assets/js/brands-data.js` 中的品牌资料来自公开渠道整理，部分成立年份以「约 / 年代」口径标注。核对后再上线，或直接删掉不确定的条目。
3. **品牌官网链接**：数据里 `site` 字段目前留空（详情页会显示「官网链接待补充」），填入 URL 后详情页会自动出现「访问官网」按钮。
4. **元信息**：可按实际域名补充 `og:url` 等字段。

> 页脚底栏左为大号金色域名 **ynkf.net**（`.footer__domain`），右为版权行。

## 维护

### 新增品牌

编辑 `assets/js/brands-data.js`，在 `window.BRANDS` 数组中追加一条：

```js
{
  id: "brand-slug",            // 唯一标识，用于 URL 参数
  name: "品牌名", en: "EN NAME",
  cat: "instant",              // instant | drip | bean | cafe
  color: "#C8452E",            // Logo 底色
  region: "保山",               // 需存在于 window.REGIONS
  founded: "2010s",
  type: "速溶 / 冻干",
  desc: "一句话简介",
  badges: ["徽章"],
  tags: ["标签"],
  products: ["代表产品"],
  highlights: ["高亮卖点"],
  site: ""                     // 官网 URL，留空则不显示按钮
}
```

当前品牌数 24，一次全部渲染（24 个远未达到分批阈值，故 `brands.js` 不做分批加载）。

### 新增产区

在 `assets/js/brands-data.js` 的 `window.REGIONS` 数组中添加产区名即可，筛选条会自动出现对应按钮。

### 新增 / 调整章节

1. 在 `index.html` 中复制一份 `<section class="chapter" id="xxx">` 包裹的结构（含 `chapter__head`）。
2. 在顶部导航与移动抽屉中加上对应锚点链接，并给导航 `<a>` 加 `data-nav="xxx"`。
3. 把新章节 id 加入 `assets/js/site.js` 里的 `SECTIONS` 数组（顺序决定滚动高亮的判定顺序）。

### 修改配色

所有颜色、字号、圆角、动效曲线都集中在 `assets/css/main.css` 顶部的 `:root` 变量中。

### 调整竖向间距

版式的竖向节奏集中在四个类上，改这几处即可整体收紧 / 放松：

| 类 | 桌面 | ≤860px | 说明 |
|---|---|---|---|
| `.section` | `padding: 56px 0` | 44 / 38px | 每个内容区块的上下留白 |
| `.section__head` | `margin-bottom: 30px` | — | 区块标题到正文的距离 |
| `.chapter__head` | `padding: 56px 0 20px` | 42 / 16px | 章节头（大编号 + 标题）的上下留白 |
| `.chapter__head--row` | `padding: 56px 0 56px` | 44 / 44px | 「关于」章节的两栏头 |

`.chapter--plain`（无章节头）与 `.footer` 另有各自的小留白值。

## 免责声明

本站为纯信息展示与科普用途，与文中提及的任何品牌、企业及机构均无隶属或授权关系。所有数据来自公开渠道整理，仅作参考，不构成投资或采购建议。
