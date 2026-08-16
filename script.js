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
     KEEPING ORIGINAL ANIMATION
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
     KEEPING ORIGINAL ANIMATION
  ========================================================= */

  window.addEventListener("load", () => {

    if (!heroArt) return;

    setTimeout(() => {

      heroArt.classList.add("hero-art-visible");

    }, 2000);

  });


  /* =========================================================
     GAME SELECTOR
     DELTA FORCE / COD MOBILE / ASPHALT 9
  ========================================================= */

  const gameTabs =
    document.querySelectorAll(".game-tab");

  const gamePanels =
    document.querySelectorAll(".game-panel");


  gameTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const gameName = tab.dataset.game;

      if (!gameName) return;


      /* Remove active from game buttons */

      gameTabs.forEach(button => {

        button.classList.remove("active");

      });


      /* Remove active from game panels */

      gamePanels.forEach(panel => {

        panel.classList.remove("active");

      });


      /* Activate clicked game */

      tab.classList.add("active");


      /* Activate matching game */

      const selectedPanel =
        document.getElementById(gameName);

      if (selectedPanel) {

        selectedPanel.classList.add("active");

      }


      /* Reset that game's mode */

      resetGameModes(selectedPanel);


      /* Recalculate after switching */

      requestAnimationFrame(() => {

        calculateAllStats();

      });

    });

  });


  /* =========================================================
     MODE SELECTOR
     DELTA / CODM MODES
  ========================================================= */

  const modeTabs =
    document.querySelectorAll(".mode-tab");


  modeTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const modeName =
        tab.dataset.mode;

      if (!modeName) return;


      const currentGamePanel =
        tab.closest(".game-panel");

      if (!currentGamePanel) return;


      /* Remove active mode buttons */

      currentGamePanel
        .querySelectorAll(".mode-tab")
        .forEach(button => {

          button.classList.remove("active");

        });


      /* Remove active mode panels */

      currentGamePanel
        .querySelectorAll(".mode-panel")
        .forEach(panel => {

          panel.classList.remove("active");

        });


      /* Activate clicked mode */

      tab.classList.add("active");


      /* Activate matching mode */

      const selectedMode =
        document.getElementById(modeName);

      if (selectedMode) {

        selectedMode.classList.add("active");

      }


      /* Recalculate */

      requestAnimationFrame(() => {

        calculateAllStats();

      });

    });

  });


  /* =========================================================
     RESET MODE WHEN SWITCHING GAME
  ========================================================= */

  function resetGameModes(gamePanel) {

    if (!gamePanel) return;

    const modes =
      gamePanel.querySelectorAll(
        ":scope > .mode-selector .mode-tab"
      );

    const panels =
      gamePanel.querySelectorAll(
        ":scope > .mode-panel"
      );


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

  }


  /* =========================================================
     STATS ARROW
  ========================================================= */

  document
    .querySelector(".stat-arrow")
    ?.addEventListener(
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
     THEME MUSIC
  ========================================================= */

  const themeMusicToggle =
    document.querySelector("#themeMusicToggle");

  const themeMusic =
    document.querySelector("#themeMusic");

  const musicStatus =
    document.querySelector("#musicStatus");


  themeMusicToggle?.addEventListener(
    "click",
    async () => {

      if (!themeMusic) return;


      if (themeMusic.paused) {

        try {

          await themeMusic.play();

          themeMusicToggle.classList.add(
            "active"
          );

          if (musicStatus) {

            musicStatus.textContent =
              "PLAYING";

          }

        } catch (error) {

          console.warn(
            "Theme music could not start:",
            error
          );

        }

      } else {

        themeMusic.pause();

        themeMusicToggle.classList.remove(
          "active"
        );

        if (musicStatus) {

          musicStatus.textContent =
            "OFFLINE";

        }

      }

    }
  );


  /* Reset button when music ends */

  themeMusic?.addEventListener(
    "ended",
    () => {

      themeMusicToggle?.classList.remove(
        "active"
      );

      if (musicStatus) {

        musicStatus.textContent =
          "OFFLINE";

      }

    }
  );


  /* =========================================================
     NAVIGATION // LIVE SCROLL TRACKING
  ========================================================= */

  const navLinks =
    document.querySelectorAll(".nav a");


  const navSections =
    Array.from(navLinks)

      .map(link => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          !href.startsWith("#")
        ) {
          return null;
        }

        const section =
          document.querySelector(href);

        if (!section) return null;

        return {

          link: link,

          section: section

        };

      })

      .filter(Boolean);


  function updateActiveNav() {

    const scrollPoint =
      window.scrollY +
      (window.innerHeight * 0.35);


    let activeItem = null;


    navSections.forEach(item => {

      const sectionTop =
        item.section.offsetTop;

      const sectionBottom =
        sectionTop +
        item.section.offsetHeight;


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


    activeItem.link.classList.add(
      "active"
    );

  }


  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    updateActiveNav
  );


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      updateActiveNav
    );

  } else {

    updateActiveNav();

  }


  /* =========================================================
     CYBER OF X // CURSOR TRAIL
     KEEPING ORIGINAL ANIMATION
  ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      const cursor =
        document.createElement("div");

      cursor.className =
        "cursor-trail";

      document.body.appendChild(
        cursor
      );


      let mouseX = 0;
      let mouseY = 0;

      let cursorX = 0;
      let cursorY = 0;

      let lastTrail = 0;


      document.addEventListener(
        "mousemove",
        e => {

          mouseX = e.clientX;
          mouseY = e.clientY;


          const now =
            performance.now();


          if (
            now - lastTrail > 35
          ) {

            const dot =
              document.createElement("div");

            dot.className =
              "cursor-trail-dot";

            dot.style.left =
              mouseX + "px";

            dot.style.top =
              mouseY + "px";


            document.body.appendChild(
              dot
            );


            setTimeout(() => {

              dot.remove();

            }, 600);


            lastTrail = now;

          }

        }
      );


      function animateCursor() {

        cursorX +=
          (mouseX - cursorX) * 0.25;

        cursorY +=
          (mouseY - cursorY) * 0.25;


        cursor.style.left =
          cursorX + "px";

        cursor.style.top =
          cursorY + "px";


        requestAnimationFrame(
          animateCursor
        );

      }


      animateCursor();


      document.addEventListener(
        "mousedown",
        () => {

          cursor.style.transform =
            "translate(-50%, -50%) scale(1.8)";

        }
      );


      document.addEventListener(
        "mouseup",
        () => {

          cursor.style.transform =
            "translate(-50%, -50%) scale(1)";

        }
      );

    }
  );


  /* =========================================================
     =========================================================
     AUTO PLAYER STAT CALCULATOR
     =========================================================
     =========================================================

     SOURCE DATA:

     data-kills
     data-deaths
     data-matches
     data-wins

     The displayed numbers are NOT used as source data.

     This means you can change only the data-* values
     in your HTML and everything calculates automatically.
  ========================================================= */


  function getNumber(value) {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {

      return null;

    }


    const number =
      parseFloat(
        String(value)
          .replace(/,/g, "")
          .replace(/[^0-9.-]/g, "")
      );


    return Number.isFinite(number)
      ? number
      : null;

  }


  function formatRatio(value) {

    if (!Number.isFinite(value)) {

      return "0.00";

    }

    return value.toFixed(2);

  }


  function formatPercent(value) {

    if (!Number.isFinite(value)) {

      return "0.0%";

    }

    return value.toFixed(1) + "%";

  }


  /* =========================================================
     CALCULATE ONE MODE
  ========================================================= */

  function calculateMode(modePanel) {

    if (!modePanel) return;


    const stats =
      modePanel.querySelectorAll(
        ":scope > .stat-grid > .big-stat"
      );


    if (!stats.length) return;


    /*
       IMPORTANT:

       We read the DATA ATTRIBUTES.

       NOT the displayed <strong> values.
    */


    let kills = null;
    let deaths = null;
    let matches = null;
    let wins = null;


    stats.forEach(stat => {

      const statType =
        stat.dataset.stat;


      if (
        statType === "kd"
      ) {

        kills =
          getNumber(
            stat.dataset.kills
          );

        deaths =
          getNumber(
            stat.dataset.deaths
          );

      }


      if (
        statType === "matches"
      ) {

        matches =
          getNumber(
            stat.dataset.matches
          );

      }


      if (
        statType === "wins"
      ) {

        wins =
          getNumber(
            stat.dataset.wins
          );

      }


      /*
         W/L source can also exist
         independently.
      */

      if (
        statType === "wl"
      ) {

        if (matches === null) {

          matches =
            getNumber(
              stat.dataset.matches
            );

        }

        if (wins === null) {

          wins =
            getNumber(
              stat.dataset.wins
            );

        }

      }

    });


    /* =====================================================
       K/D RATIO
    ===================================================== */

    if (
      kills !== null &&
      deaths !== null &&
      deaths > 0
    ) {

      const kdRatio =
        kills / deaths;


      stats.forEach(stat => {

        if (
          stat.dataset.stat !== "kd"
        ) {
          return;
        }


        const value =
          stat.querySelector("strong");


        if (value) {

          value.textContent =
            formatRatio(kdRatio);

        }

      });

    }


    /* =====================================================
       MATCHES / WINS
    ===================================================== */

    if (
      matches === null ||
      wins === null ||
      matches <= 0
    ) {

      return;

    }


    /*
       Prevent impossible values.
    */

    matches =
      Math.max(
        0,
        matches
      );


    wins =
      Math.max(
        0,
        Math.min(
          wins,
          matches
        )
      );


    /* =====================================================
       LOSSES
    ===================================================== */

    const losses =
      Math.max(
        0,
        matches - wins
      );


    /* =====================================================
       WIN RATE
    ===================================================== */

    const winRate =
      (wins / matches) * 100;


    /* =====================================================
       W/L RATIO
    ===================================================== */

    const winLossRatio =
      losses > 0
        ? wins / losses
        : wins;


    /* =====================================================
       UPDATE W/L RATIO
    ===================================================== */

    stats.forEach(stat => {

      if (
        stat.dataset.stat !== "wl"
      ) {
        return;
      }


      const value =
        stat.querySelector("strong");


      if (value) {

        value.textContent =
          formatRatio(
            winLossRatio
          );

      }

    });


    /* =====================================================
       UPDATE MATCHES
    ===================================================== */

    stats.forEach(stat => {

      if (
        stat.dataset.stat !== "matches"
      ) {
        return;
      }


      const value =
        stat.querySelector("strong");


      if (value) {

        value.textContent =
          String(matches);

      }

    });


    /* =====================================================
       UPDATE WINS
    ===================================================== */

    stats.forEach(stat => {

      if (
        stat.dataset.stat !== "wins"
      ) {
        return;
      }


      const value =
        stat.querySelector("strong");


      if (value) {

        value.textContent =
          String(wins);

      }


      /*
         Only replace AUTO indicator.
         Other percentage indicators remain untouched.
      */

      const indicator =
        stat.querySelector("span.positive");


      if (indicator) {

        indicator.textContent =
          formatPercent(winRate);

      }

    });


    /* =====================================================
       DONUT
    ===================================================== */

    const donut =
      modePanel.querySelector(
        ".donut-chart"
      );


    if (donut) {

      /*
         Keep your existing CSS animation.

         We only provide the percentage
         variable that your CSS can use.
      */

      donut.style.setProperty(
        "--win-rate",
        `${winRate}%`
      );


      donut.style.setProperty(
        "--percentage",
        `${winRate}%`
      );


      donut.style.setProperty(
        "--progress",
        `${winRate}%`
      );


      const donutValue =
        donut.querySelector(
          ".donut-inner strong"
        );


      if (donutValue) {

        donutValue.textContent =
          formatPercent(winRate);

      }

    }


    /* =====================================================
       WIN / LOSS COUNTERS
    ===================================================== */

    const winLoss =
      modePanel.querySelector(
        ".win-loss"
      );


    if (winLoss) {

      const blocks =
        winLoss.querySelectorAll(
          ":scope > div"
        );


      /*
         FIRST BLOCK = WINS
      */

      if (blocks[0]) {

        const number =
          blocks[0].querySelector(
            "strong"
          );


        if (number) {

          number.textContent =
            String(wins);

        }

      }


      /*
         SECOND BLOCK = LOSSES
      */

      if (blocks[1]) {

        const number =
          blocks[1].querySelector(
            "strong"
          );


        if (number) {

          number.textContent =
            String(losses);

        }

      }

    }


    /* =====================================================
       UPDATE CHART TOTAL
    ===================================================== */

    modePanel
      .querySelectorAll(
        ".chart-heading small"
      )
      .forEach(element => {

        const originalText =
          element.textContent
            .trim()
            .toUpperCase();


        /*
           Do NOT touch:

           LAST 10 MATCHES
           LAST 10 OPERATIONS
        */

        if (
          originalText.includes(
            "LAST 10"
          )
        ) {

          return;

        }


        /*
           MATCHES
        */

        if (
          originalText.includes(
            "MATCHES"
          )
        ) {

          element.textContent =
            `${matches} MATCHES`;

        }


        /*
           OPERATIONS
        */

        else if (
          originalText.includes(
            "OPERATIONS"
          )
        ) {

          element.textContent =
            `${matches} OPERATIONS`;

        }

      });


    /* =====================================================
       DEBUG
       Open browser console to see calculations.
    ===================================================== */

    console.log(
      `[AUTO STATS] ${modePanel.id}`,
      {
        kills: kills,
        deaths: deaths,
        kd: (
          kills !== null &&
          deaths !== null &&
          deaths > 0
        )
          ? (kills / deaths).toFixed(2)
          : null,

        matches: matches,

        wins: wins,

        losses: losses,

        winRate:
          winRate.toFixed(1) + "%",

        wlRatio:
          winLossRatio.toFixed(2)
      }
    );

  }


  /* =========================================================
     CALCULATE ALL STATS
  ========================================================= */

  function calculateAllStats() {

    document
      .querySelectorAll(
        ".game-panel"
      )
      .forEach(gamePanel => {


        /*
           Only calculate direct child
           mode panels.

           This prevents nested structures
           from interfering with each other.
        */

        gamePanel
          .querySelectorAll(
            ":scope > .mode-panel"
          )
          .forEach(modePanel => {

            calculateMode(
              modePanel
            );

          });

      });

  }


  /* =========================================================
     ASPHALT 9
     LEFT ALONE
  ========================================================= */

  /*
     Asphalt 9 does not contain:

     data-kills
     data-deaths
     data-matches
     data-wins

     Therefore the combat calculator
     intentionally ignores it.

     Your Asphalt 9 animation/chart remains untouched.
  */


  /* =========================================================
     INITIAL CALCULATION
  ========================================================= */

  function initializeStats() {

    calculateAllStats();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeStats,
      {
        once: true
      }
    );

  } else {

    initializeStats();

  }


  /* =========================================================
     RECALCULATE AFTER GAME SWITCH
  ========================================================= */

  document
    .querySelectorAll(".game-tab")
    .forEach(tab => {

      tab.addEventListener(
        "click",
        () => {

          requestAnimationFrame(() => {

            requestAnimationFrame(() => {

              calculateAllStats();

            });

          });

        }
      );

    });


  /* =========================================================
     RECALCULATE AFTER MODE SWITCH
  ========================================================= */

  document
    .querySelectorAll(".mode-tab")
    .forEach(tab => {

      tab.addEventListener(
        "click",
        () => {

          requestAnimationFrame(() => {

            requestAnimationFrame(() => {

              calculateAllStats();

            });

          });

        }
      );

    });


  /* =========================================================
     OPTIONAL LIVE DATA REFRESH
     If you change data-* values through JS later,
     calling window.calculatePlayerStats()
     will recalculate everything.
  ========================================================= */

  window.calculatePlayerStats =
    calculateAllStats;


    /* =========================================================
   ASPHALT 9 // AUTO CAR COLLECTION CALCULATOR
   OWNED ÷ TOTAL AVAILABLE × 100
   DOES NOT TOUCH EXISTING ANIMATIONS
========================================================= */

function calculateAsphaltCollection() {

  const asphaltPanel = document.querySelector("#asphalt9");

  if (!asphaltPanel) return;


  /* -----------------------------------------
     FIND COLLECTION DATA
  ----------------------------------------- */

  const collectionStat =
    asphaltPanel.querySelector(
      '[data-stat="collection"]'
    );

  if (!collectionStat) return;


  const owned =
    parseFloat(
      collectionStat.dataset.owned
    );

  const totalCars =
    parseFloat(
      collectionStat.dataset.totalCars
    );


  /* -----------------------------------------
     SAFETY CHECK
  ----------------------------------------- */

  if (
    !Number.isFinite(owned) ||
    !Number.isFinite(totalCars) ||
    totalCars <= 0
  ) {
    return;
  }


  /* -----------------------------------------
     CALCULATE COLLECTION %
  ----------------------------------------- */

  const safeOwned =
    Math.max(
      0,
      Math.min(owned, totalCars)
    );

  const remaining =
    totalCars - safeOwned;

  const collectionPercent =
    (safeOwned / totalCars) * 100;


  /* -----------------------------------------
     UPDATE COLLECTION %
  ----------------------------------------- */

  const collectionValue =
    collectionStat.querySelector("strong");

  if (collectionValue) {

    collectionValue.textContent =
      `${collectionPercent.toFixed(1)}%`;

  }


  /* -----------------------------------------
     UPDATE CARS OWNED
  ----------------------------------------- */

  const ownedStat =
    asphaltPanel.querySelector(
      '[data-stat="cars-owned"]'
    );

  if (ownedStat) {

    const ownedValue =
      ownedStat.querySelector("strong");

    if (ownedValue) {

      ownedValue.textContent =
        safeOwned;

    }

  }


  /* -----------------------------------------
     UPDATE DONUT
  ----------------------------------------- */

  const donut =
    asphaltPanel.querySelector(
      "[data-collection-donut]"
    );

  if (donut) {

    donut.style.setProperty(
      "--win-rate",
      `${collectionPercent}%`
    );


    const donutValue =
      donut.querySelector(
        ".donut-inner strong"
      );

    if (donutValue) {

      donutValue.textContent =
        `${collectionPercent.toFixed(1)}%`;

    }

  }


  /* -----------------------------------------
     UPDATE OWNED / REMAINING
  ----------------------------------------- */

  const winLoss =
    asphaltPanel.querySelector(
      ".win-loss"
    );

  if (winLoss) {

    const blocks =
      winLoss.querySelectorAll(
        ":scope > div"
      );


    /* OWNED */

    if (blocks[0]) {

      const number =
        blocks[0].querySelector("strong");

      if (number) {

        number.textContent =
          safeOwned;

      }

    }


    /* REMAINING */

    if (blocks[1]) {

      const number =
        blocks[1].querySelector("strong");

      if (number) {

        number.textContent =
          remaining;

      }

    }

  }


  console.log(
    `[ASPHALT 9] ${safeOwned}/${totalCars} cars = ${collectionPercent.toFixed(1)}%`
  );

}


/* =========================================================
   RUN AFTER PAGE LOAD
========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    calculateAsphaltCollection
  );

} else {

  calculateAsphaltCollection();

}


/* =========================================================
   RECALCULATE WHEN SWITCHING GAMES
========================================================= */

document.querySelectorAll(".game-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        calculateAsphaltCollection();

      });

    });

  });

});

/* =========================================================
   EXTRA DONUT ANALYTICS
   OPERATIONS / MULTIPLAYER / BR / DMZ
   DOES NOT TOUCH EXISTING ANIMATIONS
========================================================= */

function calculateExtraDonuts() {

  /* =======================================================
     ASSET DONUTS
     OPERATIONS + DMZ

     OWNED / TOTAL × 100
  ======================================================= */

  document.querySelectorAll("[data-asset-donut]").forEach(donut => {

    const owned = parseFloat(
      donut.dataset.assetsOwned
    );

    const total = parseFloat(
      donut.dataset.assetsTotal
    );

    if (
      !Number.isFinite(owned) ||
      !Number.isFinite(total) ||
      total <= 0
    ) {
      return;
    }

    const safeOwned = Math.max(
      0,
      Math.min(owned, total)
    );

    const remaining = total - safeOwned;

    const percentage =
      (safeOwned / total) * 100;


    /* DONUT */

    donut.style.setProperty(
      "--win-rate",
      `${percentage}%`
    );


    /* CENTER PERCENTAGE */

    const percentElement =
      donut.querySelector(
        "[data-asset-percent]"
      );

    if (percentElement) {

      percentElement.textContent =
        `${percentage.toFixed(1)}%`;

    }


    /* OWNED / EXTRACTED */

    const ownedElement =
      donut.querySelector(
        "[data-assets-owned-display]"
      );

    if (ownedElement) {

      ownedElement.textContent =
        safeOwned;

    }


    /* REMAINING */

    const remainingElement =
      donut.querySelector(
        "[data-assets-remaining]"
      );

    if (remainingElement) {

      remainingElement.textContent =
        remaining;

    }

  });


  /* =======================================================
     MULTIPLAYER MVP RATIO

     MVPs / TOTAL MATCHES × 100
  ======================================================= */

  document.querySelectorAll("[data-mvp-donut]").forEach(donut => {

    const mvps = parseFloat(
      donut.dataset.mvps
    );

    const totalMatches = parseFloat(
      donut.dataset.totalMatches
    );

    if (
      !Number.isFinite(mvps) ||
      !Number.isFinite(totalMatches) ||
      totalMatches <= 0
    ) {
      return;
    }

    const safeMvps = Math.max(
      0,
      Math.min(mvps, totalMatches)
    );

    const percentage =
      (safeMvps / totalMatches) * 100;


    /* DONUT */

    donut.style.setProperty(
      "--win-rate",
      `${percentage}%`
    );


    /* CENTER */

    const percentElement =
      donut.querySelector(
        "[data-mvp-percent]"
      );

    if (percentElement) {

      percentElement.textContent =
        `${percentage.toFixed(1)}%`;

    }


    /* MVP COUNT */

    const mvpElement =
      donut.querySelector(
        "[data-mvp-display]"
      );

    if (mvpElement) {

      mvpElement.textContent =
        safeMvps;

    }


    /* MATCH COUNT */

    const matchesElement =
      donut.querySelector(
        "[data-matches-display]"
      );

    if (matchesElement) {

      matchesElement.textContent =
        totalMatches;

    }

  });


  /* =======================================================
     BATTLE ROYALE

     AVG DAMAGE / MAX DAMAGE × 100

     CENTER SHOWS ACTUAL AVG DAMAGE
  ======================================================= */

  document.querySelectorAll("[data-damage-donut]").forEach(donut => {

    const averageDamage = parseFloat(
      donut.dataset.averageDamage
    );

    const maxDamage = parseFloat(
      donut.dataset.maxDamage
    );

    if (
      !Number.isFinite(averageDamage) ||
      !Number.isFinite(maxDamage) ||
      maxDamage <= 0
    ) {
      return;
    }

    const safeDamage = Math.max(
      0,
      Math.min(averageDamage, maxDamage)
    );

    const percentage =
      (safeDamage / maxDamage) * 100;


    /* DONUT */

    donut.style.setProperty(
      "--win-rate",
      `${percentage}%`
    );


    /* CENTER AVG DAMAGE */

    const centerValue =
      donut.querySelector(
        "[data-average-damage]"
      );

    if (centerValue) {

      centerValue.textContent =
        Math.round(averageDamage);

    }


    /* AVERAGE DAMAGE */

    const damageDisplay =
      donut.querySelector(
        "[data-damage-display]"
      );

    if (damageDisplay) {

      damageDisplay.textContent =
        Math.round(averageDamage);

    }


    /* REFERENCE VALUE */

    const maxDisplay =
      donut.querySelector(
        "[data-damage-max]"
      );

    if (maxDisplay) {

      maxDisplay.textContent =
        Math.round(maxDamage);

    }

  });

}


/* =========================================================
   INITIAL RUN
========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    calculateExtraDonuts
  );

} else {

  calculateExtraDonuts();

}


/* =========================================================
   RECALCULATE AFTER GAME SWITCH
========================================================= */

document.querySelectorAll(".game-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        calculateExtraDonuts();

      });

    });

  });

});


/* =========================================================
   RECALCULATE AFTER MODE SWITCH
========================================================= */

document.querySelectorAll(".mode-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        calculateExtraDonuts();

      });

    });

  });

});

})();
