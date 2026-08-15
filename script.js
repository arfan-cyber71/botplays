(() => {
  "use strict";

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const nav = document.querySelector("#nav");
  const menuBtn = document.querySelector(".menu-btn");

  const trailerBtn = document.querySelector("#trailerBtn");
  const modal = document.querySelector("#trailerModal");

  const hero = document.querySelector(".hero");
  const grid = document.querySelector(".hero-grid");
  const heroArt = document.querySelector(".hero-art");


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  menuBtn?.addEventListener("click", () => {
    if (!nav) return;

    const open = nav.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      String(open)
    );
  });


  /* =========================================================
     NAVIGATION
  ========================================================= */

  document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

      nav?.classList.remove("open");

      menuBtn?.setAttribute(
        "aria-expanded",
        "false"
      );

      document
        .querySelectorAll(".nav a")
        .forEach(a => {
          a.classList.remove("active");
        });

      link.classList.add("active");

    });

  });


  /* =========================================================
     TRAILER MODAL
  ========================================================= */

  trailerBtn?.addEventListener("click", () => {

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  });


  modal?.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", closeModal);
  });


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

  }


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeModal();
    }

  });


  /* =========================================================
     HERO GRID PARALLAX
  ========================================================= */

  hero?.addEventListener("pointermove", event => {

    const x =
      (event.clientX / window.innerWidth - 0.5) * 8;

    const y =
      (event.clientY / window.innerHeight - 0.5) * 5;

    if (grid) {

      grid.style.transform =
        `translate(${x}px, ${y}px)`;

    }

  });


  /* =========================================================
     HERO IMAGE INTRO
  ========================================================= */

  window.addEventListener("load", () => {

    if (!heroArt) return;

    setTimeout(() => {

      heroArt.classList.add("hero-art-visible");

    }, 2000);

  });


  /* =========================================================
     GAME SELECTOR
     DELTA FORCE / COD MOBILE
  ========================================================= */

  const gameTabs = document.querySelectorAll(".game-tab");
  const gamePanels = document.querySelectorAll(".game-panel");


  gameTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const gameName = tab.dataset.game;

      if (!gameName) return;


      /* Remove active from all game buttons */

      gameTabs.forEach(button => {
        button.classList.remove("active");
      });


      /* Remove active from all game panels */

      gamePanels.forEach(panel => {
        panel.classList.remove("active");
      });


      /* Activate clicked button */

      tab.classList.add("active");


      /* Activate matching game panel */

      const selectedPanel =
        document.getElementById(gameName);

      if (selectedPanel) {

        selectedPanel.classList.add("active");

      }

    });

  });


  /* =========================================================
     MODE SELECTOR
     WARFARE / OPERATIONS
     MULTIPLAYER / BR / DMZ / ZOMBIES
  ========================================================= */

  const modeTabs = document.querySelectorAll(".mode-tab");


  modeTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const modeName = tab.dataset.mode;

      if (!modeName) return;


      /*
        IMPORTANT:

        Only change buttons inside the SAME game panel.

        This prevents clicking Delta Force's tabs
        from affecting COD Mobile's tabs.
      */

      const currentGamePanel =
        tab.closest(".game-panel");

      if (!currentGamePanel) return;


      /* Remove active from mode buttons
         belonging to this game */

      currentGamePanel
        .querySelectorAll(".mode-tab")
        .forEach(button => {

          button.classList.remove("active");

        });


      /* Remove active from mode panels
         belonging to this game */

      currentGamePanel
        .querySelectorAll(".mode-panel")
        .forEach(panel => {

          panel.classList.remove("active");

        });


      /* Activate clicked mode */

      tab.classList.add("active");


      /* Activate matching mode panel */

      const selectedMode =
        document.getElementById(modeName);

      if (selectedMode) {

        selectedMode.classList.add("active");

      }

    });

  });


  /* =========================================================
     STATS ARROW
     ========================================================= */

  document.querySelector(".stat-arrow")?.addEventListener(
    "click",
    event => {

      event.preventDefault();

      const statsSection =
        document.querySelector("#stats");

      if (!statsSection) return;

      statsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );


  /* =========================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener("click", event => {

    if (!nav || !menuBtn) return;

    const clickedInsideNav =
      nav.contains(event.target);

    const clickedMenu =
      menuBtn.contains(event.target);

    if (
      nav.classList.contains("open") &&
      !clickedInsideNav &&
      !clickedMenu
    ) {

      nav.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });


  /* =========================================================
     RESET MODE WHEN SWITCHING GAMES
  ========================================================= */

  gameTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const gameName = tab.dataset.game;

      const gamePanel =
        document.getElementById(gameName);

      if (!gamePanel) return;


      /*
        Every time you switch games,
        automatically show the first mode.
      */

      const modes =
        gamePanel.querySelectorAll(".mode-tab");

      const panels =
        gamePanel.querySelectorAll(".mode-panel");


      modes.forEach(mode => {
        mode.classList.remove("active");
      });

      panels.forEach(panel => {
        panel.classList.remove("active");
      });


      if (modes[0]) {
        modes[0].classList.add("active");
      }

      if (panels[0]) {
        panels[0].classList.add("active");
      }

    });

  });

  /* =========================================================
   THEME MUSIC
========================================================= */

const themeMusicToggle =
  document.querySelector("#themeMusicToggle");

const themeMusic =
  document.querySelector("#themeMusic");

const musicStatus =
  document.querySelector("#musicStatus");


themeMusicToggle?.addEventListener("click", async () => {

  if (!themeMusic) return;


  if (themeMusic.paused) {

    try {

      await themeMusic.play();

      themeMusicToggle.classList.add("active");

      musicStatus.textContent = "PLAYING";

    } catch (error) {

      console.warn("Theme music could not start:", error);

    }

  } else {

    themeMusic.pause();

    themeMusicToggle.classList.remove("active");

    musicStatus.textContent = "OFFLINE";

  }

});


/* Reset button when music ends */

themeMusic?.addEventListener("ended", () => {

  themeMusicToggle?.classList.remove("active");

  if (musicStatus) {
    musicStatus.textContent = "OFFLINE";
  }

});

/* =========================================================
   NAVIGATION // LIVE SCROLL TRACKING
========================================================= */

const navLinks = document.querySelectorAll(".nav a");

const navSections = Array.from(navLinks)
  .map(link => {

    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return null;

    const section = document.querySelector(href);

    if (!section) return null;

    return {
      link: link,
      section: section
    };

  })
  .filter(Boolean);


function updateActiveNav() {

  /*
    Point used to determine which section is currently visible.
    35% down the screen gives a natural transition.
  */

  const scrollPoint =
    window.scrollY + (window.innerHeight * 0.35);

  let activeItem = null;


  navSections.forEach(item => {

    const sectionTop =
      item.section.offsetTop;

    const sectionBottom =
      sectionTop + item.section.offsetHeight;


    if (
      scrollPoint >= sectionTop &&
      scrollPoint < sectionBottom
    ) {

      activeItem = item;

    }

  });


  if (!activeItem) return;


  navLinks.forEach(link => {
    link.classList.remove("active");
  });


  activeItem.link.classList.add("active");

}


/* Live tracking while scrolling */

window.addEventListener(
  "scroll",
  updateActiveNav,
  { passive: true }
);


/* Also update after resize */

window.addEventListener(
  "resize",
  updateActiveNav
);


/* Initial state */

document.addEventListener(
  "DOMContentLoaded",
  updateActiveNav
);

/* =========================================================
   CYBER OF X // CURSOR TRAIL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.createElement("div");

  cursor.className = "cursor-trail";

  document.body.appendChild(cursor);


  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  let lastTrail = 0;


  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;


    /* Create trail */

    const now = performance.now();

    if (now - lastTrail > 35) {

      const dot = document.createElement("div");

      dot.className = "cursor-trail-dot";

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";

      document.body.appendChild(dot);

      setTimeout(() => {
        dot.remove();
      }, 600);

      lastTrail = now;
    }

  });


  /* Smooth cursor movement */

  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  /* Click pulse */

  document.addEventListener("mousedown", () => {

    cursor.style.transform =
      "translate(-50%, -50%) scale(1.8)";

  });

  document.addEventListener("mouseup", () => {

    cursor.style.transform =
      "translate(-50%, -50%) scale(1)";

  });

});

})();