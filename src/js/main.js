/**
 * GHOST TUMOR - Interactive Logic (Mobile-First)
 * Features:
 * - External hierarchical JSON translation dictionary (src/i18n/translations.json)
 * - Default language: English (with instant bilingual IT/EN toggle)
 * - Decellularization channel switch (H&E vs DAPI)
 * - Confocal microscope tabs
 * - Mobile bottom nav observer & smooth scrolling
 */

// Storage for loaded translations
let translationsData = null;
let currentLang = "en";

// Start translations fetch immediately to leverage preload cache
const translationsPromise = fetch("./translations.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load translations: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error("Could not load external translations.json:", error);
    return null;
  });

// Safety fallback: ensure body is revealed even if fetch or DOM events are delayed
setTimeout(() => {
  if (document.body && !document.body.classList.contains("i18n-ready")) {
    document.body.classList.add("i18n-ready");
  }
}, 800);

// Initialize Page Logic
document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();
  initLanguage();
  initDecellularizationViewer();
  initMicroscopeTabs();
  initMobileNavObserver();
  initSmoothScroll();
});

/**
 * Awaits translations from external JSON file and applies them before revealing the page.
 */
async function loadTranslations() {
  try {
    translationsData = await translationsPromise;
    if (translationsData) {
      applyLanguage(currentLang);
    }
  } catch (error) {
    console.error("Could not apply external translations:", error);
  } finally {
    // Reveal body with smooth fade once initial texts are injected
    if (document.body) {
      document.body.classList.add("i18n-ready");
    }
  }
}

/**
 * Traverses the hierarchical JSON dictionary to find the translation for a given key.
 */
function findTranslation(obj, targetKey, lang) {
  if (!obj || typeof obj !== "object") return null;

  for (const [key, value] of Object.entries(obj)) {
    if (key === targetKey && value && typeof value === "object" && lang in value) {
      return value[lang];
    }
    if (typeof value === "object" && !("it" in value && "en" in value)) {
      const nested = findTranslation(value, targetKey, lang);
      if (nested) return nested;
    }
  }
  return null;
}

// 1. Language Toggle Handler
function initLanguage() {
  const langBtns = document.querySelectorAll(".lang-btn");

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-lang");
      if (selected === currentLang) return;

      currentLang = selected;

      langBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-lang") === currentLang));

      applyLanguage(currentLang);
    });
  });
}

function applyLanguage(lang) {
  if (!translationsData) return;

  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    const translatedText = findTranslation(translationsData, key, lang);
    if (translatedText) {
      elem.textContent = translatedText;
    }
  });

  // Aggiorna titolo pagina e meta description
  const pageTitle = findTranslation(translationsData, "pageTitle", lang);
  if (pageTitle) {
    document.title = pageTitle;
  }
  const pageDesc = findTranslation(translationsData, "pageDescription", lang);
  const metaDesc = document.querySelector('meta[name="description"]');
  if (pageDesc && metaDesc) {
    metaDesc.setAttribute("content", pageDesc);
  }

  // Set document language attribute
  document.documentElement.setAttribute("lang", lang);
}

// 2. Decellularization Viewer: Toggle DAPI vs H&E Channels
function initDecellularizationViewer() {
  const channelBtns = document.querySelectorAll(".channel-btn");
  const imgColon = document.getElementById("img-decell-colon");
  const imgTumorPre = document.getElementById("img-decell-pre");
  const imgTumorPost = document.getElementById("img-decell-post");

  if (!imgColon || !imgTumorPre || !imgTumorPost) return;

  const images = {
    he: {
      colon: "./assets/img/decell_colon_he.webp",
      pre: "./assets/img/decell_tumor_pre_he.webp",
      post: "./assets/img/decell_tumor_post_he.webp"
    },
    dapi: {
      colon: "./assets/img/decell_colon_dapi.webp",
      pre: "./assets/img/decell_tumor_pre_dapi.webp",
      post: "./assets/img/decell_tumor_post_dapi.webp"
    }
  };

  channelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const channel = btn.getAttribute("data-channel");
      channelBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (images[channel]) {
        imgColon.src = images[channel].colon;
        imgTumorPre.src = images[channel].pre;
        imgTumorPost.src = images[channel].post;
      }
    });
  });
}

// 3. Microscope Tabs Switcher with Fixed Sizing
function initMicroscopeTabs() {
  const tabBtns = document.querySelectorAll(".micro-tab-btn");
  const panels = document.querySelectorAll(".micro-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      tabBtns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const activePanel = document.getElementById(target);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
}

// 4. Mobile Bottom Nav & Chapter Tracking
let manualNavLockTimeout = null;

function updateActiveNav(activeId) {
  const navItems = document.querySelectorAll(".mobile-nav-item");
  const desktopLinks = document.querySelectorAll(".site-nav .nav-link");

  navItems.forEach(item => {
    const href = item.getAttribute("href");
    item.classList.toggle("active", href === `#${activeId}`);
  });

  desktopLinks.forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${activeId}`);
  });
}

function initMobileNavObserver() {
  const chapterIds = ["concept", "model", "pipeline", "microscope", "team"];
  const sections = chapterIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const header = document.querySelector(".site-header");

  const detectActiveSection = () => {
    // If user recently tapped a chapter tab, ignore intermediate scroll events
    if (manualNavLockTimeout) return;

    // Edge case: scrolled to the bottom of the page -> activate last section
    const scrollBottom = window.innerHeight + window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= docHeight - 50) {
      updateActiveNav("team");
      return;
    }

    const headerHeight = header ? header.offsetHeight : 72;
    // Probe line comfortably below the sticky header
    const triggerY = headerHeight + 60;

    // If still in the hero / above the first chapter, highlight chapter 01
    const firstSectionRect = sections[0].getBoundingClientRect();
    if (firstSectionRect.top > triggerY) {
      updateActiveNav("concept");
      return;
    }

    // Find which section currently encompasses the trigger line
    let activeId = "concept";
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= triggerY && rect.bottom > triggerY) {
        activeId = sections[i].getAttribute("id");
        break;
      }
    }

    updateActiveNav(activeId);
  };

  // Passive scroll listener with requestAnimationFrame throttling for 60/120fps performance
  let isTicking = false;
  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        detectActiveSection();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", detectActiveSection, { passive: true });

  // Initial check on page load
  detectActiveSection();
}

// 5. Smooth Scroll for Anchor Links
function initSmoothScroll() {
  const header = document.querySelector(".site-header");
  const chapterIds = ["concept", "model", "pipeline", "microscope", "team"];

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (!targetElem) return;

      e.preventDefault();

      const cleanId = targetId.replace("#", "");

      // If tapping one of the chapter buttons, immediately set active state
      if (chapterIds.includes(cleanId)) {
        updateActiveNav(cleanId);

        // Lock auto-detection while smooth scrolling to prevent jittering across intermediate sections
        clearTimeout(manualNavLockTimeout);
        manualNavLockTimeout = setTimeout(() => {
          manualNavLockTimeout = null;
        }, 750);
      }

      const headerOffset = header ? header.offsetHeight : 72;
      const elemPosition = targetElem.getBoundingClientRect().top;
      const offsetPosition = elemPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });
}
