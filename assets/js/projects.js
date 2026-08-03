window.portfolioProjects = [
  {
    id: "paperpal",
    title: "PaperPal",
    subtitle: "Upload, summarize, compare and question scientific papers",
    caseStudyCategory: "Scientific documents · RAG",
    caseStudyTitle: "PaperPal",
    caseStudySubtitle:
      "A research workspace that turns scientific PDFs into summaries, comparisons and grounded answers.",
    category: "Documents",
    filterCategory: "AI systems",
    layout: "panorama",
    status: "End-to-end RAG",
    image: "assets/visuals/paperpal/paperpal-ai-assistant-cover.png",
    imageAlt:
      "AI research assistant assembled from scientific paper fragments and connected to highlighted evidence passages.",
    caseStudyDemo: true,
    detailImage: "assets/visuals/paperpal/paperpal-chatbot-detail.png",
    detailAlt: "PaperPal chatbot interface with an active scientific paper, conversation and three cited evidence passages.",
    detailTitle: "PaperPal scientific document chatbot",
    imageActionLabel: "Open the chatbot interface",
    repo: "https://github.com/zakilbaki/paperpal-rag-assistant",
    stack: ["OpenAI API", "FastAPI", "Streamlit", "MongoDB", "ChromaDB", "Hugging Face", "Docker"],
    story: [
      {
        eyebrow: "01 · The research problem",
        title: "Scientific papers are difficult to explore across multiple documents.",
        body:
          "PaperPal brings scientific PDFs into one research workspace. Users can upload papers, build a searchable library and move from document collection to focused reading without switching between disconnected tools.",
        points: [
          "Understand a growing collection of papers without reading in isolation",
          "Connect recurring concepts, findings and evidence across documents",
          "Move from a research question to the most relevant passages"
        ],
        image: "assets/visuals/paperpal/paperpal-research-overload.png",
        imageAlt:
          "A research desk covered with scientific papers, annotations and connections between findings.",
        imageMode: "cover"
      },
      {
        eyebrow: "02 · Uploaded papers",
        title: "The library keeps every uploaded paper in view.",
        body:
          "Start by uploading the papers that belong to the research question. The library confirms which documents are ready and keeps each one available for summarization or conversation.",
        image: "assets/visuals/paperpal/paperpal-library.png",
        imageAlt:
          "PaperPal document library with a PDF upload area and recently added scientific papers.",
        visualType: "paperpalScreen"
      },
      {
        eyebrow: "03 · Summarize",
        title: "A full paper becomes a configurable reading brief.",
        body:
          "Select a document and choose the level of detail. The complete summary interface keeps the controls, generated brief and extracted themes together on the same screen.",
        image: "assets/visuals/paperpal/paperpal-summary.png",
        imageAlt:
          "PaperPal summary view with depth controls and a generated reading brief.",
        visualType: "paperpalScreen",
        modelOverlay: true
      },
      {
        eyebrow: "04 · Ask the collection",
        title: "The answer and its evidence stay on the same screen.",
        body:
          "Choose a paper, ask a question and continue the conversation. The complete interface places the generated answer beside the passages that support it.",
        image: "assets/visuals/paperpal/paperpal-chatbot-detail.png",
        imageAlt:
          "PaperPal chatbot with a research question, grounded answer and supporting passages.",
        visualType: "paperpalScreen"
      },
      {
        eyebrow: "05 · Application architecture",
        title: "One upload feeds every PaperPal workflow.",
        body:
          "After text extraction, MongoDB stores the document. One path prepares page-aware chunks and MiniLM embeddings for ChromaDB. Questions retrieve that evidence before OpenAI generates a grounded answer, while BART-base produces the summary view.",
        visualType: "paperpalArchitecture"
      }
    ],
    question:
      "How do you turn a raw scientific PDF into something useful without losing the trace of the source document?",
    highlights: [
      "Built a web application for uploading, summarizing, comparing and questioning scientific papers.",
      "Fine-tuned BART-base and developed a RAG workflow combining PDF extraction, prompting, embeddings, ChromaDB vector search and reranking.",
      "Integrated OpenAI API, FastAPI, Streamlit, MongoDB and Docker in a modular architecture designed for testing and maintenance."
    ],
    evidence:
      "The animated visual now follows the real product workflow from the library to summary, comparison and a frontend chatbot with visible evidence.",
    next:
      "Connect the new chatbot composer to a generated-answer endpoint, then evaluate answer faithfulness and citation precision."
  },
  {
    id: "velib-demand-forecasting",
    title: "Velib Demand Forecasting",
    subtitle: "Forecast and serve short-horizon bike availability",
    caseStudyCategory: "Paris bike sharing · One-hour horizon",
    caseStudyTitle: "Vélib availability forecast",
    caseStudySubtitle:
      "An end-to-end machine learning system built from live station snapshots, time-aware features and a promoted API model.",
    category: "Time series",
    filterCategory: "Forecasting",
    layout: "standard",
    status: "Forecasting system",
    image: "assets/visuals/project-velib-photo.webp",
    imageAlt: "Green Velib bicycles docked at a station in Paris.",
    caseStudyDemo: true,
    detailImage: "assets/visuals/project-velib-architecture.png",
    detailAlt: "Architecture diagram from CityBikes ingestion to PostgreSQL, MLflow, model serving and FastAPI.",
    detailTitle: "Velib forecasting architecture",
    imageActionLabel: "Open forecasting architecture",
    repo: "https://github.com/zakilbaki/velib-demand-forecasting",
    stack: ["Python", "PostgreSQL", "MLflow", "FastAPI", "Docker Compose", "Gradient Boosting"],
    story: [
      {
        eyebrow: "01 · Business problem",
        title: "Current availability is already becoming outdated.",
        body:
          "A rider can see bikes at a station now and still arrive to an empty dock. A one-hour forecast gives users a more useful view of near-term availability and gives operations teams an earlier signal for station rebalancing.",
        points: [
          "Make future availability visible to riders",
          "Anticipate empty or saturated stations",
          "Support short-horizon rebalancing decisions"
        ],
        image: "assets/visuals/velib-analysis/station-forecast-map.png",
        imageAlt:
          "Map of central Paris with a selected Velib station showing 12 available bikes now and 18 predicted in one hour."
      },
      {
        eyebrow: "02 · Understand demand",
        title: "Bike availability follows the rhythm of the day.",
        body:
          "Aggregating station snapshots by hour reveals a clear daily pattern. The current state and next-hour target move together, but the gap changes around the sharpest transitions. Those shifts are precisely where a short-horizon model has to add value.",
        image: "assets/visuals/velib-analysis/hourly-availability.png",
        imageAlt:
          "Line chart comparing average current and next-hour bike availability across the 24 hours of the day."
      },
      {
        eyebrow: "03 · Time-aware validation",
        title: "The future never enters the training window.",
        body:
          "The model learns from earlier station states and is evaluated on later dates. For each station, three hourly lags and recent deltas reconstruct its short-term direction without using information that would be unavailable at prediction time.",
        visualType: "forecastTimeline"
      },
      {
        eyebrow: "04 · From model to service",
        title: "The forecast became a versioned API service.",
        body:
          "CityBikes snapshots are validated and stored in PostgreSQL, transformed into hourly features, tracked through MLflow and promoted explicitly before FastAPI serves them. Docker Compose keeps the database and API reproducible together.",
        image: "assets/visuals/project-velib-architecture.png",
        imageAlt:
          "Architecture diagram from CityBikes ingestion through PostgreSQL and MLflow to a promoted model served by FastAPI."
      },
      {
        eyebrow: "05 · Chronological test",
        title: "The forecast missed by about two bikes on average.",
        body:
          "On the held-out future period, the Gradient Boosting model reached a 1.97-bike mean absolute error, 2.82 RMSE and 0.94 R². That supports short-horizon guidance, while broader seasonal validation remains necessary before operational deployment.",
        visualType: "forecastResults",
        mae: "1.97",
        rmse: "2.82",
        r2: "0.94",
        horizon: "+1 hour"
      }
    ],
    question:
      "How do you turn CityBikes snapshots into predictions available through an API, with a reproducible workflow?",
    built: [
      "Snapshot ingestion, validation, PostgreSQL storage and station-level time features built from historical states.",
      "Training with chronological validation, MLflow tracking and explicit promotion of the served model.",
      "FastAPI service with health and prediction endpoints, orchestrated with Docker Compose around the API and PostgreSQL services."
    ],
    evidence:
      "The cover shows the user-facing prediction idea. Click it to inspect the full path from CityBikes to PostgreSQL, MLflow and FastAPI.",
    next:
      "Add a real API capture or a small station-level prediction dashboard."
  },
  {
    id: "brain-tumor-detection",
    title: "Brain Tumor Detection",
    subtitle: "Classify MRI scans while inspecting model attention",
    caseStudyCategory: "Medical imaging · Deep learning",
    caseStudyTitle: "Brain tumor detection",
    caseStudySubtitle:
      "A compact CNN that classifies brain MRI scans and makes its decisions visible through Grad-CAM.",
    category: "Computer vision",
    filterCategory: "Computer vision",
    layout: "standard",
    status: "CNN + Grad-CAM",
    image: "assets/visuals/brain-mri-analysis/mri-gradcam-cover.png",
    imageAlt: "Editorial comparison of a brain MRI scan and its Grad-CAM activation map.",
    caseStudyDemo: true,
    repo: "https://github.com/zakilbaki/brain_tumor_detection",
    stack: ["PyTorch", "CNN", "Grad-CAM", "ROC", "PR curve", "Kaggle"],
    story: [
      {
        eyebrow: "01 · The problem",
        title: "Can a neural network recognize tumor patterns in brain MRI scans?",
        body:
          "Brain MRI scans contain complex spatial patterns. I built a binary image-classification workflow that learns to distinguish tumor-present from no-tumor cases and exposes the visual evidence behind its predictions.",
        visualType: "mriSamples"
      },
      {
        eyebrow: "02 · Neural network",
        title: "AnyNet256 keeps the architecture compact and inspectable.",
        body:
          "A 256×256 RGB input passes through three convolutional blocks with BatchNorm, ReLU and MaxPool. The channel depth grows from 32 to 128 while spatial resolution falls to 32×32, before dropout and a single binary logit.",
        image: "assets/visuals/brain-mri-analysis/mri-network-visual-v1.png",
        imageAlt:
          "Brain MRI flowing through three convolutional feature groups, a dense layer and a binary output.",
        imageMode: "darkContain"
      },
      {
        eyebrow: "03 · Decision threshold",
        title: "The threshold defines a recall-focused operating point.",
        body:
          "At the selected 0.282 threshold, the model catches 30 of 31 tumor images and misses one, while five no-tumor images are flagged. This operating point prioritizes tumor recall while keeping every false alert visible in the evaluation.",
        image: "assets/visuals/brain-mri-analysis/confusion-matrix.png",
        imageAlt:
          "Confusion matrix with 15 true negatives, 5 false positives, 1 false negative and 30 true positives.",
        imageMode: "chartBlend"
      },
      {
        eyebrow: "04 · Ranking quality",
        title: "Precision remains high as recall increases.",
        body:
          "The precision-recall curve reaches 0.960 area under the curve. It shows how the classifier maintains strong precision while recovering more tumor-present images across decision thresholds.",
        image: "assets/visuals/brain-mri-analysis/precision-recall.png",
        imageAlt: "Precision-recall curve with an area under the curve of 0.960.",
        imageMode: "chartBlend"
      },
      {
        eyebrow: "05 · Model attention",
        title: "Grad-CAM makes each decision inspectable.",
        body:
          "Activations from the final convolutional layer are projected back onto true-positive, true-negative, false-positive and false-negative scans. The resulting heatmaps reveal which image regions contributed most strongly to each decision.",
        visualType: "mriGradcam",
        image: "assets/visuals/brain-mri-analysis/gradcam-composite.png",
        imageAlt:
          "True-positive, true-negative, false-positive and false-negative brain MRI scans shown above their Grad-CAM overlays."
      },
      {
        eyebrow: "06 · Validation result",
        title: "Thirty of thirty-one tumor images were detected.",
        body:
          "The selected operating point reaches 88% accuracy and 96.8% tumor recall, with 0.937 ROC AUC and 0.960 PR AUC. Together, these measures show strong class separation and a recall-focused decision strategy.",
        visualType: "mriResults",
        detectedTumors: 30,
        totalTumors: 31,
        falseAlarms: 5,
        accuracy: "88%",
        rocAuc: "0.937",
        prAuc: "0.960"
      }
    ],
    question:
      "How do you train a lightweight CNN on MRI scans while checking where the model pays attention?",
    built: [
      "A family of AnyNet CNNs trained on a Kaggle dataset with stratified split and training transforms.",
      "Evaluation through confusion matrix, ROC, precision-recall and false positive or false negative analysis.",
      "Grad-CAM to visualize the regions influencing the model decision."
    ],
    evidence:
      "The visual uses repository artifacts: true positives, true negatives, false positives, false negatives and Grad-CAM overlays.",
    next:
      "Document the medical limits, dataset size and validation protocol more cleanly."
  },
  {
    id: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection",
    subtitle: "Rank rare fraudulent transactions with a temporal LightGBM pipeline",
    caseStudyCategory: "Payment risk · Imbalanced classification",
    caseStudyTitle: "Credit card fraud detection",
    caseStudySubtitle:
      "Follow a payment from its transaction profile to a risk level and an alert decision.",
    category: "Risk modeling",
    filterCategory: "Classification",
    layout: "standard",
    status: "LightGBM + temporal validation",
    image: "assets/visuals/credit-card-fraud/credit-card-fraud-hero-v1.png",
    imageAlt:
      "Anonymous credit card above a payment terminal, surrounded by transaction flows with one coral fraud signal.",
    caseStudyDemo: true,
    repo: "https://github.com/zakilbaki/credit_card_fraud-",
    stack: ["Python", "LightGBM", "Pandas", "NumPy", "Scikit-learn", "Pytest", "CI"],
    story: [
      {
        eyebrow: "01 · Incoming transaction",
        title: "A payment enters the fraud detection workflow.",
        body:
          "The demonstration starts with a payment amount, its timing and a group of anonymized behavioral signals. Together, they describe the transaction without exposing personal or banking information.",
        visualType: "fraudTransaction"
      },
      {
        eyebrow: "02 · Transaction profile",
        title: "The raw information becomes a consistent transaction profile.",
        body:
          "Amount, timing and behavioral signals are prepared in the same way for every payment. This gives the model a stable representation that can be compared with patterns learned from previous transactions.",
        visualType: "fraudFeatures"
      },
      {
        eyebrow: "03 · Risk assessment",
        title: "The model estimates how suspicious the transaction looks.",
        body:
          "Instead of immediately accepting or rejecting a payment, the model first produces a risk score. The example transaction receives a very low score, placing it close to normal payment behavior.",
        visualType: "fraudScore"
      },
      {
        eyebrow: "04 · Alert decision",
        title: "The alert policy decides whether a review is needed.",
        body:
          "The risk score is compared with the selected alert level. Here, the score remains in the low-risk area, so the system returns the transaction without creating a fraud alert.",
        visualType: "fraudDecision"
      },
      {
        eyebrow: "05 · Policy performance",
        title: "About nine out of ten alerts correspond to fraud.",
        body:
          "On the final test period, the selected policy keeps most alerts relevant while recovering roughly three quarters of fraudulent transactions. This makes the balance between missed fraud and unnecessary reviews visible.",
        visualType: "fraudPolicy"
      },
      {
        eyebrow: "06 · Demonstration result",
        title: "The workflow returns a simple result that another interface can reuse.",
        body:
          "Each analyzed transaction returns its risk level and alert decision in a consistent format. The underlying project remains tested and versioned, while the demonstration presents only the information a user needs to understand the outcome.",
        visualType: "fraudCli"
      }
    ],
    question:
      "How do you rank extremely rare fraudulent transactions without leaking future observations into model evaluation?",
    built: [
      "Chronological train and holdout split for leakage-aware evaluation.",
      "Feature engineering for amount and cyclical time, followed by a class-weighted LightGBM classifier.",
      "Saved model metadata, Python inference API, command-line prediction, tests and continuous integration."
    ],
    evidence:
      "The repository reports a 0.7941 PR-AUC, 0.9555 ROC-AUC and four documented precision-recall operating points on the temporal holdout.",
    next:
      "Add probability calibration, drift monitoring and an alert-capacity analysis before considering live payment decisions."
  },
  {
    id: "industrial-defect-prediction",
    title: "Industrial Defect Prediction",
    subtitle: "Prioritize high-risk starter motors before final quality control",
    caseStudyCategory: "Valeo Challenge Data #36",
    caseStudyTitle: "Detecting defective starter motors earlier",
    caseStudySubtitle:
      "A machine learning case study for ranking production risk before end-of-line quality control.",
    category: "Industrial ML",
    filterCategory: "Industrial data",
    layout: "feature",
    status: "Validation",
    image: "assets/visuals/project-defect-cover.jpg",
    imageAlt: "An industrial production floor with connected manufacturing machines.",
    caseStudyDemo: true,
    repo: "https://github.com/zakilbaki/industrial-defect-prediction",
    stack: ["Scikit-learn", "Elastic Net", "Pandas", "Ruff", "Pytest", "CI"],
    story: [
      {
        eyebrow: "01 · Business problem",
        title: "Find the risky motor before the final test.",
        body:
          "Valeo's challenge follows starter motors through an assembly line. Each station records process measurements such as torque, angle, force, current and voltage. The objective is to rank products by defect risk early enough for the quality team to inspect the right units sooner.",
        points: [
          "Reduce late rework and scrap",
          "Lower pressure on end-of-line testing",
          "Focus inspection on high-risk units"
        ],
        image: "assets/visuals/defect-analysis/valeo-context.jpg",
        imageAlt: "A Valeo employee walking past a large Valeo automotive technology display.",
        imageMode: "cover"
      },
      {
        eyebrow: "02 · Understand the target",
        title: "Defects are rare, and their rate moves over time.",
        body:
          "Only 0.88% of labeled products are defective, so a model predicting every motor as normal would look accurate while being useless. The daily view also shows that risk is not constant across the production sequence.",
        image: "assets/visuals/defect-analysis/defect-rate-by-day.png",
        imageAlt: "Line chart showing the average defect rate by day of the month.",
        caption: "Average defect rate by production day"
      },
      {
        eyebrow: "03 · Explore separability",
        title: "The defective class does not form a clean cluster.",
        body:
          "PCA compresses the sensor measurements into two dimensions. Defective motors remain mixed with normal production, which explains why a simple visual rule or single threshold cannot solve the problem.",
        image: "assets/visuals/defect-analysis/pca-raw-sensors.png",
        imageAlt: "Two-dimensional PCA projection comparing normal and defective production samples.",
        caption: "PCA projection · normal versus defective products"
      },
      {
        eyebrow: "04 · Select useful signals",
        title: "A small group of measurements carries most of the information.",
        body:
          "Mutual information ranks the measurements that contribute most to separating the target. Missingness, process timing and selected torque or force measurements become candidates for a compact, interpretable model.",
        image: "assets/visuals/defect-analysis/mutual-information.png",
        imageAlt: "Horizontal bar chart ranking the twenty most informative production features.",
        caption: "Top 20 features by mutual information"
      },
      {
        eyebrow: "05 · Final result",
        title: "The model detected 29 of 42 defective motors.",
        body:
          "At the selected threshold, the model catches 69% of the defects on the chronological test. The 1,415 false alarms are still too costly for automatic rejection, so the realistic business use is ranking motors for targeted additional inspection.",
        visualType: "results",
        detectedDefects: 29,
        totalDefects: 42,
        falseAlarms: 1415,
        auroc: "0.6979",
        caption: "Final chronological test"
      }
    ],
    question:
      "How do you build an industrial defect baseline when the positive class is rare and leakage is easy?",
    built: [
      "Parsing production measurements, process features and rolling variables computed from past data only.",
      "Chronological validation, imputation, robust scaling and an interpretable class-weighted linear baseline.",
      "Tests focused on chronology and an explicit distinction between exploration and reproducible scoring."
    ],
    evidence:
      "The proof is the leakage-aware protocol: past-only rolling features, chronological validation and tests around the risky parts of the pipeline.",
    next:
      "Add a validation flow diagram and a short notebook focused on error reading."
  }
];
