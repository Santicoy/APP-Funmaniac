/* =========================================================================
   FUNMANIAC — LÓGICA DE LA PÁGINA PRINCIPAL
   =========================================================================
   Arma el catálogo desde games.js, filtra, elige al azar, abre los paneles
   de idioma y configuraciones, y alterna el tema.
   Queda expuesto en window.Funmaniac para extenderlo desde la consola.
   ========================================================================= */

window.Funmaniac = (function () {
  "use strict";

  const I18N = window.FUNMANIAC_I18N;
  const DATA = window.FUNMANIAC_GAMES || [];

  const STORE_THEME = "funmaniac:theme";
  const STORE_LANG = "funmaniac:lang";
  const THEMES = ["dark", "light"];

  /* Iconos (trazos de Tabler Icons, embebidos para no depender de la red). */
  const ICONS = {
    chevron: '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    check: '<svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>'
  };

  const dom = {};
  /** Una entrada por tarjeta: datos, nodo y referencias de texto. */
  let cards = [];
  /** Guarda el idioma activo para no recalcular en cada filtrado. */
  let visibleCount = 0;

  /* -----------------------------------------------------------------------
     Utilidades
     ----------------------------------------------------------------------- */

  /** Quita acentos y mayúsculas para que "logica" encuentre "lógica". */
  function normalize(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (error) { return null; }
  }

  function writeStore(key, value) {
    try { window.localStorage.setItem(key, value); } catch (error) { /* modo privado */ }
  }

  /* -----------------------------------------------------------------------
     Tema
     ----------------------------------------------------------------------- */
  function applyTheme(name) {
    const theme = THEMES.indexOf(name) === -1 ? "dark" : name;
    document.documentElement.setAttribute("data-theme", theme);

    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-page").trim();
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta && color) { themeMeta.setAttribute("content", color); }

    if (dom.themeToggle) {
      const isLight = theme === "light";
      dom.themeToggle.setAttribute("aria-pressed", String(isLight));
      if (dom.themeState) {
        dom.themeState.textContent = I18N.t(isLight ? "ui.themeLight" : "ui.themeDark");
      }
      if (dom.themeIconDark) { dom.themeIconDark.hidden = isLight; }
      if (dom.themeIconLight) { dom.themeIconLight.hidden = !isLight; }
    }
    return theme;
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function toggleTheme() {
    const next = currentTheme() === "light" ? "dark" : "light";
    writeStore(STORE_THEME, next);
    return applyTheme(next);
  }

  /* -----------------------------------------------------------------------
     Tarjetas
     ----------------------------------------------------------------------- */
  function cardMarkup(entry) {
    const detailId = "detalle-" + entry.id;
    const playable = Boolean(entry.available && entry.url);

    return '' +
      '<div class="cab__cover" data-cover>' +
        '<img data-thumb src="' + escapeHTML(entry.cover || "") + '" alt="" ' +
             'width="640" height="360" loading="lazy" decoding="async" />' +
        '<span class="cab__fallback" aria-hidden="true">' + escapeHTML(entry.glyph || "🎮") + '</span>' +
        (playable ? '' :
          '<span class="cab__chip"><span class="chip chip--accent" data-soon></span></span>') +
      '</div>' +

      '<h2 class="t-title cab__title" data-title></h2>' +

      '<p class="t-meta cab__meta">' +
        '<span class="cab__dot" aria-hidden="true"></span>' +
        '<span data-category></span>' +
        (entry.duration
          ? '<span class="cab__sep" aria-hidden="true">·</span><span>' +
            escapeHTML(entry.duration) + '</span>'
          : '') +
      '</p>' +

      '<div class="cab__actions">' +
        (playable
          ? '<a class="cab__play" href="' + escapeHTML(entry.url) + '" data-play></a>'
          : '') +
        '<button class="cab__more" type="button" data-more ' +
                'aria-expanded="false" aria-controls="' + detailId + '">' +
          '<span data-more-label></span>' + ICONS.chevron +
        '</button>' +
      '</div>' +

      '<div class="cab__drawer"><div class="cab__drawerIn">' +
        '<div class="cab__detail" id="' + detailId + '">' +
          '<p class="t-body" data-desc></p>' +
          '<p class="cab__howTitle" data-how-title></p>' +
          '<p class="t-body" data-how></p>' +
        '</div>' +
      '</div></div>';
  }

  function buildCard(entry) {
    const el = document.createElement("article");
    el.className = "cab";
    el.dataset.game = entry.id;
    el.innerHTML = cardMarkup(entry);

    const card = {
      entry: entry,
      el: el,
      playable: Boolean(entry.available && entry.url),
      haystack: "",
      refs: {
        cover: el.querySelector("[data-cover]"),
        thumb: el.querySelector("[data-thumb]"),
        title: el.querySelector("[data-title]"),
        category: el.querySelector("[data-category]"),
        desc: el.querySelector("[data-desc]"),
        howTitle: el.querySelector("[data-how-title]"),
        how: el.querySelector("[data-how]"),
        play: el.querySelector("[data-play]"),
        more: el.querySelector("[data-more]"),
        moreLabel: el.querySelector("[data-more-label]"),
        soon: el.querySelector("[data-soon]")
      }
    };

    /* Si la portada no carga, queda el glifo de respaldo. */
    card.refs.thumb.addEventListener("error", function () {
      card.refs.cover.classList.add("is-fallback");
    });
    if (!entry.cover) { card.refs.cover.classList.add("is-fallback"); }

    card.refs.more.addEventListener("click", function () {
      toggleCard(card);
    });

    return card;
  }

  /** Abre o cierra una ficha. El foco se queda en el botón que la abrió. */
  function toggleCard(card, force) {
    const open = typeof force === "boolean" ? force : !card.el.classList.contains("is-open");
    card.el.classList.toggle("is-open", open);
    card.refs.more.setAttribute("aria-expanded", String(open));
    localizeCard(card);
  }

  /* -----------------------------------------------------------------------
     Idioma
     ----------------------------------------------------------------------- */
  function localizeCard(card) {
    const copy = I18N.game(card.entry);
    const open = card.el.classList.contains("is-open");
    const refs = card.refs;

    refs.title.textContent = copy.title;
    refs.category.textContent = copy.category;
    refs.desc.textContent = copy.desc;
    refs.howTitle.textContent = I18N.t("ui.howTo");
    refs.how.textContent = copy.how;
    refs.thumb.alt = I18N.t("ui.coverAlt", { title: copy.title });

    refs.moreLabel.textContent = I18N.t(open ? "ui.hideDetails" : "ui.details");
    refs.more.setAttribute("aria-label", I18N.t("ui.detailsOf", { title: copy.title }));

    if (refs.play) {
      refs.play.textContent = I18N.t("ui.play");
      refs.play.setAttribute("aria-label", I18N.t("ui.play") + " — " + copy.title);
    }
    if (refs.soon) { refs.soon.textContent = I18N.t("ui.soon"); }

    card.haystack = normalize([
      copy.title, copy.category, copy.desc, copy.how, card.entry.search || ""
    ].join(" "));
  }

  function renderLanguageMenu() {
    if (!dom.langPanel) { return; }
    dom.langPanel.innerHTML = I18N.langs.map(function (lang) {
      return '<button class="menu__item" type="button" role="menuitemradio" ' +
             'data-lang="' + lang.code + '" aria-checked="false">' +
             '<span>' + escapeHTML(lang.label) + '</span>' + ICONS.check +
             '</button>';
    }).join("");

    dom.langPanel.querySelectorAll("[data-lang]").forEach(function (item) {
      item.addEventListener("click", function () {
        setLanguage(item.dataset.lang);
        closeMenus();
        dom.langTrigger.focus();
      });
    });
  }

  function markLanguage() {
    const code = I18N.lang;
    const meta = I18N.langs.find(function (l) { return l.code === code; });
    if (dom.langValue && meta) { dom.langValue.textContent = meta.short; }
    if (dom.langPanel) {
      dom.langPanel.querySelectorAll("[data-lang]").forEach(function (item) {
        item.setAttribute("aria-checked", String(item.dataset.lang === code));
      });
    }
  }

  /** Cambia el idioma de toda la página sin perder búsqueda ni fichas abiertas. */
  function setLanguage(code) {
    if (!I18N.has(code)) { return I18N.lang; }
    I18N.set(code);
    writeStore(STORE_LANG, code);

    I18N.apply(document);
    markLanguage();
    cards.forEach(localizeCard);
    applyTheme(currentTheme());          /* el estado del tema también se traduce */
    filter(dom.search ? dom.search.value : "");
    return code;
  }

  /* -----------------------------------------------------------------------
     Búsqueda y azar
     ----------------------------------------------------------------------- */
  function filter(query) {
    const needle = normalize(query || "");
    let visible = 0;
    let playable = 0;

    cards.forEach(function (card) {
      const match = !needle || card.haystack.indexOf(needle) !== -1;
      card.el.hidden = !match;
      if (match) {
        visible += 1;
        if (card.playable) { playable += 1; }
      }
    });

    visibleCount = visible;
    dom.empty.dataset.visible = visible === 0 ? "true" : "false";
    dom.tally.innerHTML = I18N.tally(visible, cards.length);

    dom.chance.disabled = playable === 0;
    dom.note.textContent = (visible > 0 && playable === 0) ? I18N.t("ui.noAvailable") : "";

    return visible;
  }

  /** Elige un juego jugable entre los visibles y lo señala. */
  function surprise() {
    const pool = cards.filter(function (card) {
      return !card.el.hidden && card.playable;
    });
    if (!pool.length) { return null; }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    cards.forEach(function (card) { card.el.classList.remove("is-picked"); });

    void pick.el.offsetWidth;            /* reinicia la animación */
    pick.el.classList.add("is-picked");
    pick.el.scrollIntoView({ behavior: "smooth", block: "center" });
    if (pick.refs.play) { pick.refs.play.focus({ preventScroll: true }); }

    const title = I18N.game(pick.entry).title;
    dom.note.textContent = I18N.picked(title);
    return title;
  }

  /* -----------------------------------------------------------------------
     Menús del riel
     ----------------------------------------------------------------------- */
  function closeMenus(except) {
    dom.menus.forEach(function (menu) {
      if (menu.trigger === except) { return; }
      menu.panel.hidden = true;
      menu.trigger.setAttribute("aria-expanded", "false");
    });
  }

  function setupMenus() {
    dom.menus = Array.from(document.querySelectorAll("[data-menu]")).map(function (root) {
      const trigger = root.querySelector("[data-menu-trigger]");
      const panel = root.querySelector("[data-menu-panel]");
      const menu = { root: root, trigger: trigger, panel: panel };

      trigger.addEventListener("click", function () {
        const open = panel.hidden;
        closeMenus(open ? trigger : null);
        panel.hidden = !open;
        trigger.setAttribute("aria-expanded", String(open));
      });

      return menu;
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest("[data-menu]")) { closeMenus(); }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") { return; }
      const open = dom.menus.find(function (menu) { return !menu.panel.hidden; });
      if (!open) { return; }
      closeMenus();
      open.trigger.focus();
    });
  }

  /* -----------------------------------------------------------------------
     Arranque
     ----------------------------------------------------------------------- */
  function init() {
    dom.search = document.getElementById("buscador");
    dom.rack = document.querySelector("[data-rack]");
    dom.empty = document.querySelector("[data-void]");
    dom.tally = document.querySelector("[data-tally]");
    dom.note = document.querySelector("[data-note]");
    dom.chance = document.querySelector("[data-chance]");
    dom.clear = document.querySelector("[data-clear]");
    dom.langTrigger = document.querySelector("[data-menu='lang'] [data-menu-trigger]");
    dom.langPanel = document.querySelector("[data-lang-panel]");
    dom.langValue = document.querySelector("[data-lang-value]");
    dom.themeToggle = document.querySelector("[data-theme-toggle]");
    dom.themeState = document.querySelector("[data-theme-state]");
    dom.themeIconDark = document.querySelector("[data-theme-icon='dark']");
    dom.themeIconLight = document.querySelector("[data-theme-icon='light']");
    if (!dom.rack) { return; }

    /* Idioma guardado antes de dibujar nada. */
    const storedLang = readStore(STORE_LANG);
    if (storedLang && I18N.has(storedLang)) { I18N.set(storedLang); }

    /* Catálogo. */
    const fragment = document.createDocumentFragment();
    cards = DATA.map(function (entry) {
      const card = buildCard(entry);
      fragment.appendChild(card.el);
      return card;
    });
    dom.rack.appendChild(fragment);

    /* La primera portada no se posterga: es la que se ve al entrar. */
    if (cards[0]) { cards[0].refs.thumb.loading = "eager"; }

    renderLanguageMenu();
    setupMenus();
    I18N.apply(document);
    markLanguage();
    cards.forEach(localizeCard);
    applyTheme(currentTheme());
    filter("");

    dom.search.addEventListener("input", function (event) {
      filter(event.target.value);
    });

    dom.chance.addEventListener("click", surprise);

    dom.themeToggle.addEventListener("click", toggleTheme);

    dom.clear.addEventListener("click", function () {
      dom.search.value = "";
      filter("");
      dom.search.focus();
    });

    /* "/" enfoca el buscador, como en los sitios de juegos. */
    document.addEventListener("keydown", function (event) {
      if (event.key !== "/") { return; }
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") { return; }
      event.preventDefault();
      dom.search.focus();
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  /* API pública para seguir construyendo encima. */
  return {
    filter: filter,
    surprise: surprise,
    setLanguage: setLanguage,
    toggleTheme: toggleTheme,
    setTheme: function (name) { writeStore(STORE_THEME, name); return applyTheme(name); },
    openDetails: function (id, open) {
      const card = cards.find(function (c) { return c.entry.id === id; });
      if (card) { toggleCard(card, open !== false); }
    },
    get visible() { return visibleCount; },
    get list() {
      return cards.map(function (card) { return I18N.game(card.entry).title; });
    }
  };
})();
