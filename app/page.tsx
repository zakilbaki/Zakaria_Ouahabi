"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "fr";
type HeroProjectId = "velib" | "paperpal" | "defect" | "brain" | "cryosens";

const projects = [
  {
    order: "01",
    title: "Vélib Demand Forecasting",
    subtitle: "Forecasting · MLOps",
    en: "End-to-end machine learning system predicting bike availability one hour ahead, from live ingestion to model serving.",
    fr: "Système de Machine Learning complet prédisant la disponibilité des vélos une heure à l’avance, de l’ingestion en direct au déploiement.",
    tech: ["Python", "PostgreSQL", "MLflow", "FastAPI", "Docker"],
    metrics: ["RMSE 2.82", "R² 0.94", "1h horizon"],
    href: "https://github.com/zakilbaki/velib-demand-forecasting",
  },
  {
    order: "02",
    title: "PaperPal",
    subtitle: "LLM · NLP · Retrieval",
    en: "Scientific document intelligence application for summarizing, exploring and comparing research papers.",
    fr: "Application d’intelligence documentaire scientifique pour résumer, explorer et comparer des articles de recherche.",
    tech: ["FastAPI", "Streamlit", "MongoDB", "Transformers", "ChromaDB"],
    metrics: ["PDF ingestion", "Summarization", "Retrieval"],
    href: "https://github.com/zakilbaki/paperpal-rag-assistant",
  },
  {
    order: "03",
    title: "Industrial Defect Prediction",
    subtitle: "Classification · Industrial ML",
    en: "Leakage-aware classification pipeline for early defect detection in highly imbalanced industrial data.",
    fr: "Pipeline de classification limitant les fuites de données pour détecter tôt les défauts dans des données industrielles très déséquilibrées.",
    tech: ["Scikit-learn", "Feature Engineering", "Chronological Split"],
    metrics: ["34,515 products", "0.9% defects", "Leakage-aware"],
    href: "https://github.com/zakilbaki/industrial-defect-prediction",
  },
  {
    order: "04",
    title: "Brain Tumor Detection",
    subtitle: "Computer Vision · Explainable AI",
    en: "Custom lightweight CNNs for brain-tumor detection from MRI scans, with Grad-CAM explanations of the regions used by the model.",
    fr: "CNN légers développés sur mesure pour détecter les tumeurs cérébrales sur des IRM, avec des cartes Grad-CAM expliquant les zones utilisées par le modèle.",
    tech: ["PyTorch", "CNN", "Grad-CAM", "Computer Vision"],
    metrics: ["88% accuracy", "97% tumor recall", "PR AUC 0.92"],
    href: "https://github.com/zakilbaki/brain_tumor_detection",
  },
  {
    order: "05",
    title: "CryoSens Analytics",
    subtitle: "Time Series · Industrial Analytics",
    en: "Interactive toolkit for detecting rapid variations and operating cycles in industrial sensor signals.",
    fr: "Outil interactif pour détecter les variations rapides et les cycles de fonctionnement dans des signaux industriels.",
    tech: ["Python", "Plotly", "Pandas", "Signal Analytics"],
    metrics: ["Event detection", "Cycle analysis", "Human-in-the-loop"],
    href: "https://github.com/zakilbaki/cryosens_analytics",
  },
];

const heroProjects: Array<{
  id: HeroProjectId;
  shortTitle: string;
  title: string;
  category: string;
  en: string;
  fr: string;
}> = [
  {
    id: "velib",
    shortTitle: "Vélib",
    title: "Vélib Demand Forecasting",
    category: "Forecasting · MLOps",
    en: "Live-style preview of next-hour bike availability forecasting.",
    fr: "Aperçu d’une prévision de disponibilité des vélos à une heure.",
  },
  {
    id: "paperpal",
    shortTitle: "PaperPal",
    title: "PaperPal",
    category: "NLP · Document Intelligence",
    en: "From a scientific PDF to a structured summary and relevant passages.",
    fr: "D’un PDF scientifique à un résumé structuré et des passages pertinents.",
  },
  {
    id: "defect",
    shortTitle: "Defects",
    title: "Industrial Defect Prediction",
    category: "Classification · Industrial ML",
    en: "A rare-event classification workflow designed around chronological data.",
    fr: "Un workflow de classification d’événements rares respectant la chronologie.",
  },
  {
    id: "brain",
    shortTitle: "MRI",
    title: "Brain Tumor Detection",
    category: "Computer Vision · Explainable AI",
    en: "MRI classification paired with Grad-CAM model explanations.",
    fr: "Classification d’IRM accompagnée d’explications du modèle par Grad-CAM.",
  },
  {
    id: "cryosens",
    shortTitle: "CryoSens",
    title: "CryoSens Analytics",
    category: "Time Series · Sensor Analytics",
    en: "Interactive detection of rapid variations and operating cycles.",
    fr: "Détection interactive des variations rapides et des cycles de fonctionnement.",
  },
];

const experiences = [
  {
    year: "2026",
    company: "Alfa Laval",
    location: "Golbey, France",
    period: "March 2026–September 2026",
    enTitle: "Data Scientist Intern · AI for Industrial Sizing",
    frTitle: "Stage Data Scientist · IA appliquée au dimensionnement industriel",
    en: "Developed an AI-assisted sizing method, automated technical data preparation, designed a relational SQLite database and optimized regression models for engineering decision support.",
    fr: "Développement d’une méthode de dimensionnement assistée par IA, automatisation des données techniques, conception d’une base SQLite et optimisation de modèles de régression pour l’aide à la décision.",
    tech: ["Python", "SQLite", "Random Forest", "Cross-validation"],
  },
  {
    year: "2025",
    company: "VTEC Lasers & Sensors",
    location: "Eindhoven, Netherlands",
    period: "June 2025–September 2025",
    enTitle: "Data Scientist Intern",
    frTitle: "Stage Data Scientist",
    en: "Built an end-to-end machine learning pipeline to forecast PM10 concentration from sensor data and selected XGBoost after comparing several models.",
    fr: "Développement d’un pipeline de Machine Learning de bout en bout pour prévoir les PM10 et sélection de XGBoost après comparaison de plusieurs modèles.",
    tech: ["XGBoost", "LSTM", "Random Forest", "Time Series"],
    metrics: ["R² 0.81", "RMSE 4.8", "MAE 3.2"],
  },
  {
    year: "2024",
    company: "COMATAM",
    location: "Casablanca, Morocco",
    period: "June 2024–August 2024",
    enTitle: "Data Analyst Intern",
    frTitle: "Stage Data Analyst",
    en: "Extracted, cleaned and structured vessel-arrival data with SQL, then built operational indicators for business teams.",
    fr: "Extraction, nettoyage et structuration avec SQL des données d’arrivées de navires, puis création d’indicateurs opérationnels pour les équipes métier.",
    tech: ["SQL", "Excel", "CSV", "Operational KPIs"],
  },
];

const skillGroups = [
  ["Machine Learning & AI", "Scikit-learn", "XGBoost", "Regression", "Classification", "Time Series", "Transformers", "Embeddings", "Retrieval"],
  ["Data Engineering", "Python", "Pandas", "SQL", "PostgreSQL", "MongoDB", "SQLite", "Data Validation"],
  ["APIs & MLOps", "FastAPI", "Docker", "MLflow", "GitHub Actions", "Pytest", "REST APIs"],
  ["Visualization & Apps", "Streamlit", "Plotly", "Matplotlib", "Jupyter", "Interactive Dashboards"],
];

function VelibVisual({ lang }: { lang: Lang }) {
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);
  return (
    <div className="hero-visual hero-visual-velib">
      <div className="visual-toolbar">
        <span className="visual-live-dot" />
        <span>{t("Paris station · Forecast +1h", "Station parisienne · Prévision +1 h")}</span>
        <strong>R² 0.94</strong>
      </div>
      <div className="velib-layout">
        <div className="velib-map" aria-hidden="true">
          <span className="map-road road-one" />
          <span className="map-road road-two" />
          <span className="map-road road-three" />
          <span className="station-dot station-one" />
          <span className="station-dot station-two" />
          <span className="station-dot station-three active" />
          <span className="station-dot station-four" />
          <span className="station-dot station-five" />
          <div className="station-popover">
            <span>{t("Selected station", "Station sélectionnée")}</span>
            <strong>{t("Next-hour forecast", "Prévision à une heure")}</strong>
          </div>
        </div>
        <div className="velib-chart-card">
          <div className="chart-heading">
            <span>{t("Bike availability", "Disponibilité des vélos")}</span>
            <small>{t("Observed", "Observé")} / {t("Forecast", "Prévision")}</small>
          </div>
          <svg viewBox="0 0 360 170" className="forecast-chart" aria-hidden="true">
            <g className="chart-grid-lines">
              <line x1="20" y1="30" x2="340" y2="30" />
              <line x1="20" y1="80" x2="340" y2="80" />
              <line x1="20" y1="130" x2="340" y2="130" />
            </g>
            <path className="observed-line" d="M20 116 C62 105 78 60 115 72 S166 112 205 78" />
            <path className="forecast-line" d="M205 78 C242 44 272 58 305 40 S327 35 340 28" />
            <line className="forecast-divider" x1="205" y1="20" x2="205" y2="145" />
            <circle className="chart-point" cx="205" cy="78" r="5" />
          </svg>
          <div className="chart-footer"><span>Now</span><span>+1h</span></div>
        </div>
      </div>
    </div>
  );
}

function PaperPalVisual({ lang }: { lang: Lang }) {
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);
  return (
    <div className="hero-visual hero-visual-paperpal">
      <div className="visual-toolbar">
        <span className="document-icon">PDF</span>
        <span>scientific-paper.pdf</span>
        <strong>{t("Document intelligence", "Intelligence documentaire")}</strong>
      </div>
      <div className="paperpal-layout">
        <div className="paper-preview">
          <div className="paper-title-line" />
          <div className="paper-line width-90" />
          <div className="paper-line width-78" />
          <div className="paper-highlight" />
          <div className="paper-line width-84" />
          <div className="paper-line width-65" />
          <div className="paper-figure"><span /><span /><span /><span /></div>
        </div>
        <div className="paper-results">
          <div className="result-card summary-card">
            <div className="result-title"><span>{t("Generated summary", "Résumé généré")}</span><b>✓</b></div>
            <div className="summary-line width-90" />
            <div className="summary-line width-78" />
            <div className="summary-line width-84" />
          </div>
          <div className="result-card">
            <div className="result-title"><span>{t("Keywords", "Mots-clés")}</span><b>5</b></div>
            <div className="keyword-row"><span>retrieval</span><span>science</span><span>NLP</span></div>
          </div>
          <div className="result-card retrieval-card">
            <div className="result-title"><span>{t("Relevant passages", "Passages pertinents")}</span><b>{t("Experimental", "Expérimental")}</b></div>
            <div className="retrieval-line"><span>p. 4</span><i /></div>
            <div className="retrieval-line"><span>p. 7</span><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DefectVisual({ lang }: { lang: Lang }) {
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);
  return (
    <div className="hero-visual hero-visual-defect">
      <div className="visual-toolbar">
        <span className="visual-live-dot defect-dot" />
        <span>{t("Chronological production stream", "Flux de production chronologique")}</span>
        <strong>0.9% {t("defects", "défauts")}</strong>
      </div>
      <div className="defect-layout">
        <div className="timeline-strip">
          <div><span>{t("Past", "Passé")}</span><strong>{t("Training", "Entraînement")}</strong></div>
          <i />
          <div><span>{t("Future", "Futur")}</span><strong>{t("Test", "Test")}</strong></div>
        </div>
        <div className="conveyor-scene">
          <div className="scanner"><span>ML</span></div>
          <div className="conveyor-belt">
            {[0, 1, 2, 3, 4, 5].map((item) => <span className={`product-box product-${item} ${item === 4 ? "flagged" : ""}`} key={item}>{item === 4 ? "!" : ""}</span>)}
          </div>
          <div className="risk-card">
            <span>{t("Defect risk", "Risque de défaut")}</span>
            <strong>0.84</strong>
            <small>{t("Flagged for review", "Signalé pour vérification")}</small>
          </div>
        </div>
        <div className="defect-flow">
          <span>{t("Past-only features", "Variables fondées sur le passé")}</span><i>→</i><span>{t("Risk score", "Score de risque")}</span><i>→</i><span>{t("Human review", "Vérification humaine")}</span>
        </div>
      </div>
    </div>
  );
}

function BrainVisual({ lang }: { lang: Lang }) {
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);
  return (
    <div className="hero-visual hero-visual-brain">
      <div className="visual-toolbar">
        <span className="visual-live-dot brain-dot" />
        <span>{t("MRI research preview", "Aperçu de recherche sur IRM")}</span>
        <strong>Grad-CAM</strong>
      </div>
      <div className="brain-layout">
        <div className="mri-panel">
          <div className="mri-scan">
            <div className="brain-shape brain-left" />
            <div className="brain-shape brain-right" />
            <div className="gradcam-spot gradcam-one" />
            <div className="gradcam-spot gradcam-two" />
            <div className="scan-line" />
          </div>
          <div className="mri-caption"><span>{t("Model focus", "Zone observée par le modèle")}</span><strong>{t("Tumor pattern", "Motif tumoral")}</strong></div>
        </div>
        <div className="brain-metrics">
          <div><strong>88%</strong><span>Accuracy</span></div>
          <div><strong>97%</strong><span>{t("Tumor recall", "Rappel tumeur")}</span></div>
          <div><strong>0.92</strong><span>PR AUC</span></div>
          <p>{t("Research and educational project, not for clinical diagnosis.", "Projet de recherche et d’apprentissage, non destiné au diagnostic clinique.")}</p>
        </div>
      </div>
    </div>
  );
}

function CryoSensVisual({ lang }: { lang: Lang }) {
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);
  return (
    <div className="hero-visual hero-visual-cryosens">
      <div className="visual-toolbar">
        <span className="visual-live-dot cryo-dot" />
        <span>{t("Industrial sensor signal", "Signal de capteur industriel")}</span>
        <strong>{t("Event detection", "Détection d’événement")}</strong>
      </div>
      <div className="cryo-layout">
        <div className="signal-legend"><span><i className="legend-temp" />Temperature</span><span><i className="legend-event" />{t("Detected event", "Événement détecté")}</span></div>
        <svg viewBox="0 0 620 280" className="sensor-chart" aria-hidden="true">
          <g className="sensor-grid">
            <line x1="30" y1="50" x2="590" y2="50" />
            <line x1="30" y1="120" x2="590" y2="120" />
            <line x1="30" y1="190" x2="590" y2="190" />
            <line x1="30" y1="250" x2="590" y2="250" />
          </g>
          <rect className="event-zone" x="350" y="25" width="92" height="225" rx="12" />
          <path className="sensor-line" d="M30 202 C72 196 100 205 138 190 S200 183 240 178 S302 176 340 164 C360 155 366 76 390 64 C414 52 425 184 458 176 S520 160 590 166" />
          <circle className="event-point" cx="390" cy="64" r="7" />
        </svg>
        <div className="event-card"><span>{t("Rapid variation detected", "Variation rapide détectée")}</span><strong>{t("Heating cycle", "Cycle de chauffage")}</strong><small>{t("Cross-sensor event ready for review", "Événement multi-capteurs prêt à être analysé")}</small></div>
      </div>
    </div>
  );
}

function ProjectVisual({ id, lang }: { id: HeroProjectId; lang: Lang }) {
  if (id === "velib") return <VelibVisual lang={lang} />;
  if (id === "paperpal") return <PaperPalVisual lang={lang} />;
  if (id === "defect") return <DefectVisual lang={lang} />;
  if (id === "brain") return <BrainVisual lang={lang} />;
  return <CryoSensVisual lang={lang} />;
}

function HeroProjectShowcase({ lang }: { lang: Lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeProject = heroProjects[activeIndex];

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroProjects.length);
    }, 5600);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused]);

  return (
    <div className={`project-showcase showcase-${activeProject.id}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="showcase-topbar">
        <div className="window-controls"><span /><span /><span /></div>
        <span>{activeProject.category}</span>
        <strong>{String(activeIndex + 1).padStart(2, "0")} / 05</strong>
      </div>

      <div className="showcase-content" key={activeProject.id}>
        <div className="showcase-copy">
          <span className="showcase-kicker">{lang === "en" ? "Selected project" : "Projet sélectionné"}</span>
          <h2>{activeProject.title}</h2>
          <p>{lang === "en" ? activeProject.en : activeProject.fr}</p>
        </div>
        <ProjectVisual id={activeProject.id} lang={lang} />
      </div>

      <div className="showcase-navigation" aria-label={lang === "en" ? "Project previews" : "Aperçus des projets"}>
        {heroProjects.map((project, index) => (
          <button type="button" className={index === activeIndex ? "active" : ""} onClick={() => setActiveIndex(index)} key={project.id} aria-label={project.title} aria-pressed={index === activeIndex}>
            <span>{project.shortTitle}</span>
            <i />
          </button>
        ))}
      </div>
      <div className="showcase-progress" key={`progress-${activeIndex}`}><span /></div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);

  return (
    <main>
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container-shell flex h-16 items-center justify-between">
          <a href="#home" className="display-title text-xl">ZO<span className="text-[var(--accent)]">.</span></a>
          <div className="hidden items-center gap-6 text-sm lg:flex">
            <a href="#projects">{t("Projects", "Projets")}</a>
            <a href="#experience">{t("Experience", "Expérience")}</a>
            <a href="#skills">{t("Skills", "Compétences")}</a>
            <a href="#about">{t("About", "À propos")}</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-[var(--border)] bg-white/70 p-1 text-sm">
              <button className={`rounded-lg px-2.5 py-1.5 ${lang === "en" ? "bg-[var(--accent)] text-white" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`rounded-lg px-2.5 py-1.5 ${lang === "fr" ? "bg-[var(--accent)] text-white" : ""}`} onClick={() => setLang("fr")}>FR</button>
            </div>
            <a className="button-primary hidden sm:inline-flex" href="/Zakaria_Ouahabi_CV.pdf" download>{t("Download CV", "Télécharger le CV")}</a>
          </div>
        </div>
      </nav>

      <header id="home" className="container-shell grid min-h-[800px] items-center gap-12 py-16 lg:grid-cols-[.88fr_1.12fr]">
        <div className="hero-copy">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-sm">
            <span className="availability-dot h-2 w-2 rounded-full bg-[var(--accent)]" />
            {t("Available from September 2026", "Disponible à partir de septembre 2026")}
          </div>
          <p className="eyebrow mb-3">Zakaria Ouahabi</p>
          <h1 className="display-title text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            <span className="hero-line hero-line-one">Data Scientist &</span><br />
            <span className="hero-line hero-line-two">AI Engineer</span>
          </h1>
          <p className="muted hero-reveal hero-reveal-one mt-6 max-w-2xl text-lg leading-8">{t(
            "I build machine learning systems and AI applications, from rigorous experimentation to usable, deployment-ready products.",
            "Je conçois des systèmes de Machine Learning et des applications d’intelligence artificielle, de l’expérimentation rigoureuse jusqu’à des produits utilisables et prêts à être déployés."
          )}</p>
          <p className="muted hero-reveal hero-reveal-two mt-3 max-w-2xl leading-7">{t(
            "My work spans forecasting, classification, computer vision, industrial analytics, NLP and document intelligence.",
            "Mon travail couvre la prévision, la classification, la vision par ordinateur, l’analyse industrielle, le NLP et l’intelligence documentaire."
          )}</p>
          <div className="hero-reveal hero-reveal-three mt-5 flex flex-wrap gap-2">{["Machine Learning", "LLM Applications", "Computer Vision", "NLP", "MLOps"].map((x) => <span className="pill" key={x}>{x}</span>)}</div>
          <div className="hero-reveal hero-reveal-four mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#projects">{t("Explore my projects", "Découvrir mes projets")}</a>
            <a className="button-secondary" href="/Zakaria_Ouahabi_CV.pdf" download>{t("Download CV", "Télécharger le CV")}</a>
          </div>
          <div className="muted hero-reveal hero-reveal-five mt-8 flex flex-wrap gap-5 text-sm">
            <a href="https://github.com/zakilbaki" target="_blank">GitHub ↗</a>
            <a href="#contact">LinkedIn ↗</a>
            <a href="mailto:ouahabizak1512@gmail.com">{t("Email me ↗", "M’écrire ↗")}</a>
          </div>
        </div>

        <HeroProjectShowcase lang={lang} />
      </header>

      <section id="projects" className="section border-t border-[var(--border)]">
        <div className="container-shell">
          <div className="section-heading"><p className="eyebrow">{t("Selected work", "Projets sélectionnés")}</p><h2 className="display-title mt-2 text-4xl sm:text-5xl">{t("Projects built around real use cases.", "Des projets construits autour de cas d’usage concrets.")}</h2></div>
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article className={`card overflow-hidden ${index === projects.length - 1 ? "lg:col-span-2" : ""}`} key={project.title}>
                <div className="soft border-b border-[var(--border)] p-6">
                  <div className="flex items-center justify-between"><span className="pill">{project.order}</span><span className="muted text-sm">{project.subtitle}</span></div>
                  <div className="mt-8 grid grid-cols-3 gap-3">{project.metrics.map((metric) => <div className="metric text-center text-sm font-semibold" key={metric}>{metric}</div>)}</div>
                </div>
                <div className="p-6">
                  <h3 className="display-title text-3xl">{project.title}</h3>
                  <p className="muted mt-3 leading-7">{lang === "en" ? project.en : project.fr}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((x) => <span className="pill" key={x}>{x}</span>)}</div>
                  <a className="button-secondary mt-6" href={project.href} target="_blank">GitHub ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section border-t border-[var(--border)]">
        <div className="container-shell">
          <div className="section-heading"><p className="eyebrow">{t("Experience", "Expérience")}</p><h2 className="display-title mt-2 text-4xl sm:text-5xl">{t("Applied data science across industry and operations.", "De la Data Science appliquée à l’industrie et aux opérations.")}</h2></div>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <article className="card grid gap-6 p-6 lg:grid-cols-[1.1fr_.9fr] lg:p-8" key={exp.company}>
                <div><div className="flex flex-wrap items-center gap-3"><span className="pill">{exp.year}</span><span className="muted text-sm">{exp.location}</span></div><h3 className="display-title mt-5 text-3xl">{lang === "en" ? exp.enTitle : exp.frTitle}</h3><p className="muted mt-1">{exp.company} · {exp.period}</p><p className="muted mt-5 leading-7">{lang === "en" ? exp.en : exp.fr}</p><div className="mt-5 flex flex-wrap gap-2">{exp.tech.map((x) => <span className="pill" key={x}>{x}</span>)}</div></div>
                <div className="soft rounded-2xl border border-[var(--border)] p-5"><p className="font-semibold">{t("Visual proof", "Preuve visuelle")}</p><div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm">{(exp.metrics ?? ["Data sources", "Python pipeline", "Structured data", "Decision support"]).map((x) => <div className="metric" key={x}>{x}</div>)}</div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section border-t border-[var(--border)]">
        <div className="container-shell">
          <div className="section-heading"><p className="eyebrow">{t("Technical toolkit", "Compétences techniques")}</p><h2 className="display-title mt-2 text-4xl sm:text-5xl">{t("Skills connected to real projects.", "Des compétences reliées à des projets concrets.")}</h2></div>
          <div className="grid gap-5 md:grid-cols-2">{skillGroups.map(([title, ...items]) => <article className="card p-6" key={title}><h3 className="display-title text-2xl">{title}</h3><div className="mt-5 flex flex-wrap gap-2">{items.map((x) => <span className="pill" key={x}>{x}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section id="about" className="section border-t border-[var(--border)]">
        <div className="container-shell grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-center">
          <div className="soft flex min-h-80 items-center justify-center rounded-3xl border border-[var(--border)]"><div className="display-title flex h-44 w-44 items-center justify-center rounded-full border border-[var(--border)] bg-white text-5xl text-[var(--accent)]">ZO</div></div>
          <div><p className="eyebrow">{t("About", "À propos")}</p><h2 className="display-title mt-2 text-4xl sm:text-5xl">{t("Turning models into usable systems.", "Transformer des modèles en systèmes utilisables.")}</h2><p className="muted mt-5 max-w-2xl leading-7">{t("I am a final-year Data Science engineering student at Télécom Physique Strasbourg. I enjoy working at the intersection of data science and software engineering, with a focus on practical machine learning and AI applications.", "Je suis étudiant en dernière année du cursus ingénieur en Science des Données à Télécom Physique Strasbourg. Je travaille à l’intersection de la Data Science et du génie logiciel, avec un intérêt pour les applications concrètes du Machine Learning et de l’IA.")}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[[t("Education", "Formation"), "Télécom Physique Strasbourg"], [t("Location", "Localisation"), t("France · Open to relocation", "France · Mobile géographiquement")], [t("Languages", "Langues"), "French · English"], [t("Availability", "Disponibilité"), t("September 2026", "Septembre 2026")]].map(([a,b]) => <div className="card p-4" key={a}><b className="text-sm">{a}</b><p className="muted mt-1 text-sm">{b}</p></div>)}</div></div>
        </div>
      </section>

      <section id="contact" className="section border-t border-[var(--border)]">
        <div className="container-shell rounded-3xl bg-[#111827] p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end"><div><p className="eyebrow !text-white/60">Contact</p><h2 className="display-title mt-3 text-4xl sm:text-5xl">{t("Let’s build something useful.", "Construisons quelque chose d’utile.")}</h2><p className="mt-4 max-w-xl leading-7 text-white/70">{t("I am open to Data Scientist and AI Engineer opportunities starting in September 2026.", "Je suis ouvert aux opportunités de Data Scientist et AI Engineer à partir de septembre 2026.")}</p></div><div className="flex flex-col gap-3"><a className="button-primary" href="mailto:ouahabizak1512@gmail.com">{t("Send me an email", "M’envoyer un e-mail")}</a><a className="button-secondary !border-white/20 !bg-transparent !text-white" href="https://github.com/zakilbaki" target="_blank">GitHub ↗</a><a className="button-secondary !border-white/20 !bg-transparent !text-white" href="#">LinkedIn ↗</a></div></div>
          <div className="mt-8 border-t border-white/15 pt-6 text-sm text-white/65">ouahabizak1512@gmail.com · GitHub @zakilbaki · {t("Phone and LinkedIn link to add", "Téléphone et lien LinkedIn à ajouter")}</div>
        </div>
      </section>

      <footer className="container-shell flex flex-col gap-3 border-t border-[var(--border)] py-7 text-sm text-[var(--muted)] sm:flex-row sm:justify-between"><p>{t("Designed and built by Zakaria Ouahabi", "Conçu et développé par Zakaria Ouahabi")}</p><a href="#home">{t("Back to top", "Retour en haut")} ↑</a></footer>
    </main>
  );
}
