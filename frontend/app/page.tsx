"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { InputPanel } from "@/components/input-panel"
import { ResultsPanel } from "@/components/results-panel"
import { DetailModal } from "@/components/detail-modal"
import type { Disease, ActionState } from "@/types"

export default function Home() {
  const [molecule, setMolecule] = useState("GLP-1")
  const [diseases, setDiseases] = useState<Disease[]>([])
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [actionStates, setActionStates] = useState<ActionState>({
    literature: "idle",
    prevalence: "idle",
    prioritize: "idle",
  })

  const handleRestart = () => {
    setMolecule("GLP-1")
    setDiseases([])
    setSelectedDisease(null)
    setActionStates({
      literature: "idle",
      prevalence: "idle",
      prioritize: "idle",
    })
  }

  const handleSearch = async () => {
    setActionStates((prev) => ({ ...prev, literature: "loading" }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockDiseases: Disease[] = [
      {
        id: "1",
        name: "Alzheimer's Disease",
        prevalence: "",
        treatmentStatus: "",
        priorityScore: 0,
        sources: [],
        summary: "Neurodegenerative disorder characterized by progressive cognitive decline.",
        citations: ["Nature Medicine 2023", "Cell Metabolism 2022"],
      },
      {
        id: "2",
        name: "Non-Alcoholic Fatty Liver Disease",
        prevalence: "",
        treatmentStatus: "",
        priorityScore: 0,
        sources: [],
        summary: "Liver condition not caused by alcohol consumption, linked to metabolic dysfunction.",
        citations: ["Hepatology 2023", "Gastroenterology 2022"],
      },
      {
        id: "3",
        name: "Polycystic Ovary Syndrome",
        prevalence: "",
        treatmentStatus: "",
        priorityScore: 0,
        sources: [],
        summary: "Hormonal disorder affecting reproductive-aged women.",
        citations: ["Endocrine Reviews 2023", "JCEM 2022"],
      },
      {
        id: "4",
        name: "Inflammatory Bowel Disease",
        prevalence: "",
        treatmentStatus: "",
        priorityScore: 0,
        sources: [],
        summary: "Chronic inflammatory condition of the digestive tract.",
        citations: ["Nature Reviews Gastroenterology 2023"],
      },
    ]

    setDiseases(mockDiseases)
    setActionStates((prev) => ({ ...prev, literature: "success" }))
  }

  const handlePrevalence = async () => {
    if (diseases.length === 0) return

    setActionStates((prev) => ({ ...prev, prevalence: "loading" }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const updatedDiseases = diseases.map((disease) => ({
      ...disease,
      prevalence: getRandomPrevalence(),
      treatmentStatus: getRandomTreatmentStatus(),
      sources: ["PubMed", "ClinicalTrials.gov", "FDA Database"],
    }))

    setDiseases(updatedDiseases)
    setActionStates((prev) => ({ ...prev, prevalence: "success" }))
  }

  const handlePrioritize = async () => {
    if (diseases.length === 0) return

    setActionStates((prev) => ({ ...prev, prioritize: "loading" }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedDiseases = diseases
      .map((disease) => ({
        ...disease,
        priorityScore: Math.floor(Math.random() * 100) + 1,
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore)

    setDiseases(updatedDiseases)
    setActionStates((prev) => ({ ...prev, prioritize: "success" }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          <div className="lg:col-span-4">
            <InputPanel
              molecule={molecule}
              setMolecule={setMolecule}
              onSearch={handleSearch}
              onPrevalence={handlePrevalence}
              onPrioritize={handlePrioritize}
              onRestart={handleRestart}
              actionStates={actionStates}
              hasData={diseases.length > 0}
            />
          </div>

          <div className="lg:col-span-8">
            <ResultsPanel diseases={diseases} onRowClick={setSelectedDisease} />
          </div>
        </div>
      </main>

      {selectedDisease && <DetailModal disease={selectedDisease} onClose={() => setSelectedDisease(null)} />}
    </div>
  )
}

function getRandomPrevalence(): string {
  const values = ["2.1M in US", "5.8M in US", "12.3M in US", "850K in US", "3.2M in US"]
  return values[Math.floor(Math.random() * values.length)]
}

function getRandomTreatmentStatus(): string {
  const statuses = [
    "No approved therapy",
    "Limited treatment options",
    "Off-label use only",
    "Symptomatic treatment only",
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}
