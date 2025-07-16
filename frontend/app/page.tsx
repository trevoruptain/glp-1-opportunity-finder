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

    try {
      const response = await fetch(`http://localhost:8005/literature-search?target=${encodeURIComponent(molecule)}`)
      if (!response.ok) throw new Error('Failed to fetch literature data')
      
      const data = await response.json()
      setDiseases(data.diseases)
      setActionStates((prev) => ({ ...prev, literature: "success" }))
    } catch (error) {
      console.error('Literature search failed:', error)
      setActionStates((prev) => ({ ...prev, literature: "error" }))
    }
  }

  const handlePrevalence = async () => {
    if (diseases.length === 0) return

    setActionStates((prev) => ({ ...prev, prevalence: "loading" }))

    try {
      const updatedDiseases = await Promise.all(
        diseases.map(async (disease) => {
          try {
            const response = await fetch(`http://localhost:8005/estimate-prevalence?disease_name=${encodeURIComponent(disease.name)}`)
            if (!response.ok) {
              // Handle 404 or other errors gracefully
              return {
                ...disease,
                prevalence: "Data not available",
                treatmentStatus: "Unknown",
                sources: ["Data source unavailable"],
              }
            }
            
            const prevalenceData = await response.json()
            return {
              ...disease,
              prevalence: prevalenceData.prevalence,
              treatmentStatus: prevalenceData.treatmentStatus,
              sources: prevalenceData.sources,
            }
          } catch (error) {
            console.error(`Failed to get prevalence for ${disease.name}:`, error)
            return {
              ...disease,
              prevalence: "Data not available",
              treatmentStatus: "Unknown",
              sources: ["Data source unavailable"],
            }
          }
        })
      )

      setDiseases(updatedDiseases)
      setActionStates((prev) => ({ ...prev, prevalence: "success" }))
    } catch (error) {
      console.error('Prevalence estimation failed:', error)
      setActionStates((prev) => ({ ...prev, prevalence: "error" }))
    }
  }

  const handlePrioritize = async () => {
    if (diseases.length === 0) return

    setActionStates((prev) => ({ ...prev, prioritize: "loading" }))

    try {
      const response = await fetch('http://localhost:8005/prioritize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diseases: diseases.map(d => d.name)
        }),
      })

      if (!response.ok) throw new Error('Failed to prioritize diseases')
      
      const data = await response.json()
      
      // Map the prioritized results back to our disease objects
      type PrioritizedData = { disease_name: string; priority_score: number; treatment_status: string }
      const prioritizedDiseasesMap = new Map<string, PrioritizedData>(
        data.prioritized_diseases.map((item: PrioritizedData) => [item.disease_name, item])
      )
      
      const updatedDiseases = diseases
        .map((disease) => {
          const prioritizedData = prioritizedDiseasesMap.get(disease.name)
          return {
            ...disease,
            priorityScore: prioritizedData?.priority_score || 0,
            treatmentStatus: prioritizedData?.treatment_status || disease.treatmentStatus,
          }
        })
        .sort((a, b) => b.priorityScore - a.priorityScore)

      setDiseases(updatedDiseases)
      setActionStates((prev) => ({ ...prev, prioritize: "success" }))
    } catch (error) {
      console.error('Disease prioritization failed:', error)
      setActionStates((prev) => ({ ...prev, prioritize: "error" }))
    }
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


