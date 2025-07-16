import asyncio
import random
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="GLP-1 Opportunity Finder API",
    description="Mock API for exploring non-diabetes indications for GLP-1 drugs",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Disease(BaseModel):
    id: str
    name: str
    prevalence: str = ""
    treatmentStatus: str = ""
    priorityScore: int = 0
    sources: List[str] = []
    summary: str
    citations: List[str]

class PrevalenceResponse(BaseModel):
    prevalence: str
    treatmentStatus: str
    sources: List[str]

class PrioritizeRequest(BaseModel):
    diseases: List[str]

class PrioritizeResponse(BaseModel):
    disease_name: str
    priority_score: int
    treatment_status: str

# Mock Data
MOCK_DISEASES = {
    "GLP-1": [
        {
            "id": "1",
            "name": "Alzheimer's Disease",
            "summary": "Neurodegenerative disorder characterized by progressive cognitive decline and potential neuroprotective effects from GLP-1 receptor agonists.",
            "citations": ["Nature Medicine 2023: GLP-1 and neurodegeneration", "Cell Metabolism 2022: Brain glucose metabolism"]
        },
        {
            "id": "2", 
            "name": "Non-Alcoholic Fatty Liver Disease",
            "summary": "Liver condition linked to metabolic dysfunction, showing promising response to GLP-1 receptor modulation in preclinical studies.",
            "citations": ["Hepatology 2023: GLP-1 in NAFLD", "Gastroenterology 2022: Metabolic liver disease"]
        },
        {
            "id": "3",
            "name": "Polycystic Ovary Syndrome", 
            "summary": "Hormonal disorder affecting reproductive-aged women, with emerging evidence for GLP-1 effects on insulin resistance and ovarian function.",
            "citations": ["Endocrine Reviews 2023: PCOS and incretin therapy", "JCEM 2022: Metabolic aspects of PCOS"]
        },
        {
            "id": "4",
            "name": "Inflammatory Bowel Disease",
            "summary": "Chronic inflammatory condition of the digestive tract with potential anti-inflammatory benefits from GLP-1 pathway modulation.",
            "citations": ["Nature Reviews Gastroenterology 2023: Incretin effects on gut inflammation"]
        },
        {
            "id": "5",
            "name": "Parkinson's Disease",
            "summary": "Neurodegenerative movement disorder showing neuroprotective potential in GLP-1 receptor agonist studies.",
            "citations": ["Lancet Neurology 2023: GLP-1 neuroprotection", "Movement Disorders 2022: Metabolic factors in PD"]
        },
        {
            "id": "6",
            "name": "Chronic Kidney Disease",
            "summary": "Progressive loss of kidney function with demonstrated renoprotective effects in GLP-1 clinical trials.",
            "citations": ["Kidney International 2023: GLP-1 and kidney outcomes", "NEJM 2022: Cardiovascular and renal outcomes"]
        }
    ],
    "SGLT2": [
        {
            "id": "7",
            "name": "Heart Failure",
            "summary": "Cardiac condition showing significant improvement with SGLT2 inhibitors through volume reduction and metabolic effects.",
            "citations": ["Circulation 2023: SGLT2i in heart failure", "European Heart Journal 2022: Cardiac outcomes"]
        },
        {
            "id": "8",
            "name": "Chronic Kidney Disease",
            "summary": "Kidney function decline demonstrating renoprotective benefits from SGLT2 inhibition independent of diabetes status.",
            "citations": ["Kidney International 2023: SGLT2i nephroprotection", "JASN 2022: Non-diabetic CKD outcomes"]
        }
    ]
}

PREVALENCE_DATA = [
    "2.1M in US", "5.8M in US", "12.3M in US", "850K in US", "3.2M in US", 
    "7.4M in US", "1.9M in US", "4.6M in US", "15.2M in US", "950K in US",
    "6.7M in EU", "3.8M in EU", "11.1M in EU", "2.3M in EU", "8.9M in EU"
]

TREATMENT_STATUSES = [
    "No approved therapy",
    "Limited treatment options", 
    "Off-label use only",
    "Symptomatic treatment only",
    "Standard therapy available",
    "Multiple approved treatments",
    "Investigational therapies in development"
]

SOURCE_OPTIONS = [
    ["PubMed", "ClinicalTrials.gov", "FDA Database"],
    ["Cochrane Reviews", "WHO Global Health Observatory", "CDC Statistics"],
    ["European Medicines Agency", "NIH Clinical Center", "Mayo Clinic Database"],
    ["National Cancer Institute", "Orphanet", "Global Burden of Disease Study"],
    ["American Heart Association", "Alzheimer's Association", "International Diabetes Federation"]
]

@app.get("/")
async def root():
    return {"message": "GLP-1 Opportunity Finder API", "status": "running"}

@app.get("/literature-search")
async def literature_search(target: str = Query(..., description="Target molecule (e.g., GLP-1)")):
    """
    Search literature for diseases associated with the target molecule.
    Returns 4-6 diseases with basic information.
    """
    # Simulate API delay
    await asyncio.sleep(random.uniform(1.0, 2.5))
    
    if target not in MOCK_DISEASES:
        # Return some generic diseases if target not found
        diseases = random.sample(list(MOCK_DISEASES.values())[0], 4)
    else:
        diseases = MOCK_DISEASES[target]
    
    # Return a random subset to simulate dynamic results
    selected_diseases = random.sample(diseases, min(len(diseases), random.randint(4, 6)))
    
    return {
        "target": target,
        "diseases": [Disease(**disease) for disease in selected_diseases]
    }

@app.get("/estimate-prevalence")
async def estimate_prevalence(disease_name: str = Query(..., description="Name of the disease")):
    """
    Estimate prevalence for a specific disease.
    Returns prevalence number, treatment status, and sources.
    """
    # Simulate API delay
    await asyncio.sleep(random.uniform(1.0, 2.0))
    
    # Occasionally simulate missing data or errors (10% chance)
    if random.random() < 0.1:
        raise HTTPException(status_code=404, detail=f"Prevalence data not available for {disease_name}")
    
    return PrevalenceResponse(
        prevalence=random.choice(PREVALENCE_DATA),
        treatmentStatus=random.choice(TREATMENT_STATUSES),
        sources=random.choice(SOURCE_OPTIONS)
    )

@app.post("/prioritize")
async def prioritize_diseases(request: PrioritizeRequest):
    """
    Prioritize a list of diseases based on multiple factors.
    Returns prioritized list with scores and treatment status.
    """
    # Simulate API delay
    await asyncio.sleep(random.uniform(0.8, 1.5))
    
    if not request.diseases:
        raise HTTPException(status_code=400, detail="No diseases provided")
    
    prioritized = []
    for disease_name in request.diseases:
        # Generate realistic priority scores with some logic
        base_score = random.randint(60, 95)
        
        # Adjust scores based on disease characteristics
        if "Alzheimer" in disease_name or "Parkinson" in disease_name:
            base_score += random.randint(5, 10)  # Higher priority for neurodegenerative
        elif "Cancer" in disease_name or "Carcinoma" in disease_name:
            base_score += random.randint(8, 15)  # Higher priority for oncology
        elif "Syndrome" in disease_name:
            base_score -= random.randint(2, 8)   # Slightly lower for syndromes
            
        prioritized.append(PrioritizeResponse(
            disease_name=disease_name,
            priority_score=min(100, max(1, base_score)),
            treatment_status=random.choice(TREATMENT_STATUSES)
        ))
    
    # Sort by priority score (highest first)
    prioritized.sort(key=lambda x: x.priority_score, reverse=True)
    
    return {"prioritized_diseases": prioritized}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005) 