/**
 * GHOST TUMOR - Interactive Logic (Mobile-First)
 * Features: Bilingual EN/IT toggle (default: EN), Decellularization channel switch,
 * Microscope tabs with uniform frame sizing, Mobile Nav observer, Smooth scroll
 */

// Bilingual Translation Dictionary (no emojis, no wide em-dashes)
const i18n = {
  en: {
    // Header & Meta
    navConcept: "Concept",
    navModel: "Model",
    navSteps: "8 Steps",
    navMicro: "Results",
    navTeam: "Team",
    makerDate: "ROME OCT 23-25 2026",
    
    // Hero
    heroBadge: "Maker Faire Rome 2026 : Research Stand",
    heroTitle: "GHOST TUMOR",
    heroSubtitle: "A 3D biomimetic platform to dissect the Colorectal Tumor Microenvironment",
    heroLead: "From patient surgical resections to a 3D biomimetic avatar via decellularization, GelMA hydrogel, and 3D bioprinting: enabling therapy and immunotherapy screening without animal models.",
    pill1: "Patient-Derived dECM",
    pill2: "3D Bioprinting in GelMA",
    pill3: "Animal-Free Model",
    btnExplore: "Explore 8 Steps",
    btnResults: "View Experimental Data",
    
    // Concept & Decellularization
    conceptTag: "Scientific Concept",
    conceptTitle: "Why 'Ghost Tumor'? Breaching Cancer's Fortress",
    conceptDesc: "Every solid tumor is embedded in a dense protein scaffold - the Extracellular Matrix (ECM) - which governs cell proliferation, tissue invasion, and therapeutic resistance. Colorectal cancer cells remodel this scaffold, creating a dense physical and biochemical barrier that excludes immune cell infiltration.",
    conceptCard1Title: "The 'Ghost' Scaffold (dECM)",
    conceptCard1Desc: "Through gentle chemical and enzymatic detergent wash cycles, every cell is cleared from patient colorectal resections. The result is a translucent, cell-free biological scaffold retaining native architecture, collagen composition, and microenvironmental cues.",
    conceptCard2Title: "3D Recellularization",
    conceptCard2Desc: "The freeze-dried dECM is integrated into photocrosslinkable GelMA hydrogels and repopulated with human colorectal adenocarcinoma cells and stromal fibroblasts, reconstituting genuine 3D tissue architecture in vitro.",
    
    // Comparison Viewer
    viewerTitle: "Histological Assessment: Decellularization Efficacy",
    viewerDesc: "Select the staining channel to examine how detergent perfusion completely clears cell nuclei while preserving the fibrillar extracellular matrix:",
    chanHe: "Hematoxylin & Eosin (H&E)",
    chanDapi: "DAPI (Cell Nuclei)",
    lblColon: "Healthy Colon (Control)",
    lblTumorPre: "Tumor Tissue (Pre)",
    lblTumorPost: "Tumor Tissue (Post)",
    badgeNormal: "Healthy Tissue",
    badgeTumorPre: "Cellular + Matrix",
    badgeGhost: "Ghost Tumor (dECM)",
    decellNote: "Experimental Note: In the DAPI channel (blue fluorescent filter), tumor tissue after decellularization demonstrates total absence of cell nuclei, verifying complete clearance of cellular material while maintaining the native collagen framework intact.",

    // Model Ingredients
    ingTag: "System Components",
    ingTitle: "From 2D Monolayer to 3D GelMA Bioprinting",
    ingDesc: "To overcome the limitations of 2D plastic plates and alginate's failure to support stromal cells long-term, the platform integrates four synergistic biological components:",
    lovoTitle: "LoVo Cells (Tumor)",
    lovoDesc: "Human colorectal adenocarcinoma line (EpCAM+). In the 3D biomaterial, cells exhibit high viability and organize spontaneously into tight multicellular tumor clusters.",
    cafTitle: "CAFs (Stromal Fibroblasts)",
    cafDesc: "Patient-derived Cancer-Associated Fibroblasts (Vimentin+). They remodel ECM and provide biomechanical cues. GelMA provides essential RGD adhesion motifs for their anchorage.",
    decmTitle: "Patient-Derived dECM",
    decmDesc: "Decellularized extracellular matrix lyophilized and milled into powder (5 mg/mL), enriching the bioink with patient-specific biochemical signals.",
    pbmcTitle: "PBMC & Bioreactor (Ongoing)",
    pbmcDesc: "Autologous peripheral blood lymphocytes under dynamic perfusion in bioreactors to assess immune infiltration and personalized immunotherapy response.",
    whyGelmaTitle: "Rationale: Transition from Alginate to GelMA",
    whyGelmaText: "During exploratory phases, alginate hydrogels resulted in declining metabolic rates and limited survival for Cancer-Associated Fibroblasts due to a lack of intrinsic cell attachment motifs. Switching to Gelatin Methacryloyl (GelMA), a collagen-derived biomaterial with native RGD integrin-binding sequences, restored fibroblast spreading and long-term stromal viability.",

    // 8 Lab Steps
    pipeTag: "Standard Operating Procedure",
    pipeTitle: "From Resection to 3D Micro-Constructs in 8 Steps",
    pipeDesc: "The standardized protocol illustrated on our exhibition poster, ensuring reproducible and uniform 3D cancer replicates for drug screening:",
    step1Title: "1. Lyophilization",
    step1Desc: "GelMA and patient dECM are dehydrated using a vacuum freeze-dryer (Heto LyoPro 3000) to yield stable, porous matrix sponges ready for reconstitution.",
    step2Title: "2. Bioink Formulation",
    step2Desc: "Lyophilized GelMA is dissolved in sterile saline alongside biocompatible photoinitiators (Riboflavin + Sodium Persulfate) to create the liquid bioink.",
    step3Title: "3. Cell Detachment & Centrifugation",
    step3Desc: "LoVo adenocarcinoma cells and CAFs are harvested from culture flasks under laminar flow hoods and concentrated into distinct cell pellets.",
    step4Title: "4. Cell Counting & Density Adjustment",
    step4Desc: "Viable cell concentration is determined using a Bürker hemocytometer under phase-contrast microscopy to calculate exact cell encapsulation ratios.",
    step5Title: "5. Cell Loading & Mold Casting",
    step5Desc: "Cell pellets are gently resuspended in the GelMA bioink and dispensed into customized silicone molds or extruded via a CELLINK BIO X pneumatic bioprinter.",
    step6Title: "6. Photopolymerization",
    step6Desc: "Constructs are exposed to controlled visible light / UV-A: free-radical crosslinking rapidly cures the hydrogel network into elastic mini-discs.",
    step7Title: "7. Well Transfer",
    step7Desc: "Solidified hydrogel constructs are delicately lifted using sterile micro-spatulas and transferred into individual wells of 24-well culture plates.",
    step8Title: "8. Long-Term Dynamic Incubation",
    step8Desc: "Constructs are cultured at 37 C, 5% CO2 inside Eppendorf CellXpert incubators, monitoring viability, morphometry, and drug sensitivity up to 30 days.",

    // Microscope & Results
    confTag: "Experimental Data",
    confTitle: "Under the Confocal Laser Scanning Microscope",
    confDesc: "Explore genuine fluorescence and histological data validating cell survival, multicellular organization, and stromal preservation across time:",
    tabClusters: "LoVo Clusters in GelMA",
    tabCaf: "CAF Stromal Morphology",
    tabTimeline: "30-Day Timeline & H&E",
    tabCoculture: "Co-Culture + dECM",
    microLoVoTitle: "3D Cluster Morphogenesis in LoVo Cells",
    microLoVoDesc: "Live/Dead fluorescence staining (Calcein-AM green = viable cells, EthD-1 red = dead nuclei) confirms superior cell survival and self-assembly into spherical colorectal cancer clusters inside the GelMA hydrogel.",
    microCafTitle: "Maintenance of Stromal CAFs in GelMA",
    microCafDesc: "Unlike inert polysaccharide hydrogels, GelMA promotes extensive fibroblast elongation, spindle morphology, and sustained metabolic activity through active integrin anchorage.",
    microTimeTitle: "Long-Term Kinetics (T0 to T30) & Cryosections",
    microTimeDesc: "Viability monitoring and brightfield H&E cross-sections after optimized sequential sucrose cryoprotection (15% and 30%) and OCT embedding, confirming intact cellular nests at day 30.",
    microCocultureTitle: "LoVo + CAF Co-Cultures with Patient dECM",
    microCocultureDesc: "1:1 co-culture constructs maintained up to 14 days with or without patient dECM (5 mg/mL). Matrix supplementation progressively boosts overall metabolic activity and recapitulates microenvironmental crosstalk.",
    legendLive: "Green: viable cells (Calcein-AM)",
    legendDead: "Red: dead nuclei (EthD-1)",
    legendNuclei: "Blue: cell nuclei (Hoechst / DAPI)",
    legendHe: "Purple/Pink: Hematoxylin & Eosin histology",

    // Team & Affiliations
    teamTag: "Research Consortium",
    teamTitle: "Investigators, Institutions & Collaborations",
    teamDesc: "The Ghost Tumor project is a multidisciplinary research initiative uniting academic, clinical, and engineering institutions:",
    aff1Title: "University of Genoa - DIMI",
    aff1Desc: "Department of Internal Medicine and Medical Specialties (Translational Medicine Group)",
    aff2Title: "IRCCS Ospedale Policlinico San Martino",
    aff2Desc: "Genoa - Medical Oncology and Clinical Research Units",
    aff3Title: "University of Genoa - DIMES & DISC",
    aff3Desc: "Department of Experimental Medicine & Department of Surgical Sciences and Integrated Diagnostics",
    aff4Title: "University of Pavia - CompMech",
    aff4Desc: "Department of Civil Engineering and Architecture (DICAr)",
    aff5Title: "IRCCS Policlinico San Donato",
    aff5Desc: "C3DLab (Milan) - Advanced 3D Technologies and Bioprinting",
    aff6Title: "Maker Faire Rome 2026",
    aff6Desc: "European Edition - Universities & Research Track (Oct 23-25, 2026)",
    authorsTitle: "Scientific Authors & Investigators:",
    boothTitle: "Visiting the Maker Faire Stand?",
    boothDesc: "Scan through the scientific findings or ask our research team at the booth to examine real decellularized tissue matrices in person.",
    btnDownload: "Download Scientific Poster (PDF)",
    footerCopy: "GHOST TUMOR Project - University of Genoa & IRCCS Policlinico San Martino"
  },

  it: {
    // Header & Meta
    navConcept: "Cos'è",
    navModel: "Modello",
    navSteps: "8 Step",
    navMicro: "Risultati",
    navTeam: "Team",
    makerDate: "ROMA 23-25 OTT 2026",
    
    // Hero
    heroBadge: "Maker Faire Rome 2026 : Stand Universitario",
    heroTitle: "GHOST TUMOR",
    heroSubtitle: "Una nuova piattaforma 3D per studiare il microambiente tumorale colorettale",
    heroLead: "Dal tessuto tumorale di paziente a un avatar biomimetico tridimensionale mediante decellularizzazione, GelMA e 3D bioprinting: per testare farmaci e immunoterapie senza modelli animali.",
    pill1: "Matrice dECM da Paziente",
    pill2: "3D Bioprinting in GelMA",
    pill3: "Senza Modelli Animali",
    btnExplore: "Esplora gli 8 Step",
    btnResults: "Guarda i Risultati",
    
    // Concept & Decellularization
    conceptTag: "Il Concetto Scientifico",
    conceptTitle: "Perché 'Ghost Tumor'? La Fortezza del Tumore",
    conceptDesc: "Ogni tumore è immerso in un'impalcatura di proteine - la Matrice Extracellulare (ECM) - che governa la sua crescita, l'invasione e la resistenza alle cure. Le cellule tumorali rimodellano questa matrice rendendola più densa e rigida, creando una fortezza che esclude le difese immunitarie.",
    conceptCard1Title: "L'Organo 'Fantasma' (dECM)",
    conceptCard1Desc: "Attraverso trattamenti chimico-enzimatici, tutte le cellule del tessuto tumorale di paziente vengono rimosse. Resta una matrice traslucida, un vero e proprio scaffold fantasma che conserva la memoria e la biochimica originaria.",
    conceptCard2Title: "Ricellularizzazione 3D",
    conceptCard2Desc: "La matrice liofilizzata viene unita a GelMA (idrogel fotoreticolabile) e ripopolata con cellule tumorali e stromali, ricreando in laboratorio un microambiente tridimensionale fedele alla patologia umana.",
    
    // Comparison Viewer
    viewerTitle: "Confronto Istologico: Prima e Dopo la Decellularizzazione",
    viewerDesc: "Seleziona la colorazione per osservare come la decellularizzazione rimuova i nuclei cellulari mantenendo intatta la struttura proteica della matrice:",
    chanHe: "Ematossilina-Eosina (H&E)",
    chanDapi: "DAPI (Nuclei Cellulari)",
    lblColon: "Colon Sano (Controllo)",
    lblTumorPre: "Tessuto Tumorale (Pre)",
    lblTumorPost: "Tessuto Tumorale (Post)",
    badgeNormal: "Tessuto Sano",
    badgeTumorPre: "Cellule + Matrice",
    badgeGhost: "Ghost Tumor (dECM)",
    decellNote: "Nota sperimentale: nel canale DAPI (blu), il tessuto tumorale dopo la decellularizzazione non mostra più alcun nucleo cellulare, a conferma della rimozione completa delle cellule lasciando la sola impalcatura extracellulare.",

    // Model Ingredients
    ingTag: "I Componenti del Sistema",
    ingTitle: "Dalla Coltura 2D al 3D Bioprinting in GelMA",
    ingDesc: "Per superare i limiti delle colture su plastica bidimensionale e i limiti dell'alginato nel supportare le cellule stromali, il modello combina 4 elementi biologici sinergici:",
    lovoTitle: "Cellule LoVo (Tumorali)",
    lovoDesc: "Adenocarcinoma colorettale umano (EpCAM+). Nel biomateriale tridimensionale proliferano e si auto-organizzano progressivamente in cluster sferoidali.",
    cafTitle: "CAF (Fibroblasti Stromali)",
    cafDesc: "Fibroblasti associati al tumore (Vimentina+). Rimodellano la matrice e forniscono supporto biomeccanico. La GelMA garantisce siti RGD ideali per la loro adesione.",
    decmTitle: "dECM da Paziente",
    decmDesc: "Matrice decellularizzata liofilizzata e polverizzata (5 mg/mL), che arricchisce il bioink con i segnali biochimici tipici del microambiente del paziente.",
    pbmcTitle: "PBMC & Bioreattore (Futuro)",
    pbmcDesc: "Linfociti isolati dallo stesso paziente e coltura dinamica in bioreattore per studiare l'infiltrazione immunitaria e l'efficacia di immunoterapie personalizzate.",
    whyGelmaTitle: "Perché il passaggio da Alginato a GelMA?",
    whyGelmaText: "Nelle fasi iniziali della ricerca, l'alginato ha mostrato una ridotta proliferazione nel lungo periodo per i CAF. La sostituzione con la gelatin methacryloyl (GelMA), biomateriale derivato dal collagene con siti specifici di adesione cellulare, favorisce l'interazione cellula-matrice indispensabile per la sopravvivenza dei fibroblasti stromali.",

    // 8 Lab Steps
    pipeTag: "Protocollo Sperimentale",
    pipeTitle: "Dal Tessuto al Costrutto 3D in 8 Step",
    pipeDesc: "La pipeline di laboratorio riprodotta nel poster illustrativo dello stand, per ottenere costrutti riproducibili e standardizzati:",
    step1Title: "1. Liofilizzazione (Lyophilization)",
    step1Desc: "Prepariamo il GelMA e la dECM tramite liofilizzatore (Heto LyoPro 3000) per ottenere una matrice porosa disidratata e stabile pronta all'uso.",
    step2Title: "2. Preparazione Bioink",
    step2Desc: "Sciogliamo il GelMA liofilizzato in soluzione salina con fotoiniziatori (Riboflavina + SPS) per ottenere l'idrogel liquido biocompatibile.",
    step3Title: "3. Harvesting & Centrifugazione",
    step3Desc: "Distacchiamo le cellule LoVo e CAF dalle piastre di coltura e le centrifughiamo per raccogliere e concentrare il pellet cellulare.",
    step4Title: "4. Conta Cellulare (Cell Counting)",
    step4Desc: "Contiamo le cellule al microscopio con camera di Bürker per definire con precisione la densità cellulare ottimale da inserire nel costrutto.",
    step5Title: "5. Bioink + Cellule & Semina",
    step5Desc: "Risospendiamo le cellule nel GelMA e inseriamo la mix nello stampo in silicone (mold) o procediamo alla biostampa con CELLINK BIO X.",
    step6Title: "6. Fotopolimerizzazione",
    step6Desc: "Illuminiamo l'idrogel con una specifica sorgente di luce visibile/UV: i legami polimerici reticolano e solidificano il gel in pochi minuti.",
    step7Title: "7. Well Transfer",
    step7Desc: "Preleviamo delicatamente con una spatola i piccoli gel solidificati dallo stampo e li posizioniamo uno a uno nella piastra multiwell con terreno di coltura.",
    step8Title: "8. Incubazione a Lungo Termine",
    step8Desc: "I costrutti 3D vengono mantenuti in incubatore (Eppendorf CellXpert a 37 C, 5% CO2) e analizzati per vitalità e metabolismo fino a 30 giorni.",

    // Microscope & Results
    confTag: "Dati Sperimentali",
    confTitle: "Sotto il Microscopio Confocale",
    confDesc: "Esplora i risultati sperimentali reali di vitalità, morfologia e organizzazione tissutale nel tempo:",
    tabClusters: "Cluster LoVo in GelMA",
    tabCaf: "Morfologia CAF Stromali",
    tabTimeline: "Timeline 30 Giorni & H&E",
    tabCoculture: "Co-coltura + dECM",
    microLoVoTitle: "Formazione di Cluster 3D nelle Cellule LoVo",
    microLoVoDesc: "Al saggio di vitalità Live/Dead (Calceina-AM verde per cellule vive, EthD-1 rosso per cellule morte), le cellule tumorali colorettali LoVo mostrano elevatissima vitalità e si organizzano progressivamente in caratteristici sferoidi e cluster densi.",
    microCafTitle: "Mantenimento dei CAF Fibroblasti in GelMA",
    microCafDesc: "A differenza dell'alginato, la GelMA garantisce un substrato ottimale per i Cancer-Associated Fibroblasts, che mantengono la loro tipica morfologia allungata e fusiforme con marcata attività metabolica.",
    microTimeTitle: "Evoluzione da T0 a T30 & Sezioni Crioprotette",
    microTimeDesc: "Monitoraggio della vitalità e analisi istologica con Ematossilina-Eosina dopo messa a punto del protocollo di crioprotezione con saccarosio sequenziale (15% e 30%) e inclusione in OCT, evidenziando cluster cellulari ben strutturati a 14 e 30 giorni.",
    microCocultureTitle: "Co-colture LoVo + CAF con Matrice Tumorale dECM",
    microCocultureDesc: "Prima co-coltura 1:1 mantenuta fino a 14 giorni con e senza dECM tumorale di paziente (5 mg/mL). La presenza della matrice tumorale incrementa progressivamente l'attività metabolica e ricrea la complessità del microambiente.",
    legendLive: "Verde: cellule vitali (Calceina-AM)",
    legendDead: "Rosso: cellule non vitali (EthD-1)",
    legendNuclei: "Blu: nuclei cellulari (Hoechst / DAPI)",
    legendHe: "Viola/Rosa: istologia Ematossilina-Eosina",

    // Team & Affiliations
    teamTag: "Network di Ricerca",
    teamTitle: "Autori, Centri di Ricerca & Collaborazioni",
    teamDesc: "Il progetto Ghost Tumor è frutto della collaborazione multidisciplinare tra istituti accademici e ospedalieri all'avanguardia:",
    aff1Title: "Università di Genova - DIMI",
    aff1Desc: "Dipartimento di Medicina Interna e Specialità Mediche (Gruppo di Medicina Traslazionale)",
    aff2Title: "IRCCS Ospedale Policlinico San Martino",
    aff2Desc: "Genova - Oncologia Medica e Ricerca Clinica",
    aff3Title: "Università di Genova - DIMES e DISC",
    aff3Desc: "Dipartimento di Medicina Sperimentale e Dipartimento di Scienze Chirurgiche e Diagnostiche Integrate",
    aff4Title: "Università di Pavia - CompMech",
    aff4Desc: "Dipartimento di Ingegneria Civile e Architettura (DICAr)",
    aff5Title: "IRCCS Policlinico San Donato",
    aff5Desc: "C3DLab (Milano) - Tecnologie 3D e Bioprinting",
    aff6Title: "Maker Faire Rome 2026",
    aff6Desc: "European Edition - Università ed Enti di Ricerca (23-25 Ottobre 2026)",
    authorsTitle: "Autori e Ricercatori del Progetto:",
    boothTitle: "Sei allo Stand della Fiera?",
    boothDesc: "Scorri i dettagli scientifici sul telefono o chiedi ai ricercatori presenti di mostrarti i campioni di matrice decellularizzata!",
    btnDownload: "Scarica Poster Scientifico (PDF)",
    footerCopy: "Progetto 'GHOST TUMOR' - Università di Genova & IRCCS Policlinico San Martino"
  }
};

// Default language: English
let currentLang = "en";

// Initialize Page Logic
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initDecellularizationViewer();
  initMicroscopeTabs();
  initMobileNavObserver();
  initSmoothScroll();
});

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
  const dict = i18n[lang];
  if (!dict) return;
  
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });

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
