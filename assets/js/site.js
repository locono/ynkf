/* ============================================================
   云南咖啡 · 全站公共脚本
   纯原生 JS，无任何依赖
   ============================================================ */
(function () {
  "use strict";

  var doc = document;

  /* ---------- 1. 导航：滚动变实底 ---------- */
  var nav = doc.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    var y = window.scrollY || doc.documentElement.scrollTop;
    nav.classList.toggle("nav--solid", y > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 2. 移动端抽屉 ---------- */
  var burger = doc.querySelector(".nav__burger");
  var drawer = doc.querySelector(".drawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var on = drawer.classList.toggle("is-open");
      burger.classList.toggle("is-on", on);
      doc.body.style.overflow = on ? "hidden" : "";
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        drawer.classList.remove("is-open");
        burger.classList.remove("is-on");
        doc.body.style.overflow = "";
      }
    });
  }

  /* ---------- 3. 滚动揭示 ---------- */
  var items = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en, i) {
          if (en.isIntersecting) {
            var el = en.target;
            var d = parseInt(el.dataset.delay || "0", 10);
            setTimeout(function () {
              el.classList.add("is-in");
            }, d);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- 5. 数字滚动 ---------- */
  var nums = doc.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && nums.length) {
    var io2 = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          io2.unobserve(el);
          var target = parseFloat(el.dataset.count);
          var dec = parseInt(el.dataset.dec || "0", 10);
          var dur = 1200;
          var t0 = null;
          function frame(t) {
            if (!t0) t0 = t;
            var p = Math.min((t - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var v = target * eased;
            el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString("zh-CN");
            if (p < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.4 }
    );
    nums.forEach(function (el) {
      io2.observe(el);
    });
  }

  /* ---------- 6. 页脚年份 ---------- */
  var y = doc.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- 7. 单页滚动高亮当前章节 ---------- */
  var SECTIONS = ["home", "guide", "terroir", "varieties", "process", "brands", "culture", "about"];
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll("[data-nav]"));
  var totop = doc.getElementById("toTop");

  function currentSection() {
    var y = (window.scrollY || doc.documentElement.scrollTop) + 150;
    var cur = SECTIONS[0];
    SECTIONS.forEach(function (id) {
      var el = doc.getElementById(id);
      if (el && el.offsetTop <= y) cur = id;
    });
    return cur;
  }

  var ticking = false;
  function onScrollUI() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var cur = currentSection();
      navLinks.forEach(function (a) {
        var ids = (a.dataset.nav || "").split(",");
        a.classList.toggle("is-active", ids.indexOf(cur) > -1);
      });
      if (totop) totop.classList.toggle("is-on", (window.scrollY || 0) > 700);
      ticking = false;
    });
  }

  if (navLinks.length) {
    onScrollUI();
    window.addEventListener("scroll", onScrollUI, { passive: true });
    window.addEventListener("resize", onScrollUI);
  }

  if (totop) {
    totop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 8. 手绘地图：点击点位联动卡片 ---------- */
  var markers = doc.querySelectorAll("[data-region]");
  if (markers.length) {
    markers.forEach(function (m) {
      m.addEventListener("click", function () {
        var key = m.dataset.region;
        markers.forEach(function (x) {
          x.classList.toggle("is-active", x === m);
        });
        doc.querySelectorAll("[data-rcard]").forEach(function (c) {
          c.classList.toggle("is-hot", c.dataset.rcard === key);
        });
        var card = doc.querySelector('[data-rcard="' + key + '"]');
        if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  /* ---------- 9. 邮箱一键复制（不跳转） ---------- */
  function legacyCopy(text) {
    var ta = doc.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    doc.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try {
      ok = doc.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    doc.body.removeChild(ta);
    return ok;
  }

  function copyMail(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return legacyCopy(text);
        }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  var copyTimers = {};
  doc.querySelectorAll("[data-copy-mail]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var box = btn.closest ? btn.closest(".mailbox") : null;
      if (!box) return;
      var mail = box.dataset.mail || btn.textContent.trim();
      copyMail(mail).then(function () {
        box.classList.add("is-copied");
        if (copyTimers[mail]) clearTimeout(copyTimers[mail]);
        copyTimers[mail] = setTimeout(function () {
          box.classList.remove("is-copied");
        }, 2200);
      });
    });
  });
})();
