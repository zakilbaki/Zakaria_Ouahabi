window.portfolioProjects = [
  {
    "id": "fraud-investigation",
    "title": "Fraud Investigation",
    "subtitle": "A multi-agent investigation system combining transaction evidence, fraud scoring and cited policy guidance.",
    "category": "Agentic AI · Financial crime",
    "filterCategory": "AI systems",
    "cardStack": [
      "Copilot Studio",
      "FastAPI",
      "Python"
    ],
    "stack": [
      "Microsoft Copilot Studio",
      "Python",
      "FastAPI",
      "CatBoost",
      "SQLite",
      "RAG",
      "Pydantic"
    ],
    "caseStudyDemo": true,
    "caseStudyCategory": "Financial crime · Agentic AI",
    "caseStudyTitle": "Fraud Investigation",
    "caseStudySubtitle": "Transaction evidence, model scores and cited procedures. One investigation workflow.",
    "image": "assets/visuals/fraud-investigation/cover-editorial-v2.jpg",
    "imageAlt": "Illustrative financial investigation scene with a magnifying glass over transaction statements, highlighted amounts and a laptop displaying charts.",
    "repo": "https://github.com/zakilbaki/fraud-investigation",
    "overview": [
      {
        "label": "The question",
        "text": "How can an analyst investigate a transaction with traceable evidence and clear policy guidance?"
      },
      {
        "label": "My contribution",
        "text": "Multi-agent orchestration, bounded Python tools, temporal ML scoring and evidence persistence."
      },
      {
        "label": "The output",
        "text": "An investigation workflow that keeps operational findings, model scores and procedures in context."
      }
    ],
    "story": [
      {
        "eyebrow": "01 · Demo",
        "title": "See the investigation in action.",
        "body": "Watch transaction lookup, recipient history, model scoring and alert interpretation in Copilot Studio, using synthetic PaySim data.",
        "image": "assets/visuals/fraud-investigation/demo.gif",
        "imageAlt": "Animated demonstration of a transaction investigation in Copilot Studio.",
        "enlarge": false
      },
      {
        "eyebrow": "02 · Architecture",
        "title": "Two specialists. One investigation.",
        "body": "I built a Coordinator that routes analyst requests to two specialists. The Investigator calls authenticated Python APIs; the Policy Agent retrieves versioned procedures with rule citations. The Coordinator preserves identifiers, scope and tool failures across handoffs.",
        "visualType": "investigation",
        "scene": "architecture",
        "image": "assets/visuals/fraud-investigation/architecture.svg",
        "imageAlt": "Coordinator connected to the Fraud Investigator and authenticated Python APIs, and to the Investigation Policy Agent and versioned policy corpus.",
        "points": [
          "Operational requests call bounded tools; policy-only questions do not access transactions.",
          "Mixed requests pass evidence to the Policy Agent before synthesis."
        ]
      },
      {
        "eyebrow": "03 · Agent evaluation",
        "title": "Test the routing, not just the answer.",
        "body": "The repository documents 20 independent scenarios: policy, operational, mixed, and clarification or capability-boundary requests. Expected routing, answer correctness and task completion are assessed separately. The scenario count is not a measured pass rate.",
        "visualType": "agentEvaluation"
      },
      {
        "eyebrow": "04 · Results",
        "title": "A measured fraud signal.",
        "body": "Scoring is one tool in the investigation. The frozen CatBoost model recorded 98.69% precision and 84.49% recall on 298,584 synthetic PaySim transactions. These ML metrics are separate from agent-routing evaluation.",
        "visualType": "investigation",
        "scene": "results"
      },
      {
        "eyebrow": "05 · Case record",
        "title": "Keep the evidence reviewable.",
        "body": "Saving a case, recording checks and generating reports each require an explicit request. Stable retry keys protect writes; execution IDs connect evidence to versioned JSON and Markdown reports. The analyst retains the decision.",
        "visualType": "investigation",
        "scene": "record"
      }
    ],
    "group": "Featured Systems"
  },
  {
    "id": "paperpal",
    "title": "PaperPal",
    "subtitle": "Scientific retrieval with page citations, hybrid reranking and a bounded evidence context.",
    "cardStack": [
      "FastAPI",
      "ChromaDB",
      "Hugging Face"
    ],
    "overview": [
      {
        "label": "The question",
        "text": "How do you retrieve the right evidence without losing its page and source?"
      },
      {
        "label": "My contribution",
        "text": "Indexing, hybrid reranking, citation context and a local retrieval evaluation."
      },
      {
        "label": "The output",
        "text": "A cited-context API, alongside the broader reading experience shown in the product demos."
      }
    ],
    "caseStudyCategory": "Scientific documents · RAG",
    "caseStudyTitle": "PaperPal",
    "caseStudySubtitle": "From scientific PDFs to the passages behind an answer.",
    "category": "Documents",
    "filterCategory": "AI systems",
    "layout": "panorama",
    "status": "Scientific RAG",
    "image": "assets/visuals/paperpal/paperpal-ai-assistant-cover.jpg",
    "imageAlt": "AI research assistant assembled from scientific paper fragments and connected to highlighted evidence passages.",
    "caseStudyDemo": true,
    "detailImage": "assets/visuals/paperpal/paperpal-chatbot-detail.png",
    "detailAlt": "PaperPal chatbot interface with an active scientific paper, conversation and three cited evidence passages.",
    "detailTitle": "PaperPal scientific document chatbot",
    "imageActionLabel": "Open the chatbot interface",
    "repo": "https://github.com/zakilbaki/paperpal-rag-assistant",
    "stack": [
      "FastAPI",
      "Streamlit",
      "MongoDB",
      "ChromaDB",
      "Hugging Face",
      "Docker"
    ],
    "story": [
      {
        "eyebrow": "01 · Document library",
        "title": "Give the reading list a home.",
        "body": "The product library brings uploaded papers, summaries and comparisons together. The reproducible retrieval implementation stores text, page boundaries and chunks in MongoDB, with a rebuildable Chroma vector index.",
        "image": "assets/visuals/paperpal/paperpal-library.png",
        "imageAlt": "PaperPal document library with a PDF upload area and recently added scientific papers.",
        "visualType": "paperpalScreen"
      },
      {
        "eyebrow": "02 · Retrieval architecture",
        "title": "Retrieve evidence before composing an answer.",
        "body": "Page-aware, sentence-aware chunks preserve offsets and citation metadata in MongoDB. MiniLM embeds the chunks into a persistent Chroma index. FastAPI filters candidates by paper and index version, reranks them and assembles a cited context.",
        "visualType": "ragArchitecture"
      },
      {
        "eyebrow": "03 · Retrieval decisions",
        "title": "Balance meaning with the words that matter.",
        "body": "The retained reranker combines 60% vector similarity and 40% lexical coverage. The blend followed a five-question selection experiment. Explore the weighting below on three documentation excerpts; the example scores illustrate the formula, not measured retrieval quality.",
        "visualType": "ragExplorer"
      },
      {
        "eyebrow": "04 · Retrieval evaluation",
        "title": "Measure whether the evidence is found.",
        "body": "A recorded local experiment covered three papers, 57 pages, 332 chunks and 24 questions: 18 answerable and six unsupported. Page Recall@5 was 100% on the answerable questions, with MRR@10 of 0.854 and mean warm-query latency of 7.1 ms. This evaluates retrieval and context preservation, not generated-answer correctness.",
        "visualType": "ragResults"
      },
      {
        "eyebrow": "05 · Answer experience",
        "title": "The answer and its evidence stay on the same screen.",
        "body": "The product experience keeps answers beside their supporting passages. The public repository reproduces retrieval and cited-context assembly; it does not contain the full earlier application developed on my previous computer. OpenAI-backed answering belongs to that broader product experience, not to the measured retrieval endpoint.",
        "image": "assets/visuals/paperpal/paperpal-chatbot-detail.png",
        "imageAlt": "PaperPal chatbot with a research question, grounded answer and supporting passages.",
        "visualType": "paperpalScreen"
      },
      {
        "eyebrow": "06 · Reading tools",
        "title": "Get the main ideas before diving into the detail.",
        "body": "The existing product demo also presents summary and comparison workflows using BART-base. These reading tools complement the retrieval pipeline and remain visible here as part of the broader application experience.",
        "image": "assets/visuals/paperpal/paperpal-summary.png",
        "imageAlt": "PaperPal summary view with depth controls and a generated reading brief.",
        "visualType": "paperpalScreen"
      }
    ],
    "group": "Featured Systems"
  },
  {
    "id": "velib-demand-forecasting",
    "title": "Vélib' Availability Forecast",
    "subtitle": "Predict the bikes available in one hour, not just the bikes at the station now.",
    "cardStack": [
      "Python",
      "PostgreSQL",
      "MLflow"
    ],
    "overview": [
      {
        "label": "The question",
        "text": "Will there still be a bike when a rider arrives?"
      },
      {
        "label": "My contribution",
        "text": "Station ingestion, time-aware modeling and a versioned prediction API."
      },
      {
        "label": "The output",
        "text": "A one-hour forecast evaluated on a later, held-out period."
      }
    ],
    "caseStudyCategory": "Paris bike sharing · One-hour horizon",
    "caseStudyTitle": "Vélib' Availability Forecast",
    "caseStudySubtitle": "Turning station snapshots into a one-hour forecast for riders and rebalancing decisions.",
    "category": "Time series",
    "filterCategory": "Forecasting",
    "layout": "standard",
    "status": "Forecasting system",
    "image": "assets/visuals/project-velib-photo.webp",
    "imageAlt": "Green Velib bicycles docked at a station in Paris.",
    "caseStudyDemo": true,
    "detailImage": "assets/visuals/project-velib-architecture.png",
    "detailAlt": "Architecture diagram from CityBikes ingestion to PostgreSQL, MLflow, model serving and FastAPI.",
    "detailTitle": "Velib forecasting architecture",
    "imageActionLabel": "Open forecasting architecture",
    "repo": "https://github.com/zakilbaki/velib-demand-forecasting",
    "stack": [
      "Python",
      "PostgreSQL",
      "MLflow",
      "FastAPI",
      "Docker Compose",
      "Gradient Boosting"
    ],
    "story": [
      {
        "eyebrow": "01 · Business problem",
        "title": "Current availability is already becoming outdated.",
        "body": "A one-hour forecast helps riders and rebalancing teams look beyond the current station state. This map is an illustrative interface concept; its displayed values are not recorded model predictions.",
        "points": [
          "Explore a rider-facing forecast concept",
          "Anticipate empty or saturated stations",
          "Support short-horizon rebalancing decisions"
        ],
        "image": "assets/visuals/velib-analysis/station-forecast-map.jpg",
        "imageAlt": "Illustrative Paris station map with example current and future bike counts, not recorded forecasts.",
        "caption": "Illustrative station view"
      },
      {
        "eyebrow": "02 · Understand demand",
        "title": "Bike availability follows the rhythm of the day.",
        "body": "Aggregating station snapshots by hour reveals a clear daily pattern. The current state and next-hour target move together, but the gap changes around the sharpest transitions. Those shifts are precisely where a short-horizon model has to add value.",
        "image": "assets/visuals/velib-analysis/hourly-availability.png",
        "imageAlt": "Line chart comparing average current and next-hour bike availability across the 24 hours of the day."
      },
      {
        "eyebrow": "03 · Time-aware validation",
        "title": "The future never enters the training window.",
        "body": "I split by time rather than shuffling station records. Three hourly lags and recent changes describe each station's short-term direction. Testing on later dates checks the same question the service faces: can past observations predict the next hour?",
        "visualType": "forecastTimeline",
        "image": "assets/visuals/velib-analysis/chronological-validation.svg",
        "imageAlt": "Chronological split: train January 1 to March 11, validate March 11 to 13, test March 13 to 16. Each station uses three hourly lags and current observations to predict bike availability one hour ahead. Period widths are schematic."
      },
      {
        "eyebrow": "04 · From model to service",
        "title": "The forecast became a versioned API service.",
        "body": "I connected validated CityBikes ingestion, PostgreSQL history, temporal features and GradientBoostingRegressor. MLflow tracks parameters, metrics and artifacts. Explicit promotion selects the bundle served by FastAPI; Docker Compose runs the database and API.",
        "image": "assets/visuals/project-velib-architecture.png",
        "imageAlt": "Architecture diagram from CityBikes ingestion through PostgreSQL and MLflow to a promoted model served by FastAPI."
      },
      {
        "eyebrow": "05 · Chronological test",
        "title": "The forecast missed by about two bikes on average.",
        "body": "The documented chronological test reports MAE 1.97 bikes, RMSE 2.82 bikes and R² 0.94 at a one-hour horizon. Three-fold development CV recorded MAE 2.067 and RMSE 3.024 bikes. The CV and test metrics describe different evaluation stages.",
        "visualType": "forecastResults",
        "mae": "1.97",
        "rmse": "2.82",
        "r2": "0.94",
        "horizon": "+1 hour"
      }
    ],
    "question": "How do you turn CityBikes snapshots into predictions available through an API, with a reproducible workflow?",
    "built": [
      "Snapshot ingestion, validation, PostgreSQL storage and station-level time features built from historical states.",
      "Training with chronological validation, MLflow tracking and explicit promotion of the served model.",
      "FastAPI service with health and prediction endpoints, orchestrated with Docker Compose around the API and PostgreSQL services."
    ],
    "evidence": "The cover shows the user-facing prediction idea. Click it to inspect the full path from CityBikes to PostgreSQL, MLflow and FastAPI.",
    "next": "Add a real API capture or a small station-level prediction dashboard.",
    "group": "Featured Systems"
  },
  {
    "id": "online-retail-retention",
    "title": "Online Retail Retention",
    "subtitle": "Identify customers approaching inactivity and prioritize retention decisions.",
    "category": "Customer analytics",
    "filterCategory": "Classification",
    "cardStack": [
      "Python",
      "Pandas",
      "scikit-learn"
    ],
    "stack": [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Pytest"
    ],
    "caseStudyDemo": true,
    "caseStudyCategory": "E-commerce · Customer retention",
    "caseStudyTitle": "Understanding who may stop buying",
    "caseStudySubtitle": "From transaction histories to interpretable churn-risk scores and retention priorities.",
    "image": "assets/visuals/retail-retention/customer-retention-cover.jpg",
    "imageAlt": "Customer carrying a shopping bag drawn back from an exit by a magnet, illustrating customer retention.",
    "repo": "https://github.com/zakilbaki/online-retail-retention",
    "overview": [
      {
        "label": "The question",
        "text": "Which active customers are approaching 60 days without a purchase?"
      },
      {
        "label": "My contribution",
        "text": "Transaction auditing, monthly customer snapshots and temporal model comparison."
      },
      {
        "label": "The output",
        "text": "An interpretable risk model evaluated across two development periods."
      }
    ],
    "story": [
      {
        "eyebrow": "01 · The business question",
        "title": "A customer can leave without ever cancelling.",
        "body": "In online retail, there is no subscription cancellation to signal that a customer has left. Purchase histories provide the clues. Using UCI Online Retail II, I built a workflow to identify active customers approaching a defined inactivity boundary, with the goal of helping a retention team prioritize outreach.",
        "points": [
          "Understand the contribution of returning buyers",
          "Detect approaching inactivity from purchase history",
          "Connect risk scores to a measurable contact policy"
        ],
        "image": "assets/visuals/retail-retention/monthly-customers.png",
        "imageAlt": "Monthly counts of newly observed buyers and existing purchasing customers, exported from the exploratory notebook."
      },
      {
        "eyebrow": "02 · Define the target",
        "title": "Make customer inactivity a precise prediction task.",
        "body": "I define churn as 60 consecutive days without a valid positive purchase. At each monthly snapshot, the model predicts whether an active customer will reach that boundary during the next 30 days. Cancellations and fully reversed invoices are handled explicitly, so an accounting reversal is not mistaken for renewed purchasing activity.",
        "image": "assets/visuals/retail-retention/churn-definition.png",
        "imageAlt": "Illustrative timeline: a monthly snapshot 40 days after a purchase predicts whether the customer reaches the 60-day inactivity boundary within the next 30 days."
      },
      {
        "eyebrow": "03 · Respect the timeline",
        "title": "Each prediction uses only the history available that day.",
        "body": "I audited the overlapping transaction sheets and constructed monthly customer snapshots from earlier observations. Walk-forward validation removes training examples whose outcome windows overlap the next validation period. September through November 2011 remains reserved for the final out-of-time test. This keeps model selection separate from the final evaluation.",
        "points": [
          "Snapshots use history available before the reference date.",
          "Training label windows end before validation begins.",
          "IsInChurnRiskWindow means recency ≥ 30 days. A more recent buyer cannot reach 60 inactive days in the next 30 days. This available-at-prediction-time feature explains part of the strong ranking."
        ],
        "image": "assets/visuals/retail-retention/customer-population.png",
        "imageAlt": "Observed active and already-churned customer populations at successive monthly reference dates."
      },
      {
        "eyebrow": "04 · Compare the models",
        "title": "Four interpretable features make a strong reference.",
        "body": "A standardized logistic regression with four features remains the reference: recency, purchase frequency, cancellation history and IsInChurnRiskWindow. Its Average Precision was 90.33% and 97.10% across two development periods. More complex trees did not consistently improve ranking.",
        "imageAlt": "Development Average Precision for logistic regression, Random Forest and SGD across two periods.",
        "visualType": "retailComparison"
      },
      {
        "eyebrow": "05 · Retention decisions",
        "title": "The right alert depends on the cost of missing a customer.",
        "body": "Cost scenarios separate missed churners from unnecessary outreach. Logistic regression had the lowest cost when both errors carried equal weight; Random Forest became preferable when missing a churner cost at least five times an unnecessary contact. These are development scenarios, not measured campaign returns. September–November 2011 remains reserved for final testing.",
        "image": "assets/visuals/retail-retention/churn-over-time.png",
        "imageAlt": "The share of active customer snapshots reaching churn in the next 30 days varies across development reference dates."
      }
    ],
    "group": "Applied Machine Learning"
  },
  {
    "id": "credit-card-fraud-detection",
    "title": "Credit Card Fraud Detection",
    "subtitle": "Turn rare fraud signals into a prioritized, measurable review policy.",
    "cardStack": [
      "Python",
      "LightGBM",
      "scikit-learn"
    ],
    "overview": [
      {
        "label": "The question",
        "text": "Which transactions deserve attention when fraud is rare?"
      },
      {
        "label": "My contribution",
        "text": "Feature engineering, temporal evaluation and alert-policy analysis."
      },
      {
        "label": "The output",
        "text": "A reusable LightGBM predictor and four retrospective operating points."
      }
    ],
    "caseStudyCategory": "Payment risk · Imbalanced classification",
    "caseStudyTitle": "Credit card fraud detection",
    "caseStudySubtitle": "Balancing fraud detection with the cost of unnecessary transaction reviews.",
    "category": "Risk modeling",
    "filterCategory": "Classification",
    "layout": "standard",
    "status": "LightGBM + temporal validation",
    "image": "assets/visuals/credit-card-fraud/credit-card-fraud-hero-v1.jpg",
    "imageAlt": "Anonymous credit card above a payment terminal, surrounded by transaction flows with one coral fraud signal.",
    "caseStudyDemo": true,
    "repo": "https://github.com/zakilbaki/credit_card_fraud-",
    "stack": [
      "Python",
      "LightGBM",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Pytest",
      "CI"
    ],
    "story": [
      {
        "eyebrow": "01 · The business problem",
        "title": "Find suspicious payments without flooding the review queue.",
        "body": "Most payments are legitimate. An effective fraud model has to identify rare suspicious activity while keeping unnecessary reviews manageable. I framed this as a ranking and alert-policy problem, using transaction amount, timing and anonymized signals. The payment shown is an illustrative example.",
        "visualType": "fraudTransaction"
      },
      {
        "eyebrow": "02 · Transaction profile",
        "title": "Make each transaction comparable.",
        "body": "I transformed payment amount and encoded cyclical time features alongside the anonymized inputs. A class-weighted LightGBM model learns from this representation. The same feature preparation is reused at prediction time, so training and inference stay consistent.",
        "visualType": "fraudFeatures"
      },
      {
        "eyebrow": "03 · Temporal evaluation",
        "title": "Learn from earlier payments. Test on later ones.",
        "body": "The 80/20 chronological split uses 227,845 earlier transactions for training and 56,962 later transactions for evaluation. Average Precision is 0.7941 and ROC-AUC is 0.9555. Threshold selection and some feature iterations also used this later period, so it is not an independent test of a frozen policy.",
        "visualType": "fraudTimeline"
      },
      {
        "eyebrow": "04 · Alert decision",
        "title": "Choose the precision–recall trade-off.",
        "body": "Explore the four documented operating points. Each threshold was selected from the evaluated period’s precision–recall curve. The model returns a fraud risk score, not a calibrated probability.",
        "visualType": "thresholdExplorer"
      },
      {
        "eyebrow": "05 · Policy performance",
        "title": "About nine out of ten alerts correspond to fraud.",
        "body": "On the evaluated period, P90 achieves 90.5% precision and 76.0% recall. P95 increases precision to 96.4% while recall falls to 70.7%. These retrospective operating points expose the cost of reducing the review queue.",
        "visualType": "fraudPolicy"
      },
      {
        "eyebrow": "06 · Reusable inference",
        "title": "The model leaves the notebook with a clear contract.",
        "body": "The Python predictor and CLI reuse the same 13-feature preparation as training: ten anonymized variables, log-transformed amount and cyclical hour encodings. Saved metadata records the feature order and thresholds; tests and CI check the inference contract.",
        "visualType": "fraudCli"
      }
    ],
    "question": "How do you rank rare fraudulent payments while making the evaluation and review policy explicit?",
    "built": [
      "Chronological split, with threshold selection and feature iteration on the evaluated period.",
      "Feature engineering for amount and cyclical time, followed by a class-weighted LightGBM classifier.",
      "Saved model metadata, Python inference API, command-line prediction, tests and continuous integration."
    ],
    "evidence": "Recorded Average Precision 0.7941 and ROC-AUC 0.9555; policy selection used the evaluated period.",
    "next": "Add probability calibration, drift monitoring and an alert-capacity analysis before considering live payment decisions.",
    "group": "Applied Machine Learning"
  },
  {
    "id": "industrial-defect-prediction",
    "title": "Industrial Defect Prediction",
    "subtitle": "Use production sensor traces to prioritize starter motors for quality inspection.",
    "cardStack": [
      "Python",
      "scikit-learn",
      "Pandas"
    ],
    "overview": [
      {
        "label": "The question",
        "text": "Which motors should receive additional inspection first?"
      },
      {
        "label": "My contribution",
        "text": "Process-feature analysis and a leakage-aware classification baseline."
      },
      {
        "label": "The output",
        "text": "A reusable Elastic Net pipeline and a separately evaluated notebook ensemble."
      }
    ],
    "caseStudyCategory": "Valeo Challenge Data #36",
    "caseStudyTitle": "Detecting defective starter motors earlier",
    "caseStudySubtitle": "A machine learning case study for ranking production risk before end-of-line quality control.",
    "category": "Industrial ML",
    "filterCategory": "Industrial data",
    "layout": "feature",
    "status": "Validation",
    "image": "assets/visuals/project-defect-cover.jpg",
    "imageAlt": "An industrial production floor with connected manufacturing machines.",
    "caseStudyDemo": true,
    "repo": "https://github.com/zakilbaki/industrial-defect-prediction",
    "stack": [
      "Python",
      "scikit-learn",
      "Elastic Net",
      "Pandas",
      "Ruff",
      "Pytest",
      "CI"
    ],
    "story": [
      {
        "eyebrow": "01 · Business problem",
        "title": "Find the risky motor before the final test.",
        "body": "Valeo supplied the starter-motor production data for Challenge Data #36. I used the challenge as an independent project, exploring sensor measurements to prioritize additional quality inspections.",
        "points": [
          "Business objective: identify issues earlier",
          "Potential value: avoid late rework and scrap",
          "Decision supported: prioritize additional inspection"
        ],
        "image": "assets/visuals/defect-analysis/valeo-context.jpg",
        "imageAlt": "A Valeo employee walking past a large Valeo automotive technology display.",
        "imageMode": "cover"
      },
      {
        "eyebrow": "02 · Understand the target",
        "title": "Defects are rare, and their rate moves over time.",
        "body": "Only 0.88% of labeled products are defective, so a model predicting every motor as normal would look accurate while being useless. The daily view also shows that risk is not constant across the production sequence.",
        "image": "assets/visuals/defect-analysis/defect-rate-by-day.png",
        "imageAlt": "Line chart showing the average defect rate by day of the month.",
        "caption": "Average defect rate by production day"
      },
      {
        "eyebrow": "03 · Explore separability",
        "title": "The defective class does not form a clean cluster.",
        "body": "I used PCA to explore the structure of the sensor measurements. In this two-dimensional projection, defective and normal motors overlap. That observation motivated looking beyond the raw measurements to process features and recent production history.",
        "image": "assets/visuals/defect-analysis/pca-raw-sensors.png",
        "imageAlt": "Two-dimensional PCA projection comparing normal and defective production samples.",
        "caption": "PCA projection · normal versus defective products"
      },
      {
        "eyebrow": "04 · Select useful signals",
        "title": "Turn process measurements into useful signals.",
        "body": "The reusable pipeline combines process features and past-only rolling statistics with imputation, robust scaling and class-weighted Elastic Net. A separate notebook explores ensembles and PCA-based post-processing. Keeping these paths distinct makes their results traceable.",
        "image": "assets/visuals/defect-analysis/mutual-information.png",
        "imageAlt": "Horizontal bar chart ranking the twenty most informative production features.",
        "caption": "Top 20 features by mutual information"
      },
      {
        "eyebrow": "05 · Notebook experiment",
        "title": "The model detected 29 of 42 defective motors.",
        "body": "The notebook ensemble with PCA-based post-processing detected 29 of 42 defects across 5,178 products, with 1,415 false alerts: 69.05% recall, 2.01% precision, Average Precision 0.0155 and AUROC 0.6979. These results belong to that experiment, not the reusable Elastic Net pipeline. The inspection burden is central to interpreting the detection rate.",
        "visualType": "results",
        "detectedDefects": 29,
        "totalDefects": 42,
        "falseAlarms": 1415,
        "auroc": "0.6979",
        "caption": "Notebook ensemble + PCA post-processing · Chronological evaluation"
      }
    ],
    "question": "How do you build an industrial defect baseline when the positive class is rare and leakage is easy?",
    "built": [
      "Parsing production measurements, process features and rolling variables computed from past data only.",
      "Chronological validation, imputation, robust scaling and an interpretable class-weighted linear baseline.",
      "Tests focused on chronology and an explicit distinction between exploration and reproducible scoring."
    ],
    "evidence": "The proof is the leakage-aware protocol: past-only rolling features, chronological validation and tests around the risky parts of the pipeline.",
    "next": "Add a validation flow diagram and a short notebook focused on error reading.",
    "group": "Applied Machine Learning"
  },
  {
    "id": "brain-tumor-detection",
    "title": "Brain Tumor Detection",
    "subtitle": "Classify brain MRI scans, then inspect the image regions behind the prediction.",
    "cardStack": [
      "Python",
      "PyTorch",
      "Grad-CAM"
    ],
    "overview": [
      {
        "label": "The question",
        "text": "Can an image classifier distinguish tumor-present MRI scans?"
      },
      {
        "label": "My contribution",
        "text": "CNN training, threshold evaluation and Grad-CAM interpretation."
      },
      {
        "label": "The output",
        "text": "A binary classifier with visual analysis of its predictions."
      }
    ],
    "caseStudyCategory": "Medical imaging · Deep learning",
    "caseStudyTitle": "Brain tumor detection",
    "caseStudySubtitle": "A compact CNN that classifies brain MRI scans and makes its decisions visible through Grad-CAM.",
    "category": "Computer vision",
    "filterCategory": "Computer vision",
    "layout": "standard",
    "status": "CNN + Grad-CAM",
    "image": "assets/visuals/brain-mri-analysis/mri-gradcam-cover.jpg",
    "imageAlt": "Editorial comparison of a brain MRI scan and its Grad-CAM activation map.",
    "caseStudyDemo": true,
    "repo": "https://github.com/zakilbaki/brain_tumor_detection",
    "stack": [
      "Python",
      "PyTorch",
      "Grad-CAM",
      "Kaggle"
    ],
    "story": [
      {
        "eyebrow": "01 · The problem",
        "title": "Can a neural network recognize tumor patterns in brain MRI scans?",
        "body": "I trained a custom AnyNet256 CNN in PyTorch to classify tumor-present and no-tumor MRI images. The project studies image classification and threshold selection on a small dataset; it is not a clinically validated diagnostic system.",
        "visualType": "mriSamples"
      },
      {
        "eyebrow": "02 · Neural network",
        "title": "Learn image patterns, layer by layer.",
        "body": "I used AnyNet256, a compact CNN built in PyTorch. Three convolutional blocks turn a 256×256 image into progressively richer features before a binary output. Batch normalization, pooling and dropout support training without making the architecture difficult to inspect.",
        "image": "assets/visuals/brain-mri-analysis/mri-network-visual-v1.png",
        "imageAlt": "Brain MRI flowing through three convolutional feature groups, a dense layer and a binary output.",
        "imageMode": "darkContain"
      },
      {
        "eyebrow": "03 · Decision threshold",
        "title": "The threshold defines a recall-focused operating point.",
        "body": "At the selected 0.282 threshold, the model catches 30 of 31 tumor images and misses one, while five no-tumor images are flagged. This operating point prioritizes tumor recall while keeping every false alert visible in the evaluation.",
        "image": "assets/visuals/brain-mri-analysis/confusion-matrix.png",
        "imageAlt": "Confusion matrix with 15 true negatives, 5 false positives, 1 false negative and 30 true positives.",
        "imageMode": "chartBlend"
      },
      {
        "eyebrow": "04 · Ranking quality",
        "title": "Precision remains high as recall increases.",
        "body": "The recorded precision–recall curve has an area of 0.960 on the 51-image validation split. This PR-AUC summarizes ranking on that small split; the threshold-specific confusion matrix shows the actual decisions.",
        "image": "assets/visuals/brain-mri-analysis/precision-recall.png",
        "imageAlt": "Precision-recall curve with an area under the curve of 0.960.",
        "imageMode": "chartBlend"
      },
      {
        "eyebrow": "05 · Model attention",
        "title": "Inspect where the model responds.",
        "body": "Grad-CAM highlights regions associated with the model score. Comparing correct and incorrect predictions helps inspect behavior; these maps are not causal explanations or proof that the model has learned a medical mechanism.",
        "visualType": "mriGradcam",
        "image": "assets/visuals/brain-mri-analysis/gradcam-composite.png",
        "imageAlt": "True-positive, true-negative, false-positive and false-negative brain MRI scans shown above their Grad-CAM overlays."
      },
      {
        "eyebrow": "06 · Validation result",
        "title": "Thirty of thirty-one tumor images were detected.",
        "body": "On 51 validation images, the selected threshold detected 30 of 31 positive scans, with five false alerts: 96.8% recall and 88% accuracy. ROC-AUC is 0.937 and documented PR-AUC is 0.960. Threshold selection and reporting use this validation split.",
        "visualType": "mriResults",
        "detectedTumors": 30,
        "totalTumors": 31,
        "falseAlarms": 5,
        "accuracy": "88%",
        "rocAuc": "0.937",
        "prAuc": "0.960"
      }
    ],
    "question": "How do you train a lightweight CNN on MRI scans while checking where the model pays attention?",
    "built": [
      "A family of AnyNet CNNs trained on a Kaggle dataset with stratified split and training transforms.",
      "Evaluation through confusion matrix, ROC, precision-recall and false positive or false negative analysis.",
      "Grad-CAM to visualize the regions influencing the model decision."
    ],
    "evidence": "The visual uses repository artifacts: true positives, true negatives, false positives, false negatives and Grad-CAM overlays.",
    "next": "Document the medical limits, dataset size and validation protocol more cleanly.",
    "group": "Applied Machine Learning"
  }
];
