# GLP-1 Opportunity Finder Backend

FastAPI backend for the GLP-1 Opportunity Finder application. Provides mock data endpoints for researching non-diabetes indications for GLP-1 drugs.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8005`

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8005/docs`
- ReDoc: `http://localhost:8005/redoc`

## Endpoints

### GET /literature-search
Search for diseases associated with a target molecule.

**Parameters:**
- `target` (query): Target molecule (e.g., "GLP-1")

**Response:**
```json
{
  "target": "GLP-1",
  "diseases": [
    {
      "id": "1",
      "name": "Alzheimer's Disease",
      "summary": "Neurodegenerative disorder...",
      "citations": ["Nature Medicine 2023", "Cell Metabolism 2022"],
      "prevalence": "",
      "treatmentStatus": "",
      "priorityScore": 0,
      "sources": []
    }
  ]
}
```

### GET /estimate-prevalence
Get prevalence data for a specific disease.

**Parameters:**
- `disease_name` (query): Name of the disease

**Response:**
```json
{
  "prevalence": "5.8M in US",
  "treatmentStatus": "Limited treatment options",
  "sources": ["PubMed", "ClinicalTrials.gov", "FDA Database"]
}
```

### POST /prioritize
Prioritize a list of diseases based on multiple factors.

**Request Body:**
```json
{
  "diseases": ["Alzheimer's Disease", "NAFLD", "PCOS"]
}
```

**Response:**
```json
{
  "prioritized_diseases": [
    {
      "disease_name": "Alzheimer's Disease",
      "priority_score": 89,
      "treatment_status": "Limited treatment options"
    }
  ]
}
```

## Features

- **Mock Data**: Realistic but fake data for demonstration
- **Simulated Delays**: 1-2 second delays to simulate real API calls
- **Dynamic Responses**: Randomized but consistent data
- **Error Simulation**: Occasional 404 errors for missing data
- **CORS Support**: Configured for frontend integration
- **Multiple Targets**: Support for different molecules (GLP-1, SGLT2, etc.) 