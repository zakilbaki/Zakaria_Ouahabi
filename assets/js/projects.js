window.portfolioProjects = [
  {
    id: "paperpal",
    title: "PaperPal",
    subtitle: "A scientific reading workspace, from PDF collection to answers with evidence.",
    cardStack: ["FastAPI", "ChromaDB", "Hugging Face"],
    overview: [
      { label: "The question", text: "How can a collection of papers become easier to explore?" },
      { label: "My contribution", text: "Document processing, summarization and a retrieval workflow." },
      { label: "The output", text: "A research workspace with a source-aware question-answering design." }
    ],
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
        title: "Less searching through PDFs. More time with the ideas.",
        body:
          "Reading one paper is manageable. Connecting findings across a growing collection is harder: the useful passage is often in a different tab or document. I designed PaperPal around that reading journey, bringing a library, summaries, comparisons and questions into one workspace.",
        points: [
          "Start with the papers relevant to a research question",
          "Build a concise overview before reading in depth",
          "Keep the source passage within reach"
        ],
        image: "assets/visuals/paperpal/paperpal-research-overload.png",
        imageAlt:
          "A research desk covered with scientific papers, annotations and connections between findings.",
        imageMode: "cover"
      },
      {
        eyebrow: "02 · Uploaded papers",
        title: "Give the reading list a home.",
        body:
          "I separated document ingestion from the reading tools. Uploaded PDFs are extracted and stored in MongoDB, so the same document can feed a summary, comparison or retrieval query. The library gives that shared foundation a simple interface.",
        image: "assets/visuals/paperpal/paperpal-library.png",
        imageAlt:
          "PaperPal document library with a PDF upload area and recently added scientific papers.",
        visualType: "paperpalScreen"
      },
      {
        eyebrow: "03 · Summarize",
        title: "Get the main ideas before diving into the detail.",
        body:
          "Summarization gives the reader a first pass through a paper. I worked with BART-base from Hugging Face for this task; the interface brings the summary depth, reading brief and extracted themes together. Document comparison extends the same workflow across papers.",
        image: "assets/visuals/paperpal/paperpal-summary.png",
        imageAlt:
          "PaperPal summary view with depth controls and a generated reading brief.",
        visualType: "paperpalScreen"
      },
      {
        eyebrow: "04 · Ask the collection",
        title: "The answer and its evidence stay on the same screen.",
        body:
          "The question-answering experience is designed around evidence, not an isolated chat reply. Page-aware chunks, embeddings, ChromaDB retrieval and reranking identify relevant passages. The answer view keeps those passages beside the response, so the reader can return to the source.",
        image: "assets/visuals/paperpal/paperpal-chatbot-detail.png",
        imageAlt:
          "PaperPal chatbot with a research question, grounded answer and supporting passages.",
        visualType: "paperpalScreen"
      },
      {
        eyebrow: "05 · Architecture direction",
        title: "One document foundation, several reading tools.",
        body:
          "The architecture keeps storage, retrieval and generation separate. FastAPI coordinates the services behind Streamlit, with Docker packaging the application. The OpenAI API extension shown here will use retrieved passages as context for answers, alongside the BART-base summarization path.",
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
    title: "Vélib Availability Forecast",
    subtitle: "Predict the bikes available in one hour, not just the bikes at the station now.",
    cardStack: ["Python", "PostgreSQL", "MLflow"],
    overview: [
      { label: "The question", text: "Will there still be a bike when a rider arrives?" },
      { label: "My contribution", text: "Station ingestion, time-aware modeling and a versioned prediction API." },
      { label: "The output", text: "A one-hour forecast evaluated on a later, held-out period." }
    ],
    caseStudyCategory: "Paris bike sharing · One-hour horizon",
    caseStudyTitle: "Vélib availability forecast",
    caseStudySubtitle:
      "Turning station snapshots into a one-hour forecast for riders and rebalancing decisions.",
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
          "Explore a rider-facing forecast concept",
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
          "I split by time rather than shuffling station records. Three hourly lags and recent changes describe each station's short-term direction. Testing on later dates checks the same question the service faces: can past observations predict the next hour?",
        visualType: "forecastTimeline"
      },
      {
        eyebrow: "04 · From model to service",
        title: "The forecast became a versioned API service.",
        body:
          "I built the path beyond the notebook: validated CityBikes snapshots in PostgreSQL, hourly features, experiments tracked in MLflow, and predictions served through FastAPI. A model must be explicitly promoted before it is served. Docker Compose runs the database and API together.",
        image: "assets/visuals/project-velib-architecture.png",
        imageAlt:
          "Architecture diagram from CityBikes ingestion through PostgreSQL and MLflow to a promoted model served by FastAPI."
      },
      {
        eyebrow: "05 · Chronological test",
        title: "The forecast missed by about two bikes on average.",
        body:
          "On the held-out future period, Gradient Boosting achieved a mean absolute error of 1.97 bikes, RMSE of 2.82 and R² of 0.94. Reporting the error in bikes makes the result tangible: this is the gap between predicted and observed station availability, averaged over that test period.",
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
    subtitle: "Classify brain MRI scans, then inspect the image regions behind the prediction.",
    cardStack: ["Python", "PyTorch", "Grad-CAM"],
    overview: [
      { label: "The question", text: "Can an image classifier distinguish tumor-present MRI scans?" },
      { label: "My contribution", text: "CNN training, threshold evaluation and Grad-CAM interpretation." },
      { label: "The output", text: "A binary classifier with visual analysis of its predictions." }
    ],
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
    stack: ["Python", "PyTorch", "Grad-CAM", "Kaggle"],
    story: [
      {
        eyebrow: "01 · The problem",
        title: "Can a neural network recognize tumor patterns in brain MRI scans?",
        body:
          "Brain MRI scans contain spatial patterns that are difficult to capture with hand-written rules. I trained a convolutional neural network to distinguish tumor-present from no-tumor images, then used Grad-CAM to inspect which regions influenced its scores.",
        visualType: "mriSamples"
      },
      {
        eyebrow: "02 · Neural network",
        title: "Learn image patterns, layer by layer.",
        body:
          "I used AnyNet256, a compact CNN built in PyTorch. Three convolutional blocks turn a 256×256 image into progressively richer features before a binary output. Batch normalization, pooling and dropout support training without making the architecture difficult to inspect.",
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
          "I reviewed correct and incorrect predictions side by side. Grad-CAM projects the final convolutional activations back onto each scan, highlighting regions associated with the score. This turns an aggregate metric into individual cases that can be examined and compared.",
        visualType: "mriGradcam",
        image: "assets/visuals/brain-mri-analysis/gradcam-composite.png",
        imageAlt:
          "True-positive, true-negative, false-positive and false-negative brain MRI scans shown above their Grad-CAM overlays."
      },
      {
        eyebrow: "06 · Validation result",
        title: "Thirty of thirty-one tumor images were detected.",
        body:
          "On the 51-image validation split, the selected threshold detected 30 of 31 tumor-present scans: 96.8% recall and 88% overall accuracy. ROC AUC of 0.937 and PR AUC of 0.960 describe ranking across thresholds; the confusion matrix shows the decisions at the chosen operating point.",
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
    subtitle: "Turn rare fraud signals into a prioritized, measurable review policy.",
    cardStack: ["Python", "LightGBM", "Scikit-learn"],
    overview: [
      { label: "The question", text: "Which transactions deserve attention when fraud is rare?" },
      { label: "My contribution", text: "Feature engineering, temporal evaluation and alert-policy analysis." },
      { label: "The output", text: "A tested LightGBM predictor with reusable inference and explicit thresholds." }
    ],
    caseStudyCategory: "Payment risk · Imbalanced classification",
    caseStudyTitle: "Credit card fraud detection",
    caseStudySubtitle:
      "Balancing fraud detection with the cost of unnecessary transaction reviews.",
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
        eyebrow: "01 · The business problem",
        title: "Find suspicious payments without flooding the review queue.",
        body:
          "Most payments are legitimate. An effective fraud model has to identify rare suspicious activity while keeping unnecessary reviews manageable. I framed this as a ranking and alert-policy problem, using transaction amount, timing and anonymized signals. The payment shown is an illustrative example.",
        visualType: "fraudTransaction"
      },
      {
        eyebrow: "02 · Transaction profile",
        title: "Make each transaction comparable.",
        body:
          "I transformed payment amount and encoded cyclical time features alongside the anonymized inputs. A class-weighted LightGBM model learns from this representation. The same feature preparation is reused at prediction time, so training and inference stay consistent.",
        visualType: "fraudFeatures"
      },
      {
        eyebrow: "03 · Temporal evaluation",
        title: "Learn from earlier payments. Test on later ones.",
        body:
          "I kept the final chronological holdout separate from earlier transactions. This evaluates ranking on later activity rather than a shuffled mixture. The repository reports PR-AUC of 0.7941 and ROC-AUC of 0.9555 on that holdout, with precision-recall analysis central to the evaluation.",
        visualType: "fraudTimeline"
      },
      {
        eyebrow: "04 · Alert decision",
        title: "A score is not yet a decision.",
        body:
          "The alert threshold determines how many transactions are sent for review. I documented four operating points so the policy is explicit rather than hidden behind a default cutoff. In this illustrative low-score example, the selected policy produces no alert.",
        visualType: "fraudDecision"
      },
      {
        eyebrow: "05 · Policy performance",
        title: "About nine out of ten alerts correspond to fraud.",
        body:
          "The reported P90 operating point achieves 90.5% precision and 76.0% recall on the final test period. In practical terms, about nine in ten alerts correspond to fraud, while around three quarters of fraudulent transactions are recovered. These two measures describe review quality and coverage together.",
        visualType: "fraudPolicy"
      },
      {
        eyebrow: "06 · Reusable inference",
        title: "The model leaves the notebook with a clear contract.",
        body:
          "I packaged prediction behind a Python API and command-line interface, with saved model metadata, tests and continuous integration. The output includes a score and an alert decision, giving another application a consistent result to consume.",
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
    subtitle: "Use production sensor traces to prioritize starter motors for quality inspection.",
    cardStack: ["Python", "Scikit-learn", "Pandas"],
    overview: [
      { label: "The question", text: "Which motors should receive additional inspection first?" },
      { label: "My contribution", text: "Process-feature analysis and a leakage-aware classification baseline." },
      { label: "The output", text: "Interpretable risk scores evaluated in production order." }
    ],
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
    stack: ["Python", "Scikit-learn", "Elastic Net", "Pandas", "Ruff", "Pytest", "CI"],
    story: [
      {
        eyebrow: "01 · Business problem",
        title: "Find the risky motor before the final test.",
        body:
          "Valeo's challenge follows starter motors through an assembly line. Each station records process measurements such as torque, angle, force, current and voltage. The objective is to rank products by defect risk early enough for the quality team to inspect the right units sooner.",
        points: [
          "Business objective: identify issues earlier",
          "Potential value: avoid late rework and scrap",
          "Decision supported: prioritize additional inspection"
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
          "I used PCA to explore the structure of the sensor measurements. In this two-dimensional projection, defective and normal motors overlap. That observation motivated looking beyond the raw measurements to process features and recent production history.",
        image: "assets/visuals/defect-analysis/pca-raw-sensors.png",
        imageAlt: "Two-dimensional PCA projection comparing normal and defective production samples.",
        caption: "PCA projection · normal versus defective products"
      },
      {
        eyebrow: "04 · Select useful signals",
        title: "Turn process measurements into useful signals.",
        body:
          "Feature ranking helped me investigate missingness, process timing, torque and force. The baseline combines process features with rolling statistics computed only from earlier products, then applies imputation, robust scaling and class-weighted Elastic Net. That ordering keeps future measurements out of the prediction.",
        image: "assets/visuals/defect-analysis/mutual-information.png",
        imageAlt: "Horizontal bar chart ranking the twenty most informative production features.",
        caption: "Top 20 features by mutual information"
      },
      {
        eyebrow: "05 · Final result",
        title: "The model detected 29 of 42 defective motors.",
        body:
          "On the chronological test, the selected threshold identifies 29 of 42 defects, with AUROC of 0.6979. It also flags 1,415 non-defective motors. Framing the output as an inspection-priority score makes the business decision explicit: direct quality teams toward higher-risk units, rather than automatically rejecting production.",
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
