"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Search, TrendingUp, Target, CheckCircle, XCircle } from "lucide-react"
import type { ActionState } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InputPanelProps {
  molecule: string
  onSearch: () => void
  onPrevalence: () => void
  onPrioritize: () => void
  onRestart: () => void
  actionStates: ActionState
  hasData: boolean
  setMolecule: (value: string) => void
}

export function InputPanel({
  molecule,
  onSearch,
  onPrevalence,
  onPrioritize,
  onRestart,
  actionStates,
  hasData,
  setMolecule,
}: InputPanelProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <span>Research Parameters</span>
        </CardTitle>
        <CardDescription>Enter your target molecule and run analysis steps</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="molecule">Target Molecule</Label>
          <Select value={molecule} onValueChange={setMolecule} disabled={actionStates.literature !== "idle"}>
            <SelectTrigger>
              <SelectValue placeholder="Select a target molecule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GLP-1">GLP-1 (Glucagon-like peptide-1)</SelectItem>
              <SelectItem value="SGLT2">SGLT2 (Sodium-glucose cotransporter-2)</SelectItem>
              <SelectItem value="DPP-4">DPP-4 (Dipeptidyl peptidase-4)</SelectItem>
              <SelectItem value="GIP">GIP (Glucose-dependent insulinotropic polypeptide)</SelectItem>
              <SelectItem value="PCSK9">PCSK9 (Proprotein convertase subtilisin/kexin type 9)</SelectItem>
              <SelectItem value="AMPK">AMPK (AMP-activated protein kinase)</SelectItem>
              <SelectItem value="FGF21">FGF21 (Fibroblast growth factor 21)</SelectItem>
              <SelectItem value="GCG">GCG (Glucagon receptor)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Analysis Steps</h3>

          <ActionButton
            onClick={onSearch}
            state={actionStates.literature}
            icon={Search}
            title="Search Literature"
            description="Find diseases associated with your target"
            step={1}
            disabled={actionStates.literature === "success"}
          />

          <ActionButton
            onClick={onPrevalence}
            state={actionStates.prevalence}
            icon={TrendingUp}
            title="Estimate Prevalence"
            description="Get prevalence data for each indication"
            step={2}
            disabled={actionStates.literature !== "success" || actionStates.prevalence === "success"}
          />

          <ActionButton
            onClick={onPrioritize}
            state={actionStates.prioritize}
            icon={Target}
            title="Prioritize Indications"
            description="Rank opportunities by multiple factors"
            step={3}
            disabled={actionStates.prevalence !== "success" || actionStates.prioritize === "success"}
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Progress:</p>
            <div className="space-y-1">
              <ProgressStep completed={actionStates.literature === "success"} text="Literature search" />
              <ProgressStep completed={actionStates.prevalence === "success"} text="Prevalence analysis" />
              <ProgressStep completed={actionStates.prioritize === "success"} text="Indication ranking" />
            </div>
          </div>
        </div>

        {(actionStates.literature !== "idle" ||
          actionStates.prevalence !== "idle" ||
          actionStates.prioritize !== "idle") && (
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={onRestart}
              variant="outline"
              className="w-full bg-transparent"
              disabled={
                actionStates.literature === "loading" ||
                actionStates.prevalence === "loading" ||
                actionStates.prioritize === "loading"
              }
            >
              <Target className="h-4 w-4 mr-2" />
              Start New Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ActionButtonProps {
  onClick: () => void
  state: "idle" | "loading" | "success" | "error"
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  step: number
  disabled?: boolean
}

function ActionButton({ onClick, state, icon: Icon, title, description, step, disabled }: ActionButtonProps) {
  const getStateIcon = () => {
    switch (state) {
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Icon className="h-4 w-4" />
    }
  }

  const getButtonVariant = () => {
    if (state === "success") return "outline"
    if (state === "error") return "destructive"
    return "default"
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={onClick}
        disabled={disabled || state === "loading"}
        variant={getButtonVariant()}
        className="w-full justify-start h-auto p-4"
      >
        <div className="flex items-center space-x-3 w-full">
          <div className="flex items-center justify-center w-8 h-8 min-w-8 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold flex-shrink-0">
            {step}
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-gray-500">{description}</div>
          </div>
          {getStateIcon()}
        </div>
      </Button>
    </div>
  )
}

function ProgressStep({ completed, text }: { completed: boolean; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${completed ? "bg-green-500" : "bg-gray-300"}`} />
      <span className={completed ? "text-green-700" : "text-gray-500"}>{text}</span>
    </div>
  )
}
