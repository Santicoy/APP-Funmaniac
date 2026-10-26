/* =========================================================================
   FUNMANIAC — IDIOMAS
   =========================================================================
   Un solo diccionario para toda la página principal. Para agregar un idioma:
     1. Sumá su código a LANGS con el nombre escrito en ese idioma.
     2. Copiá el bloque "es" de STRINGS y traducilo.
     3. Agregá el mismo código dentro de "i18n" en cada juego de games.js.

   El marcado estático se traduce con data-i18n (texto), data-i18n-attr
   (atributos: "placeholder:ui.searchPlaceholder, aria-label:ui.searchLabel")
   y data-i18n-html (texto con <b>).
   ========================================================================= */

window.FUNMANIAC_I18N = (function () {
  "use strict";

  /** Idiomas disponibles, en su propio idioma. */
  const LANGS = [
    { code: "es", label: "Español",  short: "ES", htmlLang: "es" },
    { code: "en", label: "English",  short: "EN", htmlLang: "en" },
    { code: "zh", label: "简体中文", short: "中文", htmlLang: "zh-Hans" }
  ];

  const STRINGS = {
    es: {
      "meta.title": "Funmaniac — minijuegos cortos para el navegador",
      "meta.description": "Funmaniac: una colección chica de minijuegos y experimentos interactivos que abren en un segundo, sin cuentas ni anuncios.",
      "app.lede": "Seis minijuegos cortos para los huecos del día. Abrís uno, jugás un rato y listo: <b>sin cuentas ni puntajes</b> que mantener.",

      "ui.language": "Idioma",
      "ui.languageHint": "Elegí un idioma",
      "ui.theme": "Tema",
      "ui.themeDark": "Oscuro",
      "ui.themeLight": "Claro",
      "ui.themeHint": "Cambiar entre modo oscuro y claro",
      "ui.settings": "Configuraciones",

      "ui.searchLabel": "Buscar entre los minijuegos",
      "ui.searchPlaceholder": "Nombre o categoría",
      "ui.surprise": "Sorpréndeme",
      "ui.noAvailable": "No hay juegos jugables en estos resultados.",

      "ui.play": "Jugar",
      "ui.details": "Ver detalles",
      "ui.hideDetails": "Ocultar detalles",
      "ui.detailsOf": "Ver detalles de {title}",
      "ui.howTo": "Cómo se juega",
      "ui.soon": "Próximamente",
      "ui.reservedDesc": "Espacio reservado para un próximo minijuego.",
      "ui.reservedHow": "Cuando el juego esté listo, acá van sus instrucciones.",
      "ui.coverAlt": "Portada de {title}",

      "void.title": "Nada por acá",
      "void.text": "Ningún minijuego coincide con esa búsqueda. Probá con otra palabra.",
      "void.clear": "Borrar búsqueda",

      "settings.note": "Opciones de ejemplo. Todavía no se pueden cambiar.",
      "settings.unavailable": "No disponible todavía",
      "settings.account": "Cuenta",
      "settings.account.profile": "Perfil",
      "settings.account.data": "Datos guardados",
      "settings.audio": "Audio",
      "settings.audio.volume": "Volumen general",
      "settings.audio.effects": "Efectos",
      "settings.video": "Vídeo",
      "settings.video.quality": "Calidad",
      "settings.video.fullscreen": "Pantalla completa",
      "settings.controls": "Controles",
      "settings.controls.keyboard": "Teclado",
      "settings.controls.touch": "Pantalla táctil",

      "footer.note": "Todo corre en tu navegador.",
      "noscript": "Esta página arma el catálogo con JavaScript. Activalo para ver los minijuegos.",

      /* Contadores y avisos */
      tally: function (visible, total) {
        if (visible === total) {
          return "<b>" + total + "</b> " + (total === 1 ? "minijuego" : "minijuegos");
        }
        return "<b>" + visible + "</b> de " + total + " minijuegos";
      },
      picked: function (title) { return "Elegido: " + title; }
    },

    en: {
      "meta.title": "Funmaniac — short minigames for your browser",
      "meta.description": "Funmaniac: a small collection of minigames and interactive experiments that open in a second, with no accounts and no ads.",
      "app.lede": "Six short minigames for the gaps in your day. Open one, play for a bit, done — <b>no accounts, no scores</b> to keep up with.",

      "ui.language": "Language",
      "ui.languageHint": "Pick a language",
      "ui.theme": "Theme",
      "ui.themeDark": "Dark",
      "ui.themeLight": "Light",
      "ui.themeHint": "Switch between dark and light mode",
      "ui.settings": "Settings",

      "ui.searchLabel": "Search the minigames",
      "ui.searchPlaceholder": "Name or category",
      "ui.surprise": "Surprise me",
      "ui.noAvailable": "No playable games in these results.",

      "ui.play": "Play",
      "ui.details": "View details",
      "ui.hideDetails": "Hide details",
      "ui.detailsOf": "View details for {title}",
      "ui.howTo": "How to play",
      "ui.soon": "Coming soon",
      "ui.reservedDesc": "A slot held for an upcoming minigame.",
      "ui.reservedHow": "Once the game is ready, its instructions go here.",
      "ui.coverAlt": "Cover art for {title}",

      "void.title": "Nothing here",
      "void.text": "No minigame matches that search. Try another word.",
      "void.clear": "Clear search",

      "settings.note": "Sample options. They can't be changed yet.",
      "settings.unavailable": "Not available yet",
      "settings.account": "Account",
      "settings.account.profile": "Profile",
      "settings.account.data": "Saved data",
      "settings.audio": "Audio",
      "settings.audio.volume": "Master volume",
      "settings.audio.effects": "Effects",
      "settings.video": "Video",
      "settings.video.quality": "Quality",
      "settings.video.fullscreen": "Fullscreen",
      "settings.controls": "Controls",
      "settings.controls.keyboard": "Keyboard",
      "settings.controls.touch": "Touchscreen",

      "footer.note": "Everything runs in your browser.",
      "noscript": "This page builds its catalogue with JavaScript. Turn it on to see the minigames.",

      tally: function (visible, total) {
        if (visible === total) {
          return "<b>" + total + "</b> " + (total === 1 ? "minigame" : "minigames");
        }
        return "<b>" + visible + "</b> of " + total + " minigames";
      },
      picked: function (title) { return "Picked: " + title; }
    },

    zh: {
      "meta.title": "Funmaniac — 浏览器里的短小游戏",
      "meta.description": "Funmaniac：一组轻量的小游戏和互动实验，秒开即玩，无需账号，没有广告。",
      "app.lede": "六个短小游戏，填满一天里的空档。点开玩一会儿就行，<b>不用账号，也没有排名</b>要操心。",

      "ui.language": "语言",
      "ui.languageHint": "选择语言",
      "ui.theme": "主题",
      "ui.themeDark": "深色",
      "ui.themeLight": "浅色",
      "ui.themeHint": "在深色和浅色模式之间切换",
      "ui.settings": "设置",

      "ui.searchLabel": "搜索小游戏",
      "ui.searchPlaceholder": "名称或分类",
      "ui.surprise": "随便来一个",
      "ui.noAvailable": "这些结果里没有可玩的游戏。",

      "ui.play": "开始玩",
      "ui.details": "查看详情",
      "ui.hideDetails": "收起详情",
      "ui.detailsOf": "查看 {title} 的详情",
      "ui.howTo": "玩法",
      "ui.soon": "即将推出",
      "ui.reservedDesc": "这个位置留给下一个小游戏。",
      "ui.reservedHow": "游戏做好之后，玩法说明会放在这里。",
      "ui.coverAlt": "{title} 的封面",

      "void.title": "这里什么都没有",
      "void.text": "没有符合搜索的小游戏，换个词试试。",
      "void.clear": "清除搜索",

      "settings.note": "示例选项，暂时还不能修改。",
      "settings.unavailable": "暂不可用",
      "settings.account": "账号",
      "settings.account.profile": "个人资料",
      "settings.account.data": "已保存的数据",
      "settings.audio": "音频",
      "settings.audio.volume": "总音量",
      "settings.audio.effects": "音效",
      "settings.video": "画面",
      "settings.video.quality": "画质",
      "settings.video.fullscreen": "全屏",
      "settings.controls": "操作",
      "settings.controls.keyboard": "键盘",
      "settings.controls.touch": "触摸屏",

      "footer.note": "一切都在你的浏览器里运行。",
      "noscript": "本页用 JavaScript 生成游戏列表，请开启后查看。",

      tally: function (visible, total) {
        if (visible === total) { return "<b>" + total + "</b> 个小游戏"; }
        return total + " 个中的 <b>" + visible + "</b> 个小游戏";
      },
      picked: function (title) { return "已选中：" + title; }
    }
  };

  const DEFAULT_LANG = "es";
  let current = DEFAULT_LANG;

  function has(code) {
    return Object.prototype.hasOwnProperty.call(STRINGS, code);
  }

  /** Texto de una clave, con reemplazo opcional de {marcadores}. */
  function t(key, vars) {
    const dict = STRINGS[current] || STRINGS[DEFAULT_LANG];
    let value = dict[key];
    if (value === undefined) { value = STRINGS[DEFAULT_LANG][key]; }
    if (value === undefined) { return key; }
    if (!vars) { return value; }
    return String(value).replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? vars[name] : match;
    });
  }

  function tally(visible, total) {
    return (STRINGS[current] || STRINGS[DEFAULT_LANG]).tally(visible, total);
  }

  function picked(title) {
    return (STRINGS[current] || STRINGS[DEFAULT_LANG]).picked(title);
  }

  /** Copia localizada de un juego, con respaldo al español. */
  function game(entry) {
    const pack = (entry.i18n && (entry.i18n[current] || entry.i18n[DEFAULT_LANG])) || {};
    return {
      title: pack.title || entry.id,
      category: pack.category || "",
      desc: pack.desc || t("ui.reservedDesc"),
      how: pack.how || t("ui.reservedHow")
    };
  }

  /** Aplica el idioma a todo el marcado estático marcado con data-i18n*. */
  function apply(root) {
    const scope = root || document;
    const meta = LANGS.find(function (l) { return l.code === current; }) || LANGS[0];

    document.documentElement.lang = meta.htmlLang;
    document.title = t("meta.title");

    const description = document.querySelector('meta[name="description"]');
    if (description) { description.setAttribute("content", t("meta.description")); }

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(",").forEach(function (pair) {
        const parts = pair.split(":");
        if (parts.length !== 2) { return; }
        el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  return {
    langs: LANGS,
    defaultLang: DEFAULT_LANG,
    has: has,
    get lang() { return current; },
    set: function (code) { if (has(code)) { current = code; } return current; },
    t: t,
    tally: tally,
    picked: picked,
    game: game,
    apply: apply
  };
})();
