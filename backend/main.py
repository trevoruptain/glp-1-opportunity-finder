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
        },
        {
            "id": "7",
            "name": "Gastroparesis",
            "summary": "Delayed gastric emptying disorder where GLP-1 receptor agonists show therapeutic potential despite initial concerns about gastric motility.",
            "citations": ["Diabetes Care 2023: GLP-1 effects on gastric function", "Neurogastroenterology & Motility 2022: Incretin therapy in gastroparesis"]
        },
        {
            "id": "8",
            "name": "Huntington's Disease",
            "summary": "Hereditary neurodegenerative disorder with emerging preclinical evidence for GLP-1 receptor-mediated neuroprotection and metabolic benefits.",
            "citations": ["Brain Research 2023: GLP-1 in Huntington's disease", "Molecular Neurodegeneration 2022: Incretin signaling in HD"]
        },
        {
            "id": "9",
            "name": "Schizophrenia",
            "summary": "Psychiatric disorder with metabolic comorbidities where GLP-1 agonists may address both weight gain and cognitive symptoms.",
            "citations": ["Neuropsychopharmacology 2023: GLP-1 and antipsychotic-induced weight gain", "Schizophrenia Research 2022: Metabolic effects in psychiatric patients"]
        },
        {
            "id": "10",
            "name": "Sleep Apnea",
            "summary": "Sleep-disordered breathing condition linked to obesity, showing improvement with GLP-1-mediated weight loss and metabolic effects.",
            "citations": ["Sleep Medicine Reviews 2023: GLP-1 therapy and sleep apnea", "American Journal of Respiratory Medicine 2022: Weight loss interventions in OSA"]
        }
    ],
    "SGLT2": [
        {
            "id": "11",
            "name": "Heart Failure",
            "summary": "Cardiac condition showing significant improvement with SGLT2 inhibitors through volume reduction and metabolic effects.",
            "citations": ["Circulation 2023: SGLT2i in heart failure", "European Heart Journal 2022: Cardiac outcomes"]
        },
        {
            "id": "12",
            "name": "Chronic Kidney Disease",
            "summary": "Kidney function decline demonstrating renoprotective benefits from SGLT2 inhibition independent of diabetes status.",
            "citations": ["Kidney International 2023: SGLT2i nephroprotection", "JASN 2022: Non-diabetic CKD outcomes"]
        },
        {
            "id": "13",
            "name": "Atrial Fibrillation",
            "summary": "Most common cardiac arrhythmia showing reduced incidence in patients treated with SGLT2 inhibitors through unknown mechanisms.",
            "citations": ["JACC 2023: SGLT2 inhibitors and atrial fibrillation", "Heart Rhythm 2022: Antiarrhythmic effects of gliflozins"]
        },
        {
            "id": "14",
            "name": "Pulmonary Hypertension",
            "summary": "Elevated blood pressure in pulmonary arteries with emerging evidence for SGLT2 inhibitor benefits through cardiopulmonary interactions.",
            "citations": ["Pulmonary Circulation 2023: SGLT2i in pulmonary hypertension", "ERJ Open Research 2022: Metabolic effects on pulmonary vasculature"]
        },
        {
            "id": "15",
            "name": "Gout",
            "summary": "Inflammatory arthritis caused by uric acid crystals, with SGLT2 inhibitors showing uricosuric effects and reduced flare frequency.",
            "citations": ["Arthritis & Rheumatism 2023: SGLT2 inhibitors and uric acid", "Rheumatology 2022: Gliflozins in hyperuricemia management"]
        }
    ],
    "DPP-4": [
        {
            "id": "16",
            "name": "Psoriasis",
            "summary": "Autoimmune skin condition with emerging evidence for DPP-4 inhibitor anti-inflammatory effects and immune modulation.",
            "citations": ["Journal of Dermatology 2023: DPP-4 inhibition in psoriasis", "Skin Pharmacology 2022: Incretin effects on skin inflammation"]
        },
        {
            "id": "17",
            "name": "Rheumatoid Arthritis",
            "summary": "Systemic autoimmune disease where DPP-4 inhibitors may provide anti-inflammatory benefits beyond glycemic control.",
            "citations": ["Rheumatology International 2023: DPP-4 inhibitors in RA", "Clinical Rheumatology 2022: Anti-inflammatory effects of gliptins"]
        },
        {
            "id": "18",
            "name": "Endometriosis",
            "summary": "Gynecological condition with chronic inflammation where DPP-4 inhibition shows promise in preclinical endometrial models.",
            "citations": ["Fertility & Sterility 2023: DPP-4 in endometriosis", "Reproductive Biology 2022: Incretin signaling in gynecology"]
        }
    ],
    "GIP": [
        {
            "id": "19",
            "name": "Osteoporosis",
            "summary": "Bone density disorder where GIP receptor agonists demonstrate bone anabolic effects and fracture risk reduction.",
            "citations": ["Bone 2023: GIP effects on bone metabolism", "JBMR 2022: Incretin hormones and skeletal health"]
        },
        {
            "id": "20",
            "name": "Cognitive Impairment",
            "summary": "Age-related cognitive decline with emerging evidence for GIP receptor-mediated neuroprotection and memory enhancement.",
            "citations": ["Alzheimer's & Dementia 2023: GIP and cognitive function", "Neurobiology of Aging 2022: Incretin effects on brain health"]
        },
        {
            "id": "21",
            "name": "Sarcopenia",
            "summary": "Age-related muscle loss condition where GIP agonists show potential for muscle preservation and metabolic benefits.",
            "citations": ["Journal of Cachexia 2023: GIP effects on muscle mass", "Age and Ageing 2022: Incretin therapy in sarcopenia"]
        }
    ],
    "PCSK9": [
        {
            "id": "22",
            "name": "Familial Hypercholesterolemia",
            "summary": "Genetic disorder causing extremely high cholesterol levels, directly addressable through PCSK9 inhibition.",
            "citations": ["Circulation 2023: PCSK9 inhibitors in FH", "JACC 2022: Genetic hypercholesterolemia management"]
        },
        {
            "id": "23",
            "name": "Atherosclerotic Cardiovascular Disease",
            "summary": "Arterial plaque formation leading to heart attacks and strokes, preventable through aggressive PCSK9-mediated cholesterol reduction.",
            "citations": ["NEJM 2023: PCSK9 inhibition and ASCVD outcomes", "Lancet 2022: Cholesterol lowering and cardiovascular events"]
        },
        {
            "id": "24",
            "name": "Ischemic Stroke",
            "summary": "Cerebrovascular event caused by arterial blockage, with PCSK9 inhibitors showing stroke prevention benefits.",
            "citations": ["Stroke 2023: PCSK9 inhibitors and cerebrovascular outcomes", "Neurology 2022: Cholesterol management in stroke prevention"]
        }
    ],
    "AMPK": [
        {
            "id": "25",
            "name": "Cancer Cachexia",
            "summary": "Muscle wasting syndrome in cancer patients where AMPK activation may preserve muscle mass and improve outcomes.",
            "citations": ["Nature Cancer 2023: AMPK in cancer cachexia", "Cancer Research 2022: Metabolic interventions in muscle wasting"]
        },
        {
            "id": "26",
            "name": "Mitochondrial Myopathy",
            "summary": "Genetic muscle disorders caused by mitochondrial dysfunction, potentially treatable through AMPK-mediated metabolic enhancement.",
            "citations": ["Nature Metabolism 2023: AMPK and mitochondrial disease", "Cell Metabolism 2022: Therapeutic targets in myopathy"]
        },
        {
            "id": "27",
            "name": "Aging-Related Frailty",
            "summary": "Age-associated decline in physiological function where AMPK activation may promote healthy aging and longevity.",
            "citations": ["Cell 2023: AMPK and healthy aging", "Nature Aging 2022: Metabolic interventions in frailty"]
        }
    ],
    "FGF21": [
        {
            "id": "28",
            "name": "Primary Biliary Cholangitis",
            "summary": "Autoimmune liver disease with limited treatment options, showing promise with FGF21 analogs in clinical trials.",
            "citations": ["Hepatology 2023: FGF21 in PBC treatment", "Journal of Hepatology 2022: Novel therapies for cholestatic liver disease"]
        },
        {
            "id": "29",
            "name": "Lipodystrophy",
            "summary": "Rare disorders of fat distribution where FGF21 therapy may address metabolic complications and lipid abnormalities.",
            "citations": ["Diabetes 2023: FGF21 in lipodystrophy", "JCEM 2022: Metabolic therapies for fat distribution disorders"]
        },
        {
            "id": "30",
            "name": "Alcohol Use Disorder",
            "summary": "Substance use disorder where FGF21 shows potential for reducing alcohol craving and consumption in preclinical models.",
            "citations": ["Nature Medicine 2023: FGF21 and alcohol addiction", "Addiction Biology 2022: Metabolic factors in substance use"]
        }
    ],
    "GCG": [
        {
            "id": "31",
            "name": "Congenital Hyperinsulinism",
            "summary": "Rare genetic disorder causing severe hypoglycemia, potentially treatable through glucagon receptor agonism.",
            "citations": ["NEJM 2023: Glucagon receptor agonists in CHI", "Diabetes Care 2022: Novel treatments for hyperinsulinism"]
        },
        {
            "id": "32",
            "name": "Exercise Intolerance",
            "summary": "Reduced physical performance capacity where glucagon receptor modulation may enhance metabolic fuel utilization.",
            "citations": ["Exercise & Sport Sciences Reviews 2023: Glucagon and exercise metabolism", "Sports Medicine 2022: Hormonal regulation of exercise capacity"]
        }
    ]
}

PREVALENCE_DATA = [
    "2.1M in US", "5.8M in US", "12.3M in US", "850K in US", "3.2M in US", 
    "7.4M in US", "1.9M in US", "4.6M in US", "15.2M in US", "950K in US",
    "6.7M in EU", "3.8M in EU", "11.1M in EU", "2.3M in EU", "8.9M in EU",
    "450K globally", "1.2M in Japan", "750K in Canada", "18.5M worldwide",
    "325K in Australia", "2.8M in UK", "65K rare disease", "150M globally",
    "25-50 per 100K", "1 in 2,000", "0.5% of population", "3-5% prevalence",
    "1:10,000 births", "20-40 cases/year", "500K new cases annually",
    "1.5% of adults", "8-12% in elderly", "0.1-0.3% prevalence"
]

TREATMENT_STATUSES = [
    "No approved therapy",
    "Limited treatment options", 
    "Off-label use only",
    "Symptomatic treatment only",
    "Standard therapy available",
    "Multiple approved treatments",
    "Investigational therapies in development",
    "Orphan drug designation",
    "Breakthrough therapy status",
    "Fast track designation",
    "Compassionate use available",
    "Clinical trials recruiting",
    "Phase III trials ongoing",
    "Unmet medical need",
    "Palliative care only",
    "Experimental treatments",
    "Device-based interventions",
    "Lifestyle modifications primary",
    "Combination therapy standard",
    "Precision medicine approaches"
]

SOURCE_OPTIONS = [
    ["PubMed", "ClinicalTrials.gov", "FDA Database"],
    ["Cochrane Reviews", "WHO Global Health Observatory", "CDC Statistics"],
    ["European Medicines Agency", "NIH Clinical Center", "Mayo Clinic Database"],
    ["National Cancer Institute", "Orphanet", "Global Burden of Disease Study"],
    ["American Heart Association", "Alzheimer's Association", "International Diabetes Federation"],
    ["Nature Medicine", "NEJM Evidence", "Lancet Digital Health"],
    ["Real-World Evidence", "Electronic Health Records", "Claims Database Analysis"],
    ["Meta-analysis", "Systematic Review", "Population Health Survey"],
    ["Registry Data", "Epidemiological Study", "Longitudinal Cohort"],
    ["Cross-sectional Survey", "Case-control Study", "Prospective Analysis"],
    ["Healthcare Analytics", "Insurance Claims", "Hospital Discharge Data"],
    ["Patient Reported Outcomes", "Quality of Life Studies", "Burden of Illness Research"],
    ["Genetic Consortium", "Biobank Analysis", "Precision Medicine Initiative"],
    ["Global Health Metrics", "Disease Surveillance", "Public Health Monitoring"],
    ["Pharmaceutical Research", "Clinical Development", "Regulatory Submission"]
]

@app.get("/")
async def root():
    return {"message": "GLP-1 Opportunity Finder API", "status": "running"}

@app.get("/literature-search")
async def literature_search(target: str = Query(..., description="Target molecule (e.g., GLP-1)")):
    """
    Search literature for diseases associated with the target molecule.
    Returns 4-8 diseases with basic information.
    """
    # Simulate API delay
    await asyncio.sleep(random.uniform(1.0, 2.5))
    
    if target not in MOCK_DISEASES:
        # Return a mix of diseases from different categories if target not found
        all_diseases = []
        for disease_list in MOCK_DISEASES.values():
            all_diseases.extend(disease_list)
        diseases = random.sample(all_diseases, min(len(all_diseases), 5))
    else:
        diseases = MOCK_DISEASES[target]
    
    # Return a random subset to simulate dynamic results (more variety)
    max_diseases = min(8, len(diseases))
    min_diseases = min(4, len(diseases))  # Don't require more diseases than available
    num_diseases = random.randint(min_diseases, max_diseases)
    selected_diseases = random.sample(diseases, num_diseases)
    
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