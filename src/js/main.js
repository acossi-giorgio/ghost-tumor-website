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
 * Loads translations from external JSON file.
 * The JSON structure pairs IT and EN together for every key:
 * "keyName": { "it": "...", "en": "..." }
 */
async function loadTranslations() {
  try {
    const response = await fetch("./translations.json");
    if (!response.ok) {
      throw new Error(`Failed to load translations: ${response.status}`);
    }
    translationsData = await response.json();
    applyLanguage(currentLang);
  } catch (error) {
    console.error("Could not load external translations.json:", error);
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

// 4. Mobile Bottom Nav & Intersection Observer
function initMobileNavObserver() {
  const navItems = document.querySelectorAll(".mobile-nav-item");
  const sections = document.querySelectorAll("section[id]");

  if (!navItems.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(item => {
          const href = item.getAttribute("href");
          if (href === `#${id}`) {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

// 5. Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 64;
        const elemPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elemPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
