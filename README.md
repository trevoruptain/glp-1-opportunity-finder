# GLP-1 Opportunity Finder

A research tool for exploring non-diabetes indications for GLP-1 drugs. This monorepo contains both the frontend (Next.js) and backend (FastAPI) components.

## Project Structure

```
glp-1-opportunity-finder/
├── frontend/          # Next.js React application
├── backend/           # FastAPI Python backend
└── README.md         # This file
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python3 main.py
```

The API will be available at `http://localhost:8005`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

1. **Start the backend server** on `http://localhost:8005`
2. **Start the frontend** on `http://localhost:3000`
3. **Use the application**:
   - Select a target molecule (e.g., GLP-1)
   - Click "Search Literature" to find associated diseases
   - Click "Estimate Prevalence" to get prevalence data
   - Click "Prioritize Indications" to rank opportunities

## API Endpoints

The backend provides the following endpoints:

- `GET /literature-search?target=GLP-1` - Find diseases associated with a molecule
- `GET /estimate-prevalence?disease_name=Disease` - Get prevalence data for a disease
- `POST /prioritize` - Prioritize a list of diseases

## Features

- **Mock Data**: Realistic but simulated data for demonstration
- **Dynamic Responses**: Randomized results that feel authentic
- **Simulated Delays**: 1-2 second delays to mimic real API calls
- **Error Handling**: Graceful handling of missing data or API failures
- **Responsive UI**: Modern, mobile-friendly interface
- **Multi-molecule Support**: Works with different target molecules

## Development

Both components support hot reloading during development. The frontend automatically proxies API calls to the backend when both are running locally. 