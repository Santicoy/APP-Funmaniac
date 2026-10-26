/* =========================================================================
   FUNMANIAC — CATÁLOGO DE MINIJUEGOS
   =========================================================================
   Esta es la única lista que hay que editar para publicar un minijuego.

   Para activar uno de los espacios reservados:
     1. Creá la carpeta/archivo del juego (por ejemplo juego4/index.html).
     2. Poné esa ruta en "url".
     3. Cambiá "available" a true.
     4. Reemplazá "cover" por la portada real (640x360 o cualquier 16:9).
     5. Escribí el título, la categoría, la descripción y el "cómo se juega"
        en los tres idiomas dentro de "i18n".

   Campos:
     id         identificador estable (no se traduce)
     cover      URL o ruta de la portada 16:9
     url        destino del botón Jugar (null = sin enlace)
     available  false = espacio reservado, no se muestra el botón Jugar
     duration   duración aproximada, opcional (null para no mostrar nada)
     glyph      emoji de respaldo si la portada no carga
     search     alias de búsqueda en los tres idiomas
     i18n       título / categoría / descripción / instrucciones por idioma
   ========================================================================= */

window.FUNMANIAC_GAMES = [
  {
    id: "juego1",
    cover: "https://picsum.photos/seed/funmaniac-reflejos/640/360",
    url: "juego1.html",
    available: true,
    duration: "60 s",
    glyph: "🕹️",
    search: "reflejos velocidad arcade rapido reflex speed quick 反应 速度 街机",
    i18n: {
      es: {
        title: "Minijuego 1",
        category: "Reflejos",
        desc: "Un desafío rápido de reflejos: la pantalla se mueve y hay que llegar antes.",
        how: "Tocá el objetivo antes de que cambie de lugar. Cada acierto lo hace moverse más rápido; con tres fallos termina la ronda."
      },
      en: {
        title: "Minigame 1",
        category: "Reflexes",
        desc: "A quick reflex run: the screen keeps moving and you have to get there first.",
        how: "Tap the target before it jumps somewhere else. Every hit speeds it up; three misses end the round."
      },
      zh: {
        title: "小游戏 1",
        category: "反应",
        desc: "考验反应的快节奏挑战：画面不停移动，你要先一步抵达。",
        how: "在目标移动之前点中它。每次命中都会加快速度，失误三次本轮结束。"
      }
    }
  },

  {
    id: "juego2",
    cover: "https://picsum.photos/seed/funmaniac-puzzle/640/360",
    url: "juego2.html",
    available: true,
    duration: "5 min",
    glyph: "🧠",
    search: "puzzle rompecabezas logica ingenio mente logic brain 解谜 逻辑 益智",
    i18n: {
      es: {
        title: "Minijuego 2",
        category: "Rompecabezas",
        desc: "Piezas que encajan de una sola manera. Fácil de entender, difícil de soltar.",
        how: "Arrastrá las piezas hasta cerrar la figura. No hay reloj: el tablero se resuelve cuando se resuelve."
      },
      en: {
        title: "Minigame 2",
        category: "Puzzle",
        desc: "Pieces that fit together exactly one way. Easy to grasp, hard to put down.",
        how: "Drag the pieces until the shape closes. There is no clock — the board is done when it's done."
      },
      zh: {
        title: "小游戏 2",
        category: "解谜",
        desc: "只有一种拼法的碎片。一看就懂，很难放下。",
        how: "拖动碎片直到图形闭合。没有计时，拼好了就算完成。"
      }
    }
  },

  {
    id: "juego3",
    cover: "https://picsum.photos/seed/funmaniac-visual/640/360",
    url: "juego3.html",
    available: true,
    duration: null,
    glyph: "🪄",
    search: "visual experimento arte interactivo experiment art interactive 实验 视觉 互动",
    i18n: {
      es: {
        title: "Minijuego 3",
        category: "Experimento",
        desc: "Un juguete visual interactivo. No se gana ni se pierde: se mueve y responde.",
        how: "Movés el puntero o el dedo y la imagen reacciona. Se puede dejar abierto de fondo."
      },
      en: {
        title: "Minigame 3",
        category: "Experiment",
        desc: "An interactive visual toy. Nothing to win or lose — it just moves and answers back.",
        how: "Move the pointer or your finger and the image reacts. Fine to leave open in the background."
      },
      zh: {
        title: "小游戏 3",
        category: "实验",
        desc: "一个互动视觉玩具。没有胜负，只会随你移动而变化。",
        how: "移动鼠标或手指，画面就会回应。也可以一直开着当背景。"
      }
    }
  },

  /* --- Espacios reservados: sin enlace hasta que el juego exista --- */
  {
    id: "juego4",
    cover: "https://picsum.photos/seed/funmaniac-slot-4/640/360",
    url: null,
    available: false,
    duration: null,
    glyph: "🎛️",
    search: "proximo reservado nuevo next slot reserved 预留 即将",
    i18n: {
      es: { title: "Minijuego 4", category: "Sin definir" },
      en: { title: "Minigame 4", category: "Undecided" },
      zh: { title: "小游戏 4", category: "待定" }
    }
  },

  {
    id: "juego5",
    cover: "https://picsum.photos/seed/funmaniac-slot-5/640/360",
    url: null,
    available: false,
    duration: null,
    glyph: "🎚️",
    search: "proximo reservado nuevo next slot reserved 预留 即将",
    i18n: {
      es: { title: "Minijuego 5", category: "Sin definir" },
      en: { title: "Minigame 5", category: "Undecided" },
      zh: { title: "小游戏 5", category: "待定" }
    }
  },

  {
    id: "juego6",
    cover: "https://picsum.photos/seed/funmaniac-slot-6/640/360",
    url: null,
    available: false,
    duration: null,
    glyph: "🎰",
    search: "proximo reservado nuevo next slot reserved 预留 即将",
    i18n: {
      es: { title: "Minijuego 6", category: "Sin definir" },
      en: { title: "Minigame 6", category: "Undecided" },
      zh: { title: "小游戏 6", category: "待定" }
    }
  }
];
