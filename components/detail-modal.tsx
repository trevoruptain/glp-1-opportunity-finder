"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, FileText, TrendingUp, Pill, Target } from "lucide-react"
import type { Disease } from "@/types"

interface DetailModalProps {
  disease: Disease
  onClose: () => void
}

export function DetailModal({ disease, onClose }: DetailModalProps) {
  const getPriorityColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    if (score >= 40) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getPriorityLabel = (score: number) => {
    if (score >= 80) return "High Priority"
    if (score >= 60) return "Medium-High Priority"
    if (score >= 40) return "Medium Priority"
    return "Low Priority"
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>{disease.name}</span>
          </DialogTitle>
          <DialogDescription>Detailed analysis and research summary</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Priority Score */}
          {disease.priorityScore > 0 && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Priority Assessment</h3>
                <p className="text-sm text-gray-600">{getPriorityLabel(disease.priorityScore)}</p>
              </div>
              <Badge className={getPriorityColor(disease.priorityScore)}>{disease.priorityScore}/100</Badge>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disease.prevalence && (
              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Prevalence</h4>
                  <p className="text-sm text-gray-600">{disease.prevalence}</p>
                </div>
              </div>
            )}

            {disease.treatmentStatus && (
              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <Pill className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Treatment Landscape</h4>
                  <p className="text-sm text-gray-600">{disease.treatmentStatus}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Disease Summary */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Disease Overview</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{disease.summary}</p>
          </div>

          <Separator />

          {/* Research Citations */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Key Research Citations</h3>
            <div className="space-y-2">
              {disease.citations.map((citation, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{citation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          {disease.sources.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Data Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {disease.sources.map((source, index) => (
                    <Badge key={index} variant="outline">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* AI Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">AI Analysis Summary</h3>
            <p className="text-sm text-blue-800">
              Based on current literature, {disease.name.toLowerCase()} shows potential as a GLP-1 target indication due
              to metabolic pathway involvement and unmet medical need. Further research into mechanism of action and
              clinical feasibility is recommended.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Export Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
