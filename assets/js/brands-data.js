/* ============================================================
   品牌馆数据源
   说明：以下资料由公开渠道整理，用于科普展示，非官方排名；
        如有出入或品牌方需更正/入驻，见「关于」页邮箱联系。
   ============================================================ */
window.CATS = [
  { key: "instant", name: "速溶 / 冻干类", short: "速溶冻干" },
  { key: "drip", name: "挂耳 / 咖啡液类", short: "挂耳咖啡液" },
  { key: "bean", name: "烘焙豆类", short: "烘焙豆" },
  { key: "cafe", name: "连锁门店 / 现制咖啡", short: "连锁现制" }
];

window.REGIONS = ["保山", "普洱", "临沧", "德宏", "大理", "昆明", "全国"];

window.BRANDS = [
  /* ---------- 速溶 / 冻干类 ---------- */
  {
    id: "hogood", name: "后谷咖啡", en: "HOGOOD", cat: "instant", color: "#C8452E",
    region: "德宏", founded: "1980s", type: "速溶粉 / 冻干 / 生豆贸易",
    desc: "云南咖啡产业化的标志性企业之一，从德宏芒市起步，覆盖种植、加工到速溶粉与冻干的全链条。",
    badges: ["国家级龙头企业", "出口多国"],
    tags: ["德宏产区", "全产业链", "速溶"],
    products: ["纯咖啡粉", "冻干咖啡颗粒", "三合一速溶", "生豆出口"],
    highlights: ["国内较早规模化生产速溶咖啡的云南企业", "拥有自有种植基地与初加工体系", "产品出口至多个国家和地区"],
    site: ""
  },
  {
    id: "sinloy", name: "辛鹿咖啡", en: "SINLOY", cat: "instant", color: "#8D6242",
    region: "保山", founded: "2010s", type: "速溶 / 冻干 / 挂耳",
    desc: "保山产区代表性品牌，主打高性价比的云南小粒咖啡速溶与冻干产品。",
    badges: ["保山产区", "电商热销"],
    tags: ["保山产区", "小粒咖啡", "冻干"],
    products: ["冻干咖啡", "挂耳咖啡", "咖啡液", "精品速溶"],
    highlights: ["依托保山小粒咖啡原料优势", "线上渠道销量长期居前", "产品线覆盖入门到精品"],
    site: ""
  },
  {
    id: "fourcats", name: "四只猫", en: "FOUR CATS", cat: "instant", color: "#C79A4B",
    region: "昆明", founded: "2010s", type: "速溶咖啡 / 风味咖啡",
    desc: "以年轻化包装与口味创新见长的云南速溶咖啡品牌，主打便捷与风味多样化。",
    badges: ["年轻化定位"],
    tags: ["昆明", "风味速溶", "便捷"],
    products: ["三合一速溶", "黑咖啡速溶", "风味咖啡"],
    highlights: ["包装与口味设计更贴近年轻消费群体", "主打日常高频饮用场景"],
    site: ""
  },
  {
    id: "zhongfei", name: "中啡咖啡", en: "ZHONGFEI", cat: "instant", color: "#3E7A55",
    region: "昆明", founded: "2010s", type: "速溶 / 冻干 / 烘焙豆",
    desc: "立足昆明的云南咖啡品牌，兼顾速溶产品与烘焙豆线，线上线下渠道并行。",
    badges: ["线上线下并行"],
    tags: ["昆明", "全品类", "冻干"],
    products: ["冻干咖啡", "挂耳咖啡", "烘焙豆"],
    highlights: ["产品形态覆盖速溶到精品豆", "兼顾大众与进阶人群"],
    site: ""
  },
  {
    id: "yunlu", name: "云潞咖啡", en: "YUNLU", cat: "instant", color: "#6B4226",
    region: "保山", founded: "1990s", type: "速溶粉 / 生豆加工",
    desc: "保山老牌咖啡加工企业，长期从事云南小粒咖啡的初加工与速溶粉生产。",
    badges: ["保山产区", "老牌加工"],
    tags: ["保山产区", "初加工", "速溶"],
    products: ["速溶咖啡粉", "烘焙豆", "生豆"],
    highlights: ["扎根保山产区多年", "具备初加工与深加工能力"],
    site: ""
  },
  {
    id: "nestle-yn", name: "雀巢（云南）", en: "Nestlé Yunnan", cat: "instant", color: "#A33722",
    region: "普洱", founded: "1988", type: "速溶咖啡 / 原料采购",
    desc: "1988 年进入普洱，是推动云南咖啡产业化与国际标准接轨的关键力量。",
    badges: ["历史节点", "外资引入"],
    tags: ["普洱产区", "产业化推手", "历史"],
    products: ["速溶咖啡", "原料采购体系", "农技支持"],
    highlights: ["1988 年在普洱设立咖啡农业技术援助项目", "带来标准化种植与国际采购体系", "深刻影响云南咖啡产业格局"],
    site: ""
  },

  /* ---------- 挂耳 / 咖啡液类 ---------- */
  {
    id: "sumida", name: "隅田川（云南线）", en: "SUMIDA", cat: "drip", color: "#C8452E",
    region: "全国", founded: "2010s", type: "咖啡液 / 挂耳",
    desc: "以「鲜咖啡」定位的规模化品牌，推出使用云南豆的产品线，把云南风味带进大众日常。",
    badges: ["云南豆产品线"],
    tags: ["咖啡液", "云南豆", "大众化"],
    products: ["胶囊咖啡液", "挂耳咖啡", "冻干"],
    highlights: ["把云南豆引入大规模量贩渠道", "推动云南豆的大众认知"],
    site: ""
  },
  {
    id: "yongpu", name: "永璞咖啡", en: "YONGPU", cat: "drip", color: "#8D6242",
    region: "全国", founded: "2010s", type: "咖啡液 / 冻干",
    desc: "以便携咖啡液与联名设计走红的品牌，曾推出云南单一产区限定产品。",
    badges: ["云南限定", "联名出圈"],
    tags: ["咖啡液", "云南限定", "设计感"],
    products: ["闪萃咖啡液", "冻干即溶", "云南限定挂耳"],
    highlights: ["云南产区限定产品引发关注", "设计与内容营销能力突出"],
    site: ""
  },
  {
    id: "mingqian", name: "明谦咖啡", en: "MINGQIAN", cat: "drip", color: "#3E7A55",
    region: "全国", founded: "2000s", type: "烘焙 / 挂耳 / 咖啡液",
    desc: "国内早期精品咖啡烘焙商之一，长期采购与出品云南单一产区豆。",
    badges: ["精品先行者"],
    tags: ["精品烘焙", "云南单一产区", "挂耳"],
    products: ["云南单一产区挂耳", "烘焙豆", "咖啡液"],
    highlights: ["较早系统性出品云南单一产区", "在精品圈层推动云南豆口碑"],
    site: ""
  },
  {
    id: "santunban", name: "三顿半", en: "SATURNBIRD", cat: "drip", color: "#C79A4B",
    region: "全国", founded: "2010s", type: "冻干即溶 / 精品速溶",
    desc: "以迷你杯冻干即溶打开「精品速溶」品类，多次推出云南产区主题产品。",
    badges: ["云南主题产品"],
    tags: ["冻干", "精品速溶", "云南产区"],
    products: ["数字系列冻干", "云南产区限定"],
    highlights: ["把云南豆带入精品速溶赛道", "强调产地风味表达"],
    site: ""
  },
  {
    id: "fisher", name: "鱼眼咖啡", en: "FISHER", cat: "drip", color: "#6B4226",
    region: "全国", founded: "2010s", type: "烘焙 / 挂耳 / 门店",
    desc: "国内精品烘焙与门店品牌，长期出品云南单一产区挂耳与咖啡液产品。",
    badges: ["云南单一产区"],
    tags: ["精品", "云南豆", "挂耳"],
    products: ["云南单一产区挂耳", "咖啡液", "烘焙豆"],
    highlights: ["长期将云南产区列入常规豆单", "强调产地风味描述与可追溯批次"],
    site: ""
  },
  {
    id: "kelin", name: "柯林咖啡", en: "COLIN", cat: "drip", color: "#4A3B30",
    region: "昆明", founded: "2000s", type: "挂耳 / 速溶 / 器具",
    desc: "昆明本土咖啡品牌，产品线覆盖挂耳、速溶与咖啡器具，长期服务本地与线上用户。",
    badges: ["本土品牌"],
    tags: ["昆明", "挂耳", "器具"],
    products: ["挂耳咖啡", "速溶咖啡", "手冲器具"],
    highlights: ["云南本土起家的综合咖啡品牌", "产品线与渠道较为多元"],
    site: ""
  },

  /* ---------- 烘焙豆类 ---------- */
  {
    id: "bidun", name: "比顿咖啡", en: "BIDUN", cat: "bean", color: "#C8452E",
    region: "保山", founded: "2010s", type: "庄园 / 烘焙豆",
    desc: "保山产区精品庄园代表，自有基地覆盖高黎贡山沿线，主打单一庄园批次。",
    badges: ["自有庄园", "高黎贡山"],
    tags: ["保山产区", "单一庄园", "精品豆"],
    products: ["单一庄园水洗豆", "日晒批次", "微批次"],
    highlights: ["自有种植基地与处理站", "主打可追溯的庄园批次", "风味偏坚果巧克力调性"],
    site: ""
  },
  {
    id: "manlaojiang", name: "曼老江", en: "MANLAOJIANG", cat: "bean", color: "#3E7A55",
    region: "普洱", founded: "2010s", type: "庄园 / 烘焙豆",
    desc: "普洱产区精品咖啡品牌，专注水洗与日晒处理法的批次化出品。",
    badges: ["普洱产区", "批次可追溯"],
    tags: ["普洱产区", "水洗日晒", "精品豆"],
    products: ["水洗豆", "日晒豆", "微批次"],
    highlights: ["普洱核心产区自有基地", "注重处理法与批次管理", "风味偏醇厚均衡"],
    site: ""
  },
  {
    id: "gaoligong", name: "高黎贡咖啡", en: "GAOLIGONG", cat: "bean", color: "#6B4226",
    region: "保山", founded: "2010s", type: "产区品牌 / 烘焙豆",
    desc: "以高黎贡山地理标识为核心的产区型品牌，强调山地微气候带来的风味差异。",
    badges: ["地理标识", "山地微气候"],
    tags: ["保山产区", "高黎贡山", "产区品牌"],
    products: ["产区拼配豆", "单一海拔批次", "挂耳"],
    highlights: ["以山脉地理作为品牌叙事核心", "强调海拔与微气候对风味的影响"],
    site: ""
  },
  {
    id: "aini", name: "爱伲咖啡", en: "AINI", cat: "bean", color: "#C79A4B",
    region: "普洱", founded: "2000s", type: "庄园 / 牧场+咖啡复合",
    desc: "普洱大型庄园型品牌，以「咖啡+牧场」的复合农业模式与规模化种植基地著称。",
    badges: ["大型庄园", "复合农业"],
    tags: ["普洱产区", "规模化", "庄园"],
    products: ["水洗豆", "日晒豆", "生豆供应"],
    highlights: ["规模化自有种植基地", "复合农业模式", "兼具生豆供应与自有品牌"],
    site: ""
  },
  {
    id: "torch", name: "炬点咖啡", en: "TORCH", cat: "bean", color: "#8D6242",
    region: "昆明", founded: "2010s", type: "烘焙 / 培训 / 生豆贸易",
    desc: "昆明本土精品烘焙与培训机构，深度参与云南生豆评级、处理法实验与产区推广。",
    badges: ["产区推手", "培训体系"],
    tags: ["昆明", "精品烘焙", "生豆贸易"],
    products: ["云南单一产区豆", "处理法实验批次", "烘焙课程"],
    highlights: ["长期参与云南生豆评级与赛事", "推广创新处理法实验", "连接产区与市场"],
    site: ""
  },
  {
    id: "zhukula", name: "朱苦拉咖啡", en: "ZHUKULA", cat: "bean", color: "#A33722",
    region: "大理", founded: "1892", type: "古咖啡林 / 产区品牌",
    desc: "大理宾川朱苦拉村保存着 1892 年引种的古咖啡树，被视为中国咖啡种植的源头之一。",
    badges: ["历史源头", "古咖啡树"],
    tags: ["大理", "历史", "铁皮卡"],
    products: ["古树林咖啡豆", "产区文创"],
    highlights: ["1892 年引种的古咖啡树群落", "中国咖啡种植历史的活标本", "以铁皮卡老树种为主"],
    site: ""
  },

  /* ---------- 连锁门店 / 现制咖啡 ---------- */
  {
    id: "siyeka", name: "四叶咖", en: "FOUR LEAF", cat: "cafe", color: "#3E7A55",
    region: "昆明", founded: "2020s", type: "连锁咖啡门店",
    desc: "云南本土成长起来的连锁咖啡品牌，以「云南豆」为核心卖点快速扩张。",
    badges: ["本土连锁", "云南豆主打"],
    tags: ["昆明", "本土连锁", "云南豆"],
    products: ["现制咖啡", "云南豆饮品", "烘焙零售"],
    highlights: ["把云南豆作为品牌核心叙事", "门店规模在西南快速扩张"],
    site: ""
  },
  {
    id: "xingye", name: "幸也咖啡", en: "XINGYE", cat: "cafe", color: "#C8452E",
    region: "昆明", founded: "2020s", type: "连锁咖啡门店",
    desc: "云南本土连锁品牌，主打高性价比现制咖啡与本地化口味。",
    badges: ["本土连锁", "高性价比"],
    tags: ["昆明", "本土连锁", "现制"],
    products: ["现制咖啡", "果咖", "轻食"],
    highlights: ["本土化的产品与定价策略", "深耕云南本地市场"],
    site: ""
  },
  {
    id: "luckin", name: "瑞幸咖啡", en: "LUCKIN", cat: "cafe", color: "#4A3B30",
    region: "全国", founded: "2010s", type: "连锁咖啡门店",
    desc: "全国性连锁巨头，是云南咖啡豆的重要采购方之一，设有云南相关产区产品。",
    badges: ["云南豆采购大户"],
    tags: ["全国", "采购大户", "现制"],
    products: ["现制咖啡", "云南产区系列", "零售咖啡液"],
    highlights: ["大规模采购带动云南生豆需求", "设有云南产区主题产品"],
    site: ""
  },
  {
    id: "manner", name: "Manner Coffee", en: "MANNER", cat: "cafe", color: "#6B4226",
    region: "全国", founded: "2010s", type: "连锁咖啡门店",
    desc: "高性价比精品连锁，常在菜单中推出云南单一产区 SOE 与限定豆单。",
    badges: ["云南 SOE"],
    tags: ["全国", "精品连锁", "云南 SOE"],
    products: ["现制咖啡", "云南 SOE", "零售豆"],
    highlights: ["云南豆进入平价精品门店菜单", "强调产地风味表达"],
    site: ""
  },
  {
    id: "cotti", name: "库迪咖啡", en: "COTTI", cat: "cafe", color: "#8D6242",
    region: "全国", founded: "2020s", type: "连锁咖啡门店",
    desc: "快速扩张的连锁品牌，供应链中大量使用云南产区的咖啡原料。",
    badges: ["规模化采购"],
    tags: ["全国", "连锁", "供应链"],
    products: ["现制咖啡", "饮品"],
    highlights: ["规模化采购云南生豆", "推动云南豆的工业化应用"],
    site: ""
  },
  {
    id: "seesaw", name: "Seesaw Coffee", en: "SEESAW", cat: "cafe", color: "#C79A4B",
    region: "全国", founded: "2010s", type: "连锁精品咖啡",
    desc: "精品连锁代表，长期推出云南单一产区豆单与创意云南主题饮品。",
    badges: ["云南主题", "创意饮品"],
    tags: ["全国", "精品连锁", "云南豆单"],
    products: ["现制咖啡", "云南豆单", "创意特调"],
    highlights: ["云南产区豆单常设", "创意饮品放大云南风味特征"],
    site: ""
  }
];
