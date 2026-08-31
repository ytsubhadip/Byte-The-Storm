# Byte-The-Storm

# Follow this folder structure 
byte-the-storm/
│
├── frontend/                    # React application
│   └── src/
│       ├── components/
│       │   ├── Map.jsx
│       │   ├── RiskCard.jsx
│       │   └── Navbar.jsx
│       ├── pages/
│       │   └── Dashboard.jsx
│       └── App.jsx
│
├── backend/                     # FastAPI application
│   ├── main.py
│   ├── predictor.py
│   ├── data_collector.py
│   │
│   └── models/                  # Trained models
│       └── cyclone_model.pkl
│
├── training/                    # ⭐ MODEL TRAINING
│   │
│   ├── data/
│   │   ├── raw/
│   │   └── processed/
│   │
│   ├── notebooks/               # Experiments/testing
│   │
│   ├── src/
│   │   ├── preprocess.py
│   │   ├── feature_engineering.py
│   │   ├── train.py
│   │   ├── evaluate.py
│   │   └── predict.py
│   │
│   ├── models/
│   │   └── cyclone_model.pkl
│   │
│   └── requirements.txt
│
├── data/                        # Live/current data
│   └── weather_data.csv
│
├── README.md
└── requirements.txt
