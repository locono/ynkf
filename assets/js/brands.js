/* ============================================================
   品牌馆交互：分类 Tab / 产区筛选 / 关键词搜索 / 详情展开
   筛选状态同步写入 URL 参数（?cat=&region=&q=&b=）
   ============================================================ */
(function () {
  "use strict";

  var grid = document.getElementById("brandGrid");
  var tabsBox = document.getElementById("brandTabs");
  var chipsBox = document.getElementById("brandChips");
  var searchInput = document.getElementById("brandSearch");
  var metaCount = document.getElementById("brandCount");
  var metaReset = document.getElementById("brandReset");
  if (!grid || !window.BRANDS) return;

  var CATS = window.CATS;
  var REGIONS = window.REGIONS;
  var BRANDS = window.BRANDS;

  var openId = null;

  var state = { cat: "all", region: "all", q: "" };

  /* ---------- URL 参数 ---------- */
  function readParams() {
    var p = new URLSearchParams(location.search);
    var c = p.get("cat");
    if (c && (c === "all" || CATS.some(function (x) { return x.key === c; }))) state.cat = c;
    var r = p.get("region");
    if (r && (r === "all" || REGIONS.indexOf(r) > -1)) state.region = r;
    state.q = p.get("q") || "";
    openId = p.get("b") || null;
  }

  function writeParams() {
    var p = new URLSearchParams();
    if (state.cat !== "all") p.set("cat", state.cat);
    if (state.region !== "all") p.set("region", state.region);
    if (state.q) p.set("q", state.q);
    if (openId) p.set("b", openId);
    var qs = p.toString();
    /* 单页结构：始终带上品牌馆锚点，保证分享链接直接落到品牌区 */
    var url = location.pathname + (qs ? "?" + qs : "") + "#brands";
    try {
      if (window.history && history.replaceState) history.replaceState(null, "", url);
    } catch (err) {
      /* file:// 协议下部分浏览器禁用 replaceState，忽略即可 */
    }
  }

  /* ---------- 工具 ---------- */
  function initials(name) {
    var n = name.replace(/[（(].*$/, "").trim();
    if (/^[A-Za-z]/.test(n)) {
      var w = n.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
      return ((w[0] || "")[0] || "") + ((w[1] || "")[0] || "").toUpperCase();
    }
    return n.slice(0, 2);
  }

  function catName(key) {
    var c = CATS.find(function (x) { return x.key === key; });
    return c ? c.name : "—";
  }

  function matched() {
    var q = state.q.trim().toLowerCase();
    return BRANDS.filter(function (b) {
      if (state.cat !== "all" && b.cat !== state.cat) return false;
      if (state.region !== "all" && b.region !== state.region) return false;
      if (!q) return true;
      var hay = [b.name, b.en, b.type, b.desc, b.region, b.tags.join(" "), b.products.join(" ")]
        .join(" ").toLowerCase();
      return hay.indexOf(q) > -1;
    });
  }

  function regionAvail() {
    var pool = BRANDS.filter(function (b) {
      return state.cat === "all" || b.cat === state.cat;
    });
    return REGIONS.filter(function (r) {
      return pool.some(function (b) { return b.region === r; });
    });
  }

  /* ---------- 渲染：Tab ---------- */
  function renderTabs() {
    if (!tabsBox) return;
    var html = '<button class="tab' + (state.cat === "all" ? " is-on" : "") + '" data-cat="all">全部<b>' + BRANDS.length + "</b></button>";
    CATS.forEach(function (c) {
      var n = BRANDS.filter(function (b) { return b.cat === c.key; }).length;
      html += '<button class="tab' + (state.cat === c.key ? " is-on" : "") + '" data-cat="' + c.key + '">' +
        c.name + "<b>" + n + "</b></button>";
    });
    tabsBox.innerHTML = html;
  }

  /* ---------- 渲染：产区 chips ---------- */
  function renderChips() {
    if (!chipsBox) return;
    var avail = regionAvail();
    var html = '<button class="chip' + (state.region === "all" ? " is-on" : "") + '" data-region="all">全部产区</button>';
    avail.forEach(function (r) {
      html += '<button class="chip' + (state.region === r ? " is-on" : "") + '" data-region="' + r + '">' + r + "</button>";
    });
    chipsBox.innerHTML = html;
  }

  /* ---------- 渲染：卡片 ---------- */
  function cardHTML(b) {
    return (
      '<button class="bcard" data-id="' + b.id + '" type="button">' +
        '<div class="bcard__top">' +
          '<span class="blogo" style="background:' + b.color + '">' + initials(b.name) + "</span>" +
          "<span><span class=\"bcard__name\">" + b.name + "</span>" +
          '<span class="bcard__type">' + b.type + " · " + b.region + "</span></span>" +
        "</div>" +
        '<p class="bcard__desc">' + b.desc + "</p>" +
        '<div class="bcard__foot">' +
          '<span class="tag tag--flat">' + catName(b.cat) + "</span>" +
          b.badges.slice(0, 2).map(function (x) {
            return '<span class="badge' + (/出口|历史|龙头|源头|大户/.test(x) ? " badge--hot" : "") + '">' + x + "</span>";
          }).join("") +
        "</div>" +
      "</button>"
    );
  }

  /* ---------- 渲染：详情 ---------- */
  function detailHTML(b) {
    var recos = BRANDS.filter(function (x) {
      return x.id !== b.id && (x.region === b.region || x.cat === b.cat);
    }).slice(0, 5);

    return (
      '<div class="bdetail" id="brandDetail">' +
        '<div class="bdetail__head">' +
          '<div class="bdetail__id">' +
            '<span class="blogo" style="background:' + b.color + '">' + initials(b.name) + "</span>" +
            "<div><h3>" + b.name + "</h3><span>" + b.en + " · " + b.region + " · 约 " + b.founded + " 起</span></div>" +
          "</div>" +
          '<button class="xbtn" type="button" id="detailClose" aria-label="关闭详情">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
          "</button>" +
        "</div>" +
        '<div class="bdetail__grid">' +
          "<dl class=\"bdetail__dl\">" +
            "<div><dt>所属产区</dt><dd>" + b.region + "</dd></div>" +
            "<div><dt>分类形态</dt><dd>" + catName(b.cat) + "</dd></div>" +
            "<div><dt>品牌类型</dt><dd>" + b.type + "</dd></div>" +
            "<div><dt>起始年份</dt><dd>" + b.founded + "</dd></div>" +
            "<div><dt>关键词</dt><dd>" + b.tags.slice(0, 2).join(" / ") + "</dd></div>" +
          "</dl>" +
          "<div>" +
            '<div class="bdetail__block"><h5>品牌简介</h5><p>' + b.desc + "</p></div>" +
            '<div class="bdetail__block"><h5>代表产品</h5><ul class="sellist">' +
              b.products.map(function (p) { return "<li>" + p + "</li>"; }).join("") +
            "</ul></div>" +
            '<div class="bdetail__block"><h5>高亮卖点</h5><ul class="sellist">' +
              b.highlights.map(function (p) { return "<li>" + p + "</li>"; }).join("") +
            "</ul></div>" +
            '<div class="bdetail__block"><h5>标签</h5><div class="tags">' +
              b.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("") +
            "</div></div>" +
            '<div class="bdetail__acts">' +
              (b.site
                ? '<a class="btn btn--coffee btn--sm" href="' + b.site + '" target="_blank" rel="noopener">访问官网' +
                  '<svg class="btn__arrow" width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>'
                : '<span class="btn btn--outline btn--sm" style="pointer-events:none;opacity:.55">官网链接待补充</span>') +
              '<button class="btn btn--outline btn--sm" type="button" id="detailClose2">收起详情</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
        (recos.length
          ? '<div class="recos"><h5>同产区 / 同形态推荐</h5><div class="reco-row">' +
            recos.map(function (r) {
              return '<button class="reco" type="button" data-goto="' + r.id + '">' +
                '<i style="background:' + r.color + '">' + initials(r.name) + "</i>" + r.name +
                '<span style="color:var(--muted);font-weight:400;font-size:12px">' + r.region + "</span></button>";
            }).join("") +
            "</div></div>"
          : "") +
      "</div>"
    );
  }

  function closeDetail() {
    var d = document.getElementById("brandDetail");
    if (d) d.remove();
    grid.querySelectorAll(".bcard.is-open").forEach(function (c) {
      c.classList.remove("is-open");
    });
  }

  function openDetail(id) {
    var b = BRANDS.find(function (x) { return x.id === id; });
    if (!b) return;
    closeDetail();
    var card = grid.querySelector('.bcard[data-id="' + id + '"]');
    if (!card) return;
    card.classList.add("is-open");
    var wrap = document.createElement("div");
    wrap.innerHTML = detailHTML(b);
    var node = wrap.firstElementChild;

    /* 插入到该卡片所在行的末尾，实现「就地展开」 */
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".bcard"));
    var top = card.offsetTop;
    var last = card;
    var started = false;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i] === card) { started = true; continue; }
      if (started && cards[i].offsetTop === top) last = cards[i];
      else if (started) break;
    }
    last.insertAdjacentElement("afterend", node);

    openId = id;
    writeParams();

    var c1 = document.getElementById("detailClose");
    var c2 = document.getElementById("detailClose2");
    if (c1) c1.addEventListener("click", function () { closeDetail(); openId = null; writeParams(); });
    if (c2) c2.addEventListener("click", function () { closeDetail(); openId = null; writeParams(); });
    node.querySelectorAll("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var gid = btn.dataset.goto;
        var tb = BRANDS.find(function (x) { return x.id === gid; });
        if (!tb) return;
        state.cat = tb.cat;
        state.region = "all";
        state.q = "";
        if (searchInput) searchInput.value = "";
        render();
        openDetail(gid);
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    requestAnimationFrame(function () {
      var y = node.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }

  /* ---------- 主渲染 ---------- */
  function render() {
    var list = matched();
    renderTabs();
    renderChips();
    if (searchInput && searchInput.value !== state.q) searchInput.value = state.q;

    var slice = list;

    if (!slice.length) {
      grid.innerHTML =
        '<div class="empty">' +
          '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
          "<p>没有匹配的品牌</p><span>换个筛选条件试试</span></div>";
    } else {
      grid.innerHTML = slice.map(cardHTML).join("");
      grid.querySelectorAll(".bcard").forEach(function (c) {
        c.addEventListener("click", function () {
          var id = c.dataset.id;
          if (openId === id) { closeDetail(); openId = null; writeParams(); return; }
          openDetail(id);
        });
      });
    }

    if (metaCount) {
      var bits = [];
      bits.push(state.cat === "all" ? "全部形态" : catName(state.cat));
      bits.push(state.region === "all" ? "全部产区" : state.region);
      if (state.q) bits.push("“" + state.q + "”");
      metaCount.innerHTML = "共 <b>" + list.length + "</b> 个品牌 · " + bits.join(" / ");
    }
    if (metaReset) {
      metaReset.style.display =
        state.cat === "all" && state.region === "all" && !state.q ? "none" : "";
    }

    if (openId && list.some(function (b) { return b.id === openId; })) openDetail(openId);
    else if (openId) { openId = null; writeParams(); }
  }

  /* ---------- 事件 ---------- */
  if (tabsBox) {
    tabsBox.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cat]");
      if (!t) return;
      state.cat = t.dataset.cat;
      /* 切换分类后，若当前产区在该分类下无品牌则回到「全部产区」 */
      if (state.region !== "all" && regionAvail().indexOf(state.region) === -1)       state.region = "all";
      openId = null;
      render();
      writeParams();
    });
  }

  if (chipsBox) {
    chipsBox.addEventListener("click", function (e) {
      var t = e.target.closest("[data-region]");
      if (!t) return;
      state.region = t.dataset.region;
      openId = null;
      render();
      writeParams();
    });
  }

  if (searchInput) {
    var timer = null;
    searchInput.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.q = searchInput.value;
        openId = null;
        render();
        writeParams();
      }, 200);
    });
  }

  if (metaReset) {
    metaReset.addEventListener("click", function (e) {
      e.preventDefault();
      state = { cat: "all", region: "all", q: "" };
      if (searchInput) searchInput.value = "";
      openId = null;
      render();
      writeParams();
    });
  }

  readParams();
  render();
})();
