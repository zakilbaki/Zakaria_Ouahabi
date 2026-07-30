"use client";

import { useState } from "react";

type Lang = "en" | "fr";

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
    title: "CryoSens Analytics",
    subtitle: "Time Series · Industrial Analytics",
    en: "Interactive toolkit for detecting rapid variations and operating cycles in industrial sensor signals.",
    fr: "Outil interactif pour détecter les variations rapides et les cycles de fonctionnement dans des signaux industriels.",
    tech: ["Python", "Plotly", "Pandas", "Signal Analytics"],
    metrics: ["Event detection", "Cycle analysis", "Human-in-the-loop"],
    href: "https://github.com/zakilbaki/cryosens_analytics",
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

      <header id="home" className="container-shell grid min-h-[760px] items-center gap-12 py-16 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            {t("Available from September 2026", "Disponible à partir de septembre 2026")}
          </div>
          <p className="eyebrow mb-3">Zakaria Ouahabi</p>
          <h1 className="display-title text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Data Scientist &<br />AI Engineer</h1>
          <p className="muted mt-6 max-w-2xl text-lg leading-8">{t(
            "I build machine learning systems and AI applications, from rigorous experimentation to usable, deployment-ready products.",
            "Je conçois des systèmes de Machine Learning et des applications d’intelligence artificielle, de l’expérimentation rigoureuse jusqu’à des produits utilisables et prêts à être déployés."
          )}</p>
          <p className="muted mt-3 max-w-2xl leading-7">{t(
            "My work spans forecasting, classification, industrial analytics, NLP and document intelligence.",
            "Mon travail couvre la prévision, la classification, l’analyse industrielle, le NLP et l’intelligence documentaire."
          )}</p>
          <div className="mt-5 flex flex-wrap gap-2">{["Machine Learning", "LLM Applications", "NLP", "MLOps"].map((x) => <span className="pill" key={x}>{x}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#projects">{t("Explore my projects", "Découvrir mes projets")}</a>
            <a className="button-secondary" href="/Zakaria_Ouahabi_CV.pdf" download>{t("Download CV", "Télécharger le CV")}</a>
          </div>
          <div className="muted mt-8 flex flex-wrap gap-5 text-sm">
            <a href="https://github.com/zakilbaki" target="_blank">GitHub ↗</a>
            <a href="#contact">LinkedIn ↗</a>
            <a href="mailto:ouahabizak1512@gmail.com">{t("Email me ↗", "M’écrire ↗")}</a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex justify-between gap-4"><div><h2 className="font-semibold">{t("Predictive machine learning", "Machine Learning prédictif")}</h2><p className="muted mt-1 text-sm">{t("Forecasting, classification and industrial data", "Prévision, classification et données industrielles")}</p></div><span className="pill">ML</span></div>
            <div className="my-5 h-px bg-[var(--border)]" />
            <div className="grid grid-cols-3 gap-3 text-center text-sm"><div><b>{t("Prepare", "Préparer")}</b><p className="muted mt-1 text-xs">Python · SQL</p></div><div><b>{t("Model", "Modéliser")}</b><p className="muted mt-1 text-xs">Scikit-learn</p></div><div><b>{t("Serve", "Déployer")}</b><p className="muted mt-1 text-xs">FastAPI · Docker</p></div></div>
          </div>
          <div className="card p-6">
            <div className="flex justify-between gap-4"><div><h2 className="font-semibold">{t("LLM and document intelligence", "LLM et intelligence documentaire")}</h2><p className="muted mt-1 text-sm">{t("Summarization, embeddings and retrieval", "Résumé, embeddings et recherche documentaire")}</p></div><span className="pill">NLP</span></div>
            <div className="my-5 h-px bg-[var(--border)]" />
            <div className="grid grid-cols-3 gap-3 text-center text-sm"><div><b>{t("Extract", "Extraire")}</b><p className="muted mt-1 text-xs">PDF · NLP</p></div><div><b>{t("Understand", "Comprendre")}</b><p className="muted mt-1 text-xs">Transformers</p></div><div><b>{t("Retrieve", "Rechercher")}</b><p className="muted mt-1 text-xs">Embeddings · RAG</p></div></div>
          </div>
        </div>
      </header>

      <section id="projects" className="section border-t border-[var(--border)]">
        <div className="container-shell">
          <div className="section-heading"><p className="eyebrow">{t("Selected work", "Projets sélectionnés")}</p><h2 className="display-title mt-2 text-4xl sm:text-5xl">{t("Projects built around real use cases.", "Des projets construits autour de cas d’usage concrets.")}</h2></div>
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article className={`card overflow-hidden ${index < 2 ? "" : "lg:col-span-1"}`} key={project.title}>
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
