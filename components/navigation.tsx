import { Dna } from "lucide-react"

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Dna className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">GLP-1 Opportunity Finder</h1>
              <p className="text-sm text-gray-500">Discover novel therapeutic indications</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">Research Tool v1.0</div>
        </div>
      </div>
    </nav>
  )
}
