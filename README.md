# Byte-The-Storm

# Follow this folder structure 
## 📁 Project Structure

```text
byte-the-storm/
│
├── frontend/                    # React application
│   └── src/
│       ├── components/          # Reusable UI components
│       │   ├── Map.jsx
│       │   ├── RiskCard.jsx
│       │   └── Navbar.jsx
│       │
│       ├── pages/               # Application pages
│       │   └── Dashboard.jsx
│       │
│       └── App.jsx
│
├── backend/                     # FastAPI backend
│   ├── main.py                  # API entry point
│   ├── predictor.py             # Loads model and makes predictions
│   ├── data_collector.py        # Fetches live weather data
│   │
│   └── models/
│       └── cyclone_model.pkl    # Final trained model
│
├── training/                    # Machine Learning training
│   │
│   ├── data/
│   │   ├── raw/                 # Original historical data
│   │   └── processed/           # Cleaned training data
│   │
│   ├── notebooks/               # Experiments and analysis
│   │
│   ├── src/
│   │   ├── preprocess.py        # Data cleaning
│   │   ├── feature_engineering.py
│   │   ├── train.py             # Model training
│   │   ├── evaluate.py          # Model evaluation
│   │   └── predict.py
│   │
│   └── models/                  # Training model outputs
│
├── data/                        # Live/current weather data
│   └── weather_data.csv
│
├── README.md                    # Project documentation
└── requirements.txt             # Python dependencies
```

### 🔄 System Workflow

```text
Historical Cyclone + Weather Data
              │
              ▼
        Training Folder
              │
              ▼
       Train ML Model
              │
              ▼
      cyclone_model.pkl
              │
              ▼
           Backend
              │
     Open-Meteo GFS API
              │
              ▼
       Live Weather Data
              │
              ▼
         AI Prediction
              │
              ▼
          FastAPI API
              │
              ▼
        React Frontend
              │
              ▼
      Bay of Bengal Risk Map
```

