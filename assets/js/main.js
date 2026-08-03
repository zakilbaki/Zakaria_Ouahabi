const grid = document.querySelector("#project-grid");
const filters = document.querySelector("#project-filters");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const header = document.querySelector("[data-header]");

const projects = window.portfolioProjects || [];
const categories = ["All", ...new Set(projects.map((project) => project.filterCategory))];
let activeCategory = "All";
let revealObserver;

const technologyLogoMap = {
  "OpenAI API": "assets/logos/openai.svg",
  FastAPI: "assets/logos/fastapi.svg",
  Streamlit: "assets/logos/streamlit.svg",
  MongoDB: "assets/logos/mongodb.svg",
  ChromaDB: "assets/logos/chromadb.png",
  "Hugging Face": "assets/logos/huggingface.svg",
  Docker: "assets/logos/docker.svg",
  Python: "assets/logos/python.svg",
  PostgreSQL: "assets/logos/postgresql.svg",
  MLflow: "assets/logos/mlflow.svg",
  "Docker Compose": "assets/logos/docker.svg",
  "Gradient Boosting": "assets/logos/scikitlearn.svg",
  PyTorch: "assets/logos/pytorch.svg",
  CNN: "assets/logos/pytorch.svg",
  "Grad-CAM": "assets/logos/pytorch.svg",
  ROC: "assets/logos/pytorch.svg",
  "PR curve": "assets/logos/pytorch.svg",
  Kaggle: "assets/logos/kaggle.svg",
  "Scikit-learn": "assets/logos/scikitlearn.svg",
  "Elastic Net": "assets/logos/scikitlearn.svg",
  Pandas: "assets/logos/pandas.svg",
  NumPy: "assets/logos/numpy.svg",
  Ruff: "assets/logos/ruff.svg",
  Pytest: "assets/logos/pytest.svg",
  CI: "assets/logos/githubactions.svg",
};

function technologyItemsTemplate(stack = []) {
  return stack
    .map((item) => {
      const logo = technologyLogoMap[item];
      const initials = item
        .split(/[\s-]+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      return `
        <li>
          ${
            logo
              ? `<img src="${logo}" alt="" aria-hidden="true" />`
              : `<span class="technology-mark" aria-hidden="true">${initials}</span>`
          }
          <span>${item}</span>
        </li>
      `;
    })
    .join("");
}

function projectTemplate(project) {
  const slug =
    project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const titleId = `project-title-${slug}`;
  const action = project.caseStudyDemo
    ? `
      <button
        class="project-card-action"
        type="button"
        data-case-study="${project.id}"
        aria-label="Open ${project.title} project"
      ><span class="sr-only">Open project</span></button>
    `
    : project.detailImage
    ? `
      <button
        class="project-card-action"
        type="button"
        data-detail-image="${project.detailImage}"
        data-detail-alt="${project.detailAlt || ""}"
        data-detail-title="${project.detailTitle || project.title}"
        aria-label="Open ${project.title} visual"
      ><span class="sr-only">Open visual</span></button>
    `
    : project.repo
    ? `
      <a
        class="project-card-action"
        href="${project.repo}"
        target="_blank"
        rel="noreferrer"
        aria-label="View ${project.title} repository"
      ><span class="sr-only">View project repository</span></a>
    `
    : "";

  return `
    <article class="project-card project-card--${slug}" data-category="${project.filterCategory}">
      <div class="project-media">
        <img class="project-image" src="${project.image}" alt="${project.imageAlt || ""}" loading="lazy" width="900" height="675" />
        <span class="project-open-cue" aria-hidden="true">
          <span>View project</span>
          <span class="project-open-arrow">↗</span>
        </span>
      </div>
      <div class="project-body">
        <div class="project-meta">
          <span>${project.category}</span>
        </div>
        <h3 id="${titleId}">${project.title}</h3>
        <ul class="project-tech-list" aria-label="Technologies">
          ${technologyItemsTemplate(project.stack)}
        </ul>
      </div>
      ${action}
    </article>
  `;
}

const visualModal = document.createElement("div");
visualModal.className = "visual-modal";
visualModal.setAttribute("role", "dialog");
visualModal.setAttribute("aria-modal", "true");
visualModal.setAttribute("aria-hidden", "true");
visualModal.innerHTML = `
  <button class="visual-modal-backdrop" type="button" aria-label="Close visual preview"></button>
  <div class="visual-modal-panel" role="document">
    <div class="visual-modal-header">
      <h3 id="visual-modal-title"></h3>
      <button class="visual-modal-close" type="button" aria-label="Close visual preview">Close</button>
    </div>
    <img class="visual-modal-image" alt="" />
  </div>
`;
document.body.append(visualModal);

const caseStudyView = document.createElement("section");
caseStudyView.className = "case-study-view";
caseStudyView.setAttribute("aria-hidden", "true");
caseStudyView.innerHTML = `
  <button class="case-study-close" type="button" aria-label="Back to projects">
    <span aria-hidden="true">←</span>
    <span>Projects</span>
  </button>
  <div class="case-study-scroll">
    <div class="case-study-hero">
      <img class="case-study-image" alt="" />
      <div class="case-study-shade" aria-hidden="true"></div>
      <div class="case-study-heading">
        <p class="case-study-category"></p>
        <h2 class="case-study-title"></h2>
        <p class="case-study-subtitle"></p>
      </div>
    </div>
    <div class="case-study-story">
      <div class="case-study-visual-column">
        <div class="case-study-progress" aria-hidden="true"><span></span></div>
        <div class="case-study-visual-stage"></div>
      </div>
      <div class="case-study-chapters"></div>
    </div>
    <footer class="case-study-footer">
      <div>
        <p class="section-kicker">Built with</p>
        <ul class="case-study-stack" aria-label="Technologies"></ul>
      </div>
      <a class="button button-primary case-study-code-link" href="#" target="_blank" rel="noreferrer">
        View code
        <span aria-hidden="true">↗</span>
      </a>
    </footer>
  </div>
`;
document.body.append(caseStudyView);

const modalTitle = visualModal.querySelector("#visual-modal-title");
const modalImage = visualModal.querySelector(".visual-modal-image");
const modalCloseControls = visualModal.querySelectorAll(".visual-modal-close, .visual-modal-backdrop");
const caseStudyHero = caseStudyView.querySelector(".case-study-hero");
const caseStudyImage = caseStudyView.querySelector(".case-study-image");
const caseStudyClose = caseStudyView.querySelector(".case-study-close");
const caseStudyScroll = caseStudyView.querySelector(".case-study-scroll");
const caseStudyVisualStage = caseStudyView.querySelector(".case-study-visual-stage");
const caseStudyChapters = caseStudyView.querySelector(".case-study-chapters");
const caseStudyProgress = caseStudyView.querySelector(".case-study-progress span");
const caseStudyCodeLink = caseStudyView.querySelector(".case-study-code-link");
let activeCaseStudyButton = null;
let caseStudyTransitionImage = null;
let storyObserver = null;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function methodVisualTemplate() {
  return `
    <div class="case-study-method" role="img" aria-label="Chronological machine learning pipeline using past-only rolling features">
      <span>PLC exports</span>
      <span>Trace parsing</span>
      <span>Past-only features</span>
      <span>Chronological holdout</span>
      <span>Elastic Net</span>
    </div>
  `;
}

function resultsVisualTemplate(step) {
  const missedDefects = step.totalDefects - step.detectedDefects;
  const defectDots = Array.from(
    { length: step.totalDefects },
    (_, index) =>
      `<span class="${index < step.detectedDefects ? "is-detected" : "is-missed"}"></span>`
  ).join("");

  return `
    <div
      class="case-study-results"
      role="img"
      aria-label="${step.detectedDefects} of ${step.totalDefects} defective motors detected, ${missedDefects} missed, ${step.falseAlarms} false alarms and ${step.auroc} AUROC"
    >
      <div class="case-study-result-heading">
        <p>Defect detection</p>
        <strong>${step.detectedDefects}<span> / ${step.totalDefects}</span></strong>
        <small>defective motors detected</small>
      </div>
      <div class="case-study-defect-dots" aria-hidden="true">${defectDots}</div>
      <div class="case-study-dot-legend" aria-hidden="true">
        <span><i class="is-detected"></i>${step.detectedDefects} detected</span>
        <span><i class="is-missed"></i>${missedDefects} missed</span>
      </div>
      <div class="case-study-result-facts">
        <div>
          <strong>69%</strong>
          <span>Defect recall</span>
        </div>
        <div>
          <strong>${step.auroc}</strong>
          <span>Test AUROC</span>
        </div>
        <div>
          <strong>${step.falseAlarms.toLocaleString("en-US")}</strong>
          <span>False alarms</span>
        </div>
      </div>
      <div class="case-study-result-verdict">
        <span>Operational decision</span>
        <strong>Prioritize inspection</strong>
        <small>Keep human quality control in the loop</small>
      </div>
    </div>
  `;
}

function forecastTimelineVisualTemplate() {
  return `
    <div
      class="forecast-timeline"
      role="img"
      aria-label="Chronological model validation using training data from January 1 to March 11, validation data from March 11 to March 13 and test data from March 13 to March 16"
    >
      <div class="forecast-timeline-heading">
        <p>Chronological split</p>
        <strong>Past first. Future last.</strong>
      </div>
      <div class="forecast-split" aria-hidden="true">
        <div class="forecast-split-segment forecast-split-segment--train">
          <span>Train</span>
          <small>Jan 01 → Mar 11</small>
        </div>
        <div class="forecast-split-segment forecast-split-segment--validation">
          <span>Validate</span>
          <small>Mar 11 → 13</small>
        </div>
        <div class="forecast-split-segment forecast-split-segment--test">
          <span>Test</span>
          <small>Mar 13 → 16</small>
        </div>
      </div>
      <div class="forecast-memory">
        <p>Per-station memory</p>
        <div aria-hidden="true">
          <span>t−3</span>
          <span>t−2</span>
          <span>t−1</span>
          <span>Now</span>
          <strong>+1h target</strong>
        </div>
      </div>
      <p class="forecast-timeline-note">Lag and delta features are built before the future target is revealed.</p>
    </div>
  `;
}

function forecastResultsVisualTemplate(step) {
  return `
    <div
      class="forecast-results"
      role="img"
      aria-label="Chronological test result with ${step.mae} bikes mean absolute error, ${step.rmse} root mean squared error and ${step.r2} R squared for a one-hour forecast"
    >
      <div class="forecast-result-primary">
        <p>Mean absolute error</p>
        <strong>${step.mae}<span> bikes</span></strong>
        <small>Average distance between the forecast and the observed station state</small>
      </div>
      <div class="forecast-result-facts">
        <div>
          <strong>${step.rmse}</strong>
          <span>Test RMSE</span>
        </div>
        <div>
          <strong>${step.r2}</strong>
          <span>Test R²</span>
        </div>
        <div>
          <strong>${step.horizon}</strong>
          <span>Forecast horizon</span>
        </div>
      </div>
      <div class="forecast-result-verdict">
        <span>Operational reading</span>
        <strong>Short-horizon guidance</strong>
        <small>Validate across seasons before using the forecast for automated rebalancing.</small>
      </div>
    </div>
  `;
}

function fraudImbalanceVisualTemplate() {
  return `
    <div
      class="fraud-imbalance"
      role="img"
      aria-label="Credit card fraud dataset with 284,807 transactions, including 492 fraudulent transactions, representing 0.173 percent of the data"
    >
      <div class="fraud-visual-heading">
        <p>Class distribution</p>
        <strong>Fraud is the exception.</strong>
      </div>
      <div class="fraud-dataset-total">
        <strong>284,807</strong>
        <span>transactions</span>
      </div>
      <div class="fraud-ratio-bar" aria-hidden="true">
        <span class="fraud-ratio-normal"></span>
        <span class="fraud-ratio-alert"></span>
      </div>
      <div class="fraud-class-facts">
        <div>
          <strong>284,315</strong>
          <span>Non-fraud</span>
        </div>
        <div class="is-alert">
          <strong>492</strong>
          <span>Fraud · 0.173%</span>
        </div>
      </div>
      <p class="fraud-rarity-note"><strong>≈ 1 in 579</strong> transactions is fraudulent.</p>
    </div>
  `;
}

function fraudTimelineVisualTemplate() {
  return `
    <div
      class="fraud-timeline"
      role="img"
      aria-label="Chronological split with 227,845 earlier transactions and 417 fraud cases for training, followed by 56,962 later transactions and 75 fraud cases for the final holdout"
    >
      <div class="fraud-visual-heading">
        <p>Chronological validation</p>
        <strong>Earlier activity trains. Later activity tests.</strong>
      </div>
      <div class="fraud-time-axis" aria-hidden="true">
        <div class="fraud-time-segment fraud-time-segment--train">
          <span>Train · first 80%</span>
          <strong>227,845</strong>
          <small>417 fraud cases</small>
        </div>
        <div class="fraud-time-segment fraud-time-segment--test">
          <span>Holdout · final 20%</span>
          <strong>56,962</strong>
          <small>75 fraud cases</small>
        </div>
      </div>
      <div class="fraud-time-direction" aria-hidden="true">
        <span>Past</span><b></b><span>Future</span>
      </div>
      <div class="fraud-validation-rule">
        <span>Split rule</span>
        <strong>Sort by <code>Time</code>, then split once</strong>
        <small>No random shuffle before the final evaluation.</small>
      </div>
    </div>
  `;
}

function fraudModelVisualTemplate() {
  return `
    <div
      class="fraud-model"
      role="img"
      aria-label="Feature engineering and LightGBM pipeline using ten anonymized PCA variables, logarithmic amount, sine and cosine hour features, class weighting, 95 estimators and 20 leaves"
    >
      <div class="fraud-visual-heading">
        <p>Training pipeline</p>
        <strong>13 fields enter the final model.</strong>
      </div>
      <div class="fraud-feature-groups">
        <div>
          <span>Amount</span>
          <strong>log1p</strong>
        </div>
        <div>
          <span>Transaction hour</span>
          <strong>sin + cos</strong>
        </div>
        <div>
          <span>Anonymized signals</span>
          <strong>10 PCA fields</strong>
        </div>
      </div>
      <div class="fraud-model-arrow" aria-hidden="true">↓</div>
      <div class="fraud-model-core">
        <div>
          <span>Classifier</span>
          <strong>LightGBM</strong>
        </div>
        <ul>
          <li><strong>95</strong> estimators</li>
          <li><strong>20</strong> leaves</li>
          <li><strong>Weighted</strong> classes</li>
        </ul>
      </div>
      <p class="fraud-model-output"><span>Output</span> Fraud probability from 0 to 1</p>
    </div>
  `;
}

function fraudMetricsVisualTemplate() {
  return `
    <div
      class="fraud-metrics"
      role="img"
      aria-label="Temporal holdout metrics with 0.7941 precision-recall area under the curve and 0.9555 ROC area under the curve"
    >
      <div class="fraud-metric-primary">
        <p>Primary metric</p>
        <strong>0.7941</strong>
        <span>PR-AUC</span>
      </div>
      <div class="fraud-metric-scale" aria-hidden="true">
        <span style="--metric-width: 79.41%"></span>
      </div>
      <div class="fraud-metric-secondary">
        <div>
          <strong>0.9555</strong>
          <span>ROC-AUC</span>
        </div>
        <p>Measured on the final chronological holdout.</p>
      </div>
      <div class="fraud-metric-note">
        <span>Why PR-AUC?</span>
        <strong>It exposes minority-class ranking quality.</strong>
        <small>Raw accuracy is not informative when 99.827% of transactions are non-fraud.</small>
      </div>
    </div>
  `;
}

function fraudThresholdsVisualTemplate() {
  const thresholds = [
    { label: "P80", threshold: "0.9620", precision: "0.806", recall: "0.773" },
    { label: "P85", threshold: "0.9842", precision: "0.851", recall: "0.760" },
    { label: "P90", threshold: "0.9907", precision: "0.905", recall: "0.760", selected: true },
    { label: "P95", threshold: "0.9961", precision: "0.964", recall: "0.707" }
  ];

  return `
    <div
      class="fraud-thresholds"
      role="img"
      aria-label="Four precision operating points. The selected P90 threshold is 0.9907 with 0.905 precision and 0.760 recall"
    >
      <div class="fraud-visual-heading">
        <p>Alert policy</p>
        <strong>Precision targets become thresholds.</strong>
      </div>
      <div class="fraud-threshold-table">
        <div class="fraud-threshold-header" aria-hidden="true">
          <span>Point</span><span>Threshold</span><span>Precision</span><span>Recall</span>
        </div>
        ${thresholds
          .map(
            (item) => `
              <div class="fraud-threshold-row${item.selected ? " is-selected" : ""}">
                <strong>${item.label}${item.selected ? " · selected" : ""}</strong>
                <span>${item.threshold}</span>
                <span>${item.precision}</span>
                <span>${item.recall}</span>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="fraud-threshold-verdict">
        <span>Selected operating point</span>
        <strong>90.5% precision · 76.0% recall</strong>
        <small>Approximately nine in ten alerts correspond to fraud.</small>
      </div>
    </div>
  `;
}

function fraudInferenceVisualTemplate() {
  return `
    <div
      class="fraud-inference"
      role="img"
      aria-label="Command-line fraud prediction returning probability 0.0015, a false decision, the P90 operating point and threshold 0.9907, with Pytest, Ruff and GitHub Actions validation"
    >
      <div class="fraud-terminal">
        <div class="fraud-terminal-bar" aria-hidden="true"><i></i><i></i><i></i><span>fraud-detector</span></div>
        <code><span>$</span> fraud-detect --input examples/transaction.json --operating-point p90 --pretty</code>
        <pre>{
  "fraud_probability": 0.0015187297,
  "is_fraud": false,
  "operating_point": "p90",
  "threshold": 0.9907
}</pre>
      </div>
      <div class="fraud-quality-strip">
        <div><strong>Python API</strong><span>Reusable predictor</span></div>
        <div><strong>Pytest</strong><span>Inference contract</span></div>
        <div><strong>Ruff</strong><span>Static checks</span></div>
        <div><strong>CI</strong><span>Python 3.10 + 3.12</span></div>
      </div>
    </div>
  `;
}

function fraudTransactionVisualTemplate() {
  const pcaFields = ["V10", "V11", "V12", "V14", "V15", "V16", "V17", "V25", "V27", "V28"];

  return `
    <div
      class="fraud-journey fraud-transaction"
      role="img"
      aria-label="Example transaction JSON with Amount 149.62, Time 45,600 seconds and ten anonymized PCA fields set to zero"
    >
      <div class="fraud-journey-header">
        <span>Input · 01</span>
        <strong>examples/transaction.json</strong>
      </div>
      <div class="fraud-transaction-primary">
        <div>
          <span>Amount</span>
          <strong>149.62</strong>
        </div>
        <div>
          <span>Time</span>
          <strong>45,600 <small>sec</small></strong>
        </div>
      </div>
      <div class="fraud-pca-block">
        <p>Anonymized PCA fields</p>
        <div class="fraud-pca-fields" aria-hidden="true">
          ${pcaFields.map((field) => `<span><b>${field}</b><small>0.0</small></span>`).join("")}
        </div>
      </div>
      <div class="fraud-journey-footer">
        <strong>12 raw fields</strong>
        <span>Validated before scoring</span>
      </div>
    </div>
  `;
}

function fraudFeaturesVisualTemplate() {
  return `
    <div
      class="fraud-journey fraud-features"
      role="img"
      aria-label="Feature engineering transforms Amount 149.62 into Amount log1p 5.0148, Time 45,600 into hour 12 with sine zero and cosine negative one, then orders ten PCA fields to produce thirteen model features"
    >
      <div class="fraud-journey-header">
        <span>Transform · 02</span>
        <strong>One shared feature contract</strong>
      </div>
      <div class="fraud-transform-list">
        <div class="fraud-transform-row">
          <div><span>Raw amount</span><strong>149.62</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>log1p</span><strong>5.0148</strong></div>
        </div>
        <div class="fraud-transform-row">
          <div><span>Time</span><strong>45,600</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Hour</span><strong>12</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>sin / cos</span><strong>0 / −1</strong></div>
        </div>
        <div class="fraud-transform-row">
          <div><span>PCA inputs</span><strong>10 fields</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Stored order</span><strong>V16 → V28</strong></div>
        </div>
      </div>
      <div class="fraud-feature-output">
        <span>Model input</span>
        <strong>13 ordered features</strong>
        <small>The same Python function is called during training and inference.</small>
      </div>
    </div>
  `;
}

function fraudScoreVisualTemplate() {
  return `
    <div
      class="fraud-journey fraud-score"
      role="img"
      aria-label="Thirteen ordered features enter a class-weighted LightGBM classifier with 95 estimators and 20 leaves, producing fraud probability 0.0015187297"
    >
      <div class="fraud-journey-header">
        <span>Score · 03</span>
        <strong>Features become a probability</strong>
      </div>
      <div class="fraud-score-flow">
        <div class="fraud-score-input">
          <span>Input</span>
          <strong>13</strong>
          <small>ordered fields</small>
        </div>
        <b aria-hidden="true">→</b>
        <div class="fraud-score-core">
          <span>Classifier</span>
          <strong>LightGBM</strong>
          <small>class weighted</small>
        </div>
        <b aria-hidden="true">→</b>
        <div class="fraud-score-output">
          <span>Fraud probability</span>
          <strong>0.0015</strong>
          <small>0.1519%</small>
        </div>
      </div>
      <div class="fraud-probability-scale" aria-hidden="true">
        <span class="fraud-probability-fill"></span>
        <i></i>
        <small>0</small>
        <small>1</small>
      </div>
      <div class="fraud-model-specs">
        <span><strong>95</strong> estimators</span>
        <span><strong>20</strong> leaves</span>
        <span><strong>13</strong> features</span>
      </div>
    </div>
  `;
}

function fraudDecisionVisualTemplate() {
  return `
    <div
      class="fraud-journey fraud-decision"
      role="img"
      aria-label="Fraud score 0.0015 is lower than the selected P90 threshold 0.9907, so the transaction is not flagged"
    >
      <div class="fraud-journey-header">
        <span>Decision · 04</span>
        <strong>Score compared with policy</strong>
      </div>
      <div class="fraud-decision-scale">
        <div class="fraud-decision-axis" aria-hidden="true">
          <span class="fraud-decision-score-marker"><b>Score</b><small>0.0015</small></span>
          <span class="fraud-decision-threshold-marker"><b>P90 threshold</b><small>0.9907</small></span>
        </div>
        <div class="fraud-decision-labels" aria-hidden="true"><span>0</span><span>Probability</span><span>1</span></div>
      </div>
      <div class="fraud-decision-formula">
        <span>0.0015</span>
        <b>&lt;</b>
        <span>0.9907</span>
      </div>
      <div class="fraud-decision-result">
        <span>Returned decision</span>
        <strong>Not flagged</strong>
        <small>is_fraud: false</small>
      </div>
    </div>
  `;
}

function fraudPolicyVisualTemplate() {
  const precisionDots = Array.from(
    { length: 100 },
    (_, index) => `<span class="${index < 91 ? "is-correct" : "is-error"}"></span>`
  ).join("");
  const recallDots = Array.from(
    { length: 100 },
    (_, index) => `<span class="${index < 76 ? "is-correct" : "is-missed"}"></span>`
  ).join("");

  return `
    <div
      class="fraud-journey fraud-policy"
      role="img"
      aria-label="At the P90 operating point, precision is 90.5 percent and recall is 76 percent on the chronological holdout, with overall precision-recall AUC 0.7941"
    >
      <div class="fraud-journey-header">
        <span>Policy · 05</span>
        <strong>What P90 means on the holdout</strong>
      </div>
      <div class="fraud-policy-panels">
        <section>
          <div><span>Alert precision</span><strong>90.5%</strong></div>
          <div class="fraud-policy-dots" aria-hidden="true">${precisionDots}</div>
          <small>About 91 of 100 alerts correspond to fraud.</small>
        </section>
        <section>
          <div><span>Fraud recall</span><strong>76.0%</strong></div>
          <div class="fraud-policy-dots" aria-hidden="true">${recallDots}</div>
          <small>76 of 100 fraud cases are recovered.</small>
        </section>
      </div>
      <div class="fraud-policy-summary">
        <span>Overall ranking quality</span>
        <strong>PR-AUC 0.7941</strong>
        <small>Final 20% chronological holdout · 56,962 transactions</small>
      </div>
    </div>
  `;
}

function fraudCliVisualTemplate() {
  return `
    <div
      class="fraud-journey fraud-cli"
      role="img"
      aria-label="Fraud detection command-line interface returning probability 0.0015187297, false decision, P90 operating point and threshold 0.9907"
    >
      <div class="fraud-journey-header">
        <span>Output · 06</span>
        <strong>Same transaction, same contract</strong>
      </div>
      <div class="fraud-terminal">
        <div class="fraud-terminal-bar" aria-hidden="true"><i></i><i></i><i></i><span>fraud-detector</span></div>
        <code><span>$</span> fraud-detect --input examples/transaction.json --operating-point p90 --pretty</code>
        <pre>{
  "fraud_probability": 0.0015187297,
  "is_fraud": false,
  "operating_point": "p90",
  "threshold": 0.9907
}</pre>
      </div>
      <div class="fraud-quality-strip">
        <div><strong>Python API</strong><span>Same predictor</span></div>
        <div><strong>Pytest</strong><span>Validated input</span></div>
        <div><strong>Ruff</strong><span>Static checks</span></div>
        <div><strong>CI</strong><span>Python 3.10 + 3.12</span></div>
      </div>
    </div>
  `;
}

function fraudTransactionSimpleVisualTemplate() {
  return `
    <div
      class="fraud-simple fraud-simple-transaction"
      role="img"
      aria-label="Payment transaction prepared for fraud analysis with amount 149.62, midday timing and ten anonymized behavioral signals"
    >
      <div class="fraud-simple-heading">
        <span>Incoming payment</span>
        <strong>Transaction ready for analysis</strong>
      </div>
      <div class="fraud-payment-visual" aria-hidden="true">
        <div class="fraud-payment-card"><i></i><b></b></div>
        <div class="fraud-payment-pulse"><span></span><span></span><span></span></div>
      </div>
      <div class="fraud-simple-facts">
        <div><span>Amount</span><strong>149.62</strong></div>
        <div><span>Time</span><strong>Midday</strong></div>
        <div><span>Behavior signals</span><strong>10</strong></div>
      </div>
    </div>
  `;
}

function fraudFeaturesSimpleVisualTemplate() {
  return `
    <div
      class="fraud-simple fraud-simple-profile"
      role="img"
      aria-label="Payment amount, timing context and anonymous behavioral signals are combined into one consistent transaction profile"
    >
      <div class="fraud-simple-heading">
        <span>Transaction profile</span>
        <strong>Three signal groups, one clear input</strong>
      </div>
      <div class="fraud-profile-groups">
        <div><span>01</span><strong>Purchase amount</strong><small>Value and scale</small></div>
        <div><span>02</span><strong>Timing context</strong><small>When it happened</small></div>
        <div><span>03</span><strong>Behavior signals</strong><small>Anonymous patterns</small></div>
      </div>
      <div class="fraud-profile-arrow" aria-hidden="true">↓</div>
      <div class="fraud-profile-output">
        <span>Prepared input</span>
        <strong>Consistent transaction profile</strong>
      </div>
    </div>
  `;
}

function fraudScoreSimpleVisualTemplate() {
  return `
    <div
      class="fraud-simple fraud-simple-score"
      role="img"
      aria-label="The transaction profile receives a low fraud risk score of 0.15 percent"
    >
      <div class="fraud-simple-heading">
        <span>Risk assessment</span>
        <strong>The model ranks the transaction</strong>
      </div>
      <div class="fraud-risk-result">
        <div class="fraud-risk-ring" aria-hidden="true"><span></span></div>
        <div>
          <span>Risk level</span>
          <strong>Low risk</strong>
          <small>Score: 0.15%</small>
        </div>
      </div>
      <div class="fraud-risk-scale" aria-hidden="true">
        <i></i>
        <span>Low</span><span>Review</span><span>High</span>
      </div>
      <p class="fraud-simple-note">The score describes risk. The alert policy makes the final decision.</p>
    </div>
  `;
}

function fraudDecisionSimpleVisualTemplate() {
  return `
    <div
      class="fraud-simple fraud-simple-decision"
      role="img"
      aria-label="The transaction remains in the low-risk area and does not create a fraud alert"
    >
      <div class="fraud-simple-heading">
        <span>Alert decision</span>
        <strong>Only high-risk payments are sent for review</strong>
      </div>
      <div class="fraud-decision-zones" aria-hidden="true">
        <div class="is-low"><span>Low risk</span></div>
        <div class="is-review"><span>Review</span></div>
        <div class="is-high"><span>High risk</span></div>
        <i><small>This payment</small></i>
      </div>
      <div class="fraud-simple-result">
        <span>Decision</span>
        <strong>No alert</strong>
        <small>The payment stays below the review level.</small>
      </div>
    </div>
  `;
}

function fraudPolicySimpleVisualTemplate() {
  const alertDots = Array.from(
    { length: 10 },
    (_, index) => `<span class="${index < 9 ? "is-useful" : "is-noise"}"></span>`
  ).join("");
  const fraudDots = Array.from(
    { length: 4 },
    (_, index) => `<span class="${index < 3 ? "is-found" : "is-missed"}"></span>`
  ).join("");

  return `
    <div
      class="fraud-simple fraud-simple-policy"
      role="img"
      aria-label="About nine out of ten alerts correspond to fraud and about three out of four fraud cases are detected"
    >
      <div class="fraud-simple-heading">
        <span>Final test period</span>
        <strong>A visible balance between useful alerts and recovered fraud</strong>
      </div>
      <div class="fraud-simple-policy-panels">
        <section>
          <strong>9 in 10</strong>
          <span>alerts correspond to fraud</span>
          <div class="fraud-ten-dots" aria-hidden="true">${alertDots}</div>
        </section>
        <section>
          <strong>3 in 4</strong>
          <span>fraud cases are detected</span>
          <div class="fraud-four-dots" aria-hidden="true">${fraudDots}</div>
        </section>
      </div>
      <p class="fraud-simple-note">The policy favors relevant alerts while keeping broad fraud coverage.</p>
    </div>
  `;
}

function fraudResultSimpleVisualTemplate() {
  return `
    <div
      class="fraud-simple fraud-simple-demo"
      role="img"
      aria-label="Completed transaction analysis showing low risk and no alert, with a consistent reusable result"
    >
      <div class="fraud-simple-heading">
        <span>Demonstration result</span>
        <strong>One readable outcome</strong>
      </div>
      <div class="fraud-demo-card">
        <div class="fraud-demo-status"><i></i><span>Analysis complete</span></div>
        <div class="fraud-demo-main">
          <div><span>Risk level</span><strong>Low</strong></div>
          <div><span>Decision</span><strong>No alert</strong></div>
        </div>
        <div class="fraud-demo-message">This transaction does not require manual review.</div>
      </div>
      <div class="fraud-demo-benefits">
        <span>Consistent result</span>
        <span>Reusable by an interface</span>
        <span>Tested workflow</span>
      </div>
    </div>
  `;
}

function mriSamplesVisualTemplate() {
  const samples = [
    {
      image: "assets/visuals/brain-mri-analysis/mri-sample-tumor-a.png",
      alt: "Axial brain MRI scan with a visible bright mass."
    },
    {
      image: "assets/visuals/brain-mri-analysis/mri-sample-no-tumor.png",
      alt: "Axial brain MRI scan without a visible tumor mass."
    },
    {
      image: "assets/visuals/brain-mri-analysis/mri-sample-tumor-b.png",
      alt: "Axial brain MRI scan with a large bright frontal mass."
    }
  ];

  return `
    <div class="mri-samples" aria-label="Three brain MRI scans from the classification project">
      ${samples
        .map(
          (sample, index) => `
            <div class="mri-sample${index === 0 ? " mri-sample--primary" : ""}">
              <img src="${sample.image}" alt="${sample.alt}" loading="eager" />
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function mriNetworkVisualTemplate() {
  return `
    <div
      class="mri-network"
      role="img"
      aria-label="AnyNet256 architecture with a 256 by 256 RGB input, three convolutional blocks with 32, 64 and 128 channels, flattening, dropout and one binary output"
    >
      <div class="mri-network-heading">
        <p>AnyNet256</p>
        <strong>One compact convolutional path</strong>
      </div>
      <div class="mri-network-flow" aria-hidden="true">
        <div class="mri-network-stage mri-network-stage--input">
          <span>Input</span>
          <strong>256² × 3</strong>
        </div>
        <div class="mri-network-stage mri-network-stage--conv">
          <span>Conv block</span>
          <strong>32</strong>
          <small>128²</small>
        </div>
        <div class="mri-network-stage mri-network-stage--conv">
          <span>Conv block</span>
          <strong>64</strong>
          <small>64²</small>
        </div>
        <div class="mri-network-stage mri-network-stage--conv">
          <span>Conv block</span>
          <strong>128</strong>
          <small>32²</small>
        </div>
        <div class="mri-network-stage mri-network-stage--head">
          <span>Flatten</span>
          <strong>131k</strong>
        </div>
        <div class="mri-network-stage mri-network-stage--head">
          <span>Dropout</span>
          <strong>0.3</strong>
        </div>
        <div class="mri-network-stage mri-network-stage--output">
          <span>Output</span>
          <strong>1 logit</strong>
        </div>
      </div>
      <div class="mri-network-block-key">
        <span>3×3 convolution</span>
        <span>BatchNorm</span>
        <span>ReLU</span>
        <span>2×2 MaxPool</span>
      </div>
    </div>
  `;
}

function mriGradcamVisualTemplate(step) {
  return `
    <div
      class="mri-gradcam-stack"
    >
      <img
        class="mri-gradcam-composite"
        src="${step.image}"
        alt="${step.imageAlt || "Grad-CAM comparison of four MRI classifications"}"
      />
    </div>
  `;
}

function mriResultsVisualTemplate(step) {
  const missedTumors = step.totalTumors - step.detectedTumors;
  const tumorDots = Array.from(
    { length: step.totalTumors },
    (_, index) =>
      `<span class="${index < step.detectedTumors ? "is-detected" : "is-missed"}"></span>`
  ).join("");

  return `
    <div
      class="mri-results"
      role="img"
      aria-label="${step.detectedTumors} of ${step.totalTumors} tumor images detected, ${missedTumors} missed, ${step.falseAlarms} false alarms, ${step.accuracy} accuracy, ${step.rocAuc} ROC AUC and ${step.prAuc} precision-recall AUC"
    >
      <div class="mri-result-primary">
        <p>Tumor recall</p>
        <strong>${step.detectedTumors}<span> / ${step.totalTumors}</span></strong>
        <small>tumor images detected</small>
      </div>
      <div class="mri-tumor-dots" aria-hidden="true">${tumorDots}</div>
      <div class="mri-result-facts">
        <div>
          <strong>${step.falseAlarms}</strong>
          <span>False positives</span>
        </div>
        <div>
          <strong>${step.rocAuc}</strong>
          <span>ROC AUC</span>
        </div>
        <div>
          <strong>${step.prAuc}</strong>
          <span>PR AUC</span>
        </div>
      </div>
      <div class="mri-result-verdict">
        <span>Final evaluation</span>
        <strong>${step.accuracy} accuracy</strong>
        <small>96.8% tumor recall at the selected threshold.</small>
      </div>
    </div>
  `;
}

function paperpalScreenVisualTemplate(step) {
  return `
    <div class="paperpal-screen" role="img" aria-label="${step.imageAlt || "PaperPal application interface"}">
      <div class="paperpal-screen-frame">
        <img src="${step.image}" alt="" aria-hidden="true" loading="eager" />
        ${
          step.modelOverlay
            ? `
              <div class="paperpal-model-overlay" aria-hidden="true">
                <span>Summarization model</span>
                <strong>BART-base</strong>
                <small>Scientific reading briefs</small>
              </div>
            `
            : ""
        }
      </div>
    </div>
  `;
}

function paperpalArchitectureVisualTemplate() {
  return `
    <div
      class="paperpal-future"
      role="img"
      aria-label="PaperPal future architecture with document preparation, grounded question answering through OpenAI API and a BART-base summary path"
    >
      <p>PaperPal future architecture</p>
      <section class="paperpal-future-lane paperpal-future-lane--documents">
        <h4><span>01</span> Document preparation</h4>
        <div class="paperpal-future-row">
          <div class="paperpal-future-node"><span>Input</span><strong>PDF upload</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node"><span>Parse</span><strong>Text extraction</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node paperpal-future-node--data"><span>Store</span><strong>MongoDB</strong></div>
        </div>
        <div class="paperpal-future-turn"><span>↓</span> Prepare for retrieval</div>
        <div class="paperpal-future-row">
          <div class="paperpal-future-node"><span>Chunk</span><strong>Page-aware chunks</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node"><span>Embed</span><strong>MiniLM</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node paperpal-future-node--data"><span>Index</span><strong>ChromaDB</strong></div>
        </div>
      </section>
      <section class="paperpal-future-lane paperpal-future-lane--answers">
        <h4><span>02</span> Question answering</h4>
        <div class="paperpal-future-row">
          <div class="paperpal-future-node"><span>Ask</span><strong>User question</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node"><span>ChromaDB context</span><strong>Evidence retrieval</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node paperpal-future-node--openai"><span>Generate</span><strong>OpenAI API</strong></div>
        </div>
        <div class="paperpal-future-row paperpal-future-row--output">
          <div class="paperpal-future-node"><span>Respond</span><strong>Grounded answer</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node paperpal-future-node--ui"><span>Deliver</span><strong>Streamlit UI</strong></div>
        </div>
      </section>
      <section class="paperpal-future-lane paperpal-future-lane--summary">
        <h4><span>03</span> Summary path</h4>
        <div class="paperpal-future-row">
          <div class="paperpal-future-node paperpal-future-node--data"><span>Source</span><strong>MongoDB</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node"><span>Summarize</span><strong>BART-base</strong></div>
          <b aria-hidden="true">→</b>
          <div class="paperpal-future-node paperpal-future-node--ui"><span>Deliver</span><strong>Streamlit UI</strong></div>
        </div>
      </section>
    </div>
  `;
}

function storyVisualTemplate(step) {
  if (step.visualType === "method") return methodVisualTemplate();
  if (step.visualType === "results") return resultsVisualTemplate(step);
  if (step.visualType === "forecastTimeline") return forecastTimelineVisualTemplate();
  if (step.visualType === "forecastResults") return forecastResultsVisualTemplate(step);
  if (step.visualType === "fraudTransaction") return fraudTransactionSimpleVisualTemplate();
  if (step.visualType === "fraudFeatures") return fraudFeaturesSimpleVisualTemplate();
  if (step.visualType === "fraudScore") return fraudScoreSimpleVisualTemplate();
  if (step.visualType === "fraudDecision") return fraudDecisionSimpleVisualTemplate();
  if (step.visualType === "fraudPolicy") return fraudPolicySimpleVisualTemplate();
  if (step.visualType === "fraudCli") return fraudResultSimpleVisualTemplate();
  if (step.visualType === "mriSamples") return mriSamplesVisualTemplate();
  if (step.visualType === "mriNetwork") return mriNetworkVisualTemplate();
  if (step.visualType === "mriGradcam") return mriGradcamVisualTemplate(step);
  if (step.visualType === "mriResults") return mriResultsVisualTemplate(step);
  if (step.visualType === "paperpalScreen") return paperpalScreenVisualTemplate(step);
  if (step.visualType === "paperpalArchitecture") return paperpalArchitectureVisualTemplate();

  const imageClass =
    step.imageMode === "cover"
      ? "case-study-figure-image--cover"
      : step.imageMode === "paperpalLibrary"
        ? "case-study-figure-image--paperpal-library"
      : step.imageMode === "darkContain"
        ? "case-study-figure-image--dark-contain"
      : step.imageMode === "chartBlend"
        ? "case-study-figure-image--chart-blend"
        : "";

  const imageStyles = [];
  if (step.imagePosition) imageStyles.push(`object-position: ${step.imagePosition}`);
  if (step.imageScale) imageStyles.push(`transform: scale(${step.imageScale})`);
  if (step.imageOrigin) imageStyles.push(`transform-origin: ${step.imageOrigin}`);
  const imageStyle = imageStyles.length ? ` style="${imageStyles.join("; ")};"` : "";

  return `<img class="${imageClass}" src="${step.image}" alt="${step.imageAlt || ""}" loading="eager"${imageStyle} />`;
}

function setActiveStoryStep(index) {
  const visuals = caseStudyVisualStage.querySelectorAll("[data-story-visual]");
  const chapters = caseStudyChapters.querySelectorAll("[data-story-step]");
  visuals.forEach((visual) => {
    visual.classList.toggle("is-active", Number(visual.dataset.storyVisual) === index);
  });
  chapters.forEach((chapter) => {
    chapter.classList.toggle("is-active", Number(chapter.dataset.storyStep) === index);
  });
  caseStudyProgress.style.height = `${((index + 1) / Math.max(chapters.length, 1)) * 100}%`;
}

function renderCaseStudyStory(project) {
  const story = project.story || [];
  caseStudyVisualStage.innerHTML = story
    .map(
      (step, index) => `
        <figure class="case-study-figure${
          step.imageMode === "chartBlend"
            ? " case-study-figure--chart-blend"
            : step.visualType === "mriGradcam"
              ? " case-study-figure--gradcam-blend"
              : ""
        }${index === 0 ? " is-active" : ""}" data-story-visual="${index}">
          ${storyVisualTemplate(step)}
          ${step.brand ? `<span class="case-study-figure-brand">${step.brand}</span>` : ""}
          ${step.caption ? `<figcaption>${step.caption}</figcaption>` : ""}
        </figure>
      `
    )
    .join("");

  caseStudyChapters.innerHTML = story
    .map(
      (step, index) => `
        <article class="case-study-chapter${index === 0 ? " is-active" : ""}" data-story-step="${index}">
          <p class="case-study-step">${step.eyebrow}</p>
          <h3>${step.title}</h3>
          <p>${step.body}</p>
          ${
            step.points
              ? `<ul class="case-study-business-points">${step.points
                  .map((point) => `<li>${point}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </article>
      `
    )
    .join("");

  caseStudyProgress.style.height = `${100 / Math.max(story.length, 1)}%`;
  storyObserver?.disconnect();
  storyObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleEntry) return;
      setActiveStoryStep(Number(visibleEntry.target.dataset.storyStep));
    },
    { root: caseStudyScroll, rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.6] }
  );
  caseStudyChapters.querySelectorAll("[data-story-step]").forEach((chapter) => {
    storyObserver.observe(chapter);
  });
}

function setTransitionImageRect(element, rect) {
  Object.assign(element.style, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  });
}

async function openCaseStudy(button) {
  const project = projects.find((item) => item.id === button.dataset.caseStudy);
  const sourceImage = button.closest(".project-card")?.querySelector(".project-image");
  if (!project || !sourceImage) return;

  activeCaseStudyButton = button;
  const sourceRect = sourceImage.getBoundingClientRect();

  caseStudyView.dataset.project = project.id;
  caseStudyImage.src = project.image;
  caseStudyImage.alt = project.imageAlt || "";
  caseStudyView.querySelector(".case-study-category").textContent =
    project.caseStudyCategory || project.category;
  caseStudyView.querySelector(".case-study-title").textContent =
    project.caseStudyTitle || project.title;
  caseStudyView.querySelector(".case-study-subtitle").textContent =
    project.caseStudySubtitle || project.subtitle;
  caseStudyCodeLink.href = project.repo;
  renderCaseStudyStory(project);
  caseStudyView.querySelector(".case-study-stack").innerHTML = technologyItemsTemplate(
    project.stack
  );

  caseStudyView.classList.add("is-preparing");
  caseStudyView.setAttribute("aria-hidden", "false");
  caseStudyScroll.scrollTop = 0;
  document.body.classList.add("modal-open");

  const targetRect = caseStudyHero.getBoundingClientRect();
  caseStudyTransitionImage = sourceImage.cloneNode();
  caseStudyTransitionImage.className = "case-transition-image";
  setTransitionImageRect(caseStudyTransitionImage, sourceRect);
  document.body.append(caseStudyTransitionImage);

  const animation = caseStudyTransitionImage.animate(
    [
      {
        top: `${sourceRect.top}px`,
        left: `${sourceRect.left}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
      },
      {
        top: `${targetRect.top}px`,
        left: `${targetRect.left}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`,
      },
    ],
    {
      duration: prefersReducedMotion.matches ? 1 : 680,
      easing: "cubic-bezier(0.2, 0.72, 0.18, 1)",
      fill: "forwards",
    }
  );

  await animation.finished;
  caseStudyView.classList.add("is-settled");
  caseStudyTransitionImage.remove();
  caseStudyTransitionImage = null;
  caseStudyClose.focus();
}

async function closeCaseStudy() {
  if (!activeCaseStudyButton || !caseStudyView.classList.contains("is-preparing")) return;

  const sourceImage = activeCaseStudyButton
    .closest(".project-card")
    ?.querySelector(".project-image");
  if (!sourceImage) return;
  const sourceRect = sourceImage.getBoundingClientRect();
  caseStudyScroll.scrollTop = 0;
  const targetRect = caseStudyHero.getBoundingClientRect();

  caseStudyView.classList.remove("is-settled");
  caseStudyTransitionImage = caseStudyImage.cloneNode();
  caseStudyTransitionImage.className = "case-transition-image";
  setTransitionImageRect(caseStudyTransitionImage, targetRect);
  document.body.append(caseStudyTransitionImage);

  const animation = caseStudyTransitionImage.animate(
    [
      {
        top: `${targetRect.top}px`,
        left: `${targetRect.left}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`,
      },
      {
        top: `${sourceRect.top}px`,
        left: `${sourceRect.left}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
      },
    ],
    {
      duration: prefersReducedMotion.matches ? 1 : 560,
      easing: "cubic-bezier(0.2, 0.72, 0.18, 1)",
      fill: "forwards",
    }
  );

  await animation.finished;
  caseStudyTransitionImage.remove();
  caseStudyTransitionImage = null;
  caseStudyView.classList.remove("is-preparing");
  caseStudyView.setAttribute("aria-hidden", "true");
  storyObserver?.disconnect();
  document.body.classList.remove("modal-open");
  activeCaseStudyButton.focus();
  activeCaseStudyButton = null;
}

function openVisualModal({ image, alt, title }) {
  modalTitle.textContent = title;
  modalImage.src = image;
  modalImage.alt = alt;
  visualModal.classList.add("is-open");
  visualModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  visualModal.querySelector(".visual-modal-close").focus();
}

function closeVisualModal() {
  visualModal.classList.remove("is-open");
  visualModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.removeAttribute("src");
}

function renderProjects() {
  const visibleProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.filterCategory === activeCategory);

  grid.innerHTML = visibleProjects.map(projectTemplate).join("");
  requestAnimationFrame(hydrateReveals);
}

function renderFilters() {
  filters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter-tab${category === activeCategory ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${category === activeCategory}"
          data-filter="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeCategory = button.dataset.filter;
  renderFilters();
  renderProjects();
});

grid.addEventListener("click", (event) => {
  const caseStudyButton = event.target.closest("[data-case-study]");
  if (caseStudyButton) {
    openCaseStudy(caseStudyButton);
    return;
  }

  const button = event.target.closest("[data-detail-image]");
  if (!button) return;
  openVisualModal({
    image: button.dataset.detailImage,
    alt: button.dataset.detailAlt,
    title: button.dataset.detailTitle,
  });
});

modalCloseControls.forEach((control) => {
  control.addEventListener("click", closeVisualModal);
});

caseStudyClose.addEventListener("click", closeCaseStudy);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && caseStudyView.classList.contains("is-preparing")) {
    closeCaseStudy();
    return;
  }

  if (event.key === "Escape" && visualModal.classList.contains("is-open")) {
    closeVisualModal();
  }
});

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("is-open", !expanded);
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

const observer = new IntersectionObserver(
  ([entry]) => {
    header.classList.toggle("is-scrolled", !entry.isIntersecting);
  },
  { threshold: 0.9 }
);

observer.observe(document.querySelector(".hero"));

function hydrateReveals() {
  if (!revealObserver) return;
  document
    .querySelectorAll(
      ".hero-content, .section-heading, .project-card, .about-home > *, .experience-proof, .contact > *"
    )
    .forEach((element) => {
      if (element.dataset.revealReady === "true") return;
      element.dataset.revealReady = "true";
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
}

revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
);

renderFilters();
renderProjects();
hydrateReveals();
