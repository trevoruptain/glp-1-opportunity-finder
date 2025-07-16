"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, BarChart3, ExternalLink, ArrowUpDown, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Disease } from "@/types"

interface ResultsPanelProps {
  diseases: Disease[]
  onRowClick: (disease: Disease) => void
}

export function ResultsPanel({ diseases, onRowClick }: ResultsPanelProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof Disease>("priorityScore")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const itemsPerPage = 10
  const totalPages = Math.ceil(diseases.length / itemsPerPage)

  const sortedDiseases = [...diseases].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const paginatedDiseases = sortedDiseases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: keyof Disease) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getPriorityColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 hover:bg-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    if (score >= 40) return "bg-orange-100 text-orange-800 hover:bg-orange-200"
    return "bg-red-100 text-red-800 hover:bg-red-200"
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Indication Results</span>
          {diseases.length > 0 && <Badge variant="secondary">{diseases.length} found</Badge>}
        </CardTitle>
        <CardDescription>
          {diseases.length === 0
            ? "Run literature search to discover potential indications"
            : "Click on any row to view detailed information"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {diseases.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No results yet</p>
              <p className="text-sm">Start by searching literature for your target molecule</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <SortableHeader
                        field="name"
                        currentField={sortField}
                        direction={sortDirection}
                        onSort={handleSort}
                        tooltip="Disease or condition name"
                      >
                        Disease Name
                      </SortableHeader>
                    </TableHead>
                    <TableHead>
                      <SortableHeader
                        field="prevalence"
                        currentField={sortField}
                        direction={sortDirection}
                        onSort={handleSort}
                        tooltip="Estimated patient population"
                      >
                        Prevalence
                      </SortableHeader>
                    </TableHead>
                    <TableHead>
                      <SortableHeader
                        field="treatmentStatus"
                        currentField={sortField}
                        direction={sortDirection}
                        onSort={handleSort}
                        tooltip="Current treatment landscape"
                      >
                        Treatment Status
                      </SortableHeader>
                    </TableHead>
                    <TableHead>
                      <SortableHeader
                        field="priorityScore"
                        currentField={sortField}
                        direction={sortDirection}
                        onSort={handleSort}
                        tooltip="Composite score based on multiple factors"
                      >
                        Priority Score
                      </SortableHeader>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-1">
                        <span>Sources</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3 w-3 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Data sources and references</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDiseases.map((disease) => (
                    <TableRow
                      key={disease.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => onRowClick(disease)}
                    >
                      <TableCell className="font-medium">{disease.name}</TableCell>
                      <TableCell>
                        {disease.prevalence || <span className="text-gray-400 italic">Pending</span>}
                      </TableCell>
                      <TableCell>
                        {disease.treatmentStatus || <span className="text-gray-400 italic">Pending</span>}
                      </TableCell>
                      <TableCell>
                        {disease.priorityScore > 0 ? (
                          <Badge className={getPriorityColor(disease.priorityScore)}>{disease.priorityScore}</Badge>
                        ) : (
                          <span className="text-gray-400 italic">Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {disease.sources.length > 0 ? (
                          <div className="flex items-center space-x-1">
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{disease.sources.length} sources</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Pending</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, diseases.length)} of {diseases.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface SortableHeaderProps {
  field: keyof Disease
  currentField: keyof Disease
  direction: "asc" | "desc"
  onSort: (field: keyof Disease) => void
  children: React.ReactNode
  tooltip: string
}

function SortableHeader({ field, currentField, direction, onSort, children, tooltip }: SortableHeaderProps) {
  const isActive = currentField === field

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 font-medium hover:bg-transparent"
            onClick={() => onSort(field)}
          >
            <div className="flex items-center space-x-1">
              <span>{children}</span>
              <ArrowUpDown className={`h-3 w-3 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
