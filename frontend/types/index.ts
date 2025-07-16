export interface Disease {
  id: string
  name: string
  prevalence: string
  treatmentStatus: string
  priorityScore: number
  sources: string[]
  summary: string
  citations: string[]
}

export interface ActionState {
  literature: "idle" | "loading" | "success" | "error"
  prevalence: "idle" | "loading" | "success" | "error"
  prioritize: "idle" | "loading" | "success" | "error"
}
