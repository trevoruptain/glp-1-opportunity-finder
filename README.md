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

### Option 1: Docker (Recommended)

The easiest way to run the entire application:

1. **Prerequisites**: Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

2. **Run the application**:

   **For production-like setup:**
   ```bash
   docker-compose up --build
   ```

   **For development with hot reload:**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
   ```
   
   **Or use the convenience script:**
   ```bash
   ./start.sh
   ```

This will:
- Build and start both frontend and backend containers
- Frontend available at `http://localhost:3000`
- Backend API available at `http://localhost:8005`
- API docs at `http://localhost:8005/docs`

3. **Stop the application**:
```bash
docker-compose down
```

### Option 2: Manual Setup

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

### Docker Commands

```bash
# Start in production mode
docker-compose up --build

# Start in development mode (with hot reload)
./start-dev.sh

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build --no-cache backend
docker-compose build --no-cache frontend
```

### Manual Development

Both components support hot reloading during development. The frontend automatically proxies API calls to the backend when both are running locally.

### Project Structure After Docker Setup

```
glp-1-opportunity-finder/
├── frontend/              # Next.js React application
│   ├── Dockerfile
│   └── .dockerignore
├── backend/               # FastAPI Python backend  
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml     # Production Docker setup
├── docker-compose.override.yml  # Development overrides
├── start.sh              # Quick start script
├── start-dev.sh         # Development start script
└── README.md
``` 