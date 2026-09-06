export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="min-h-[70vh] bg-gray-300 animate-pulse flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 bg-gray-400 rounded w-full max-w-96 mx-auto"></div>
          <div className="h-6 bg-gray-400 rounded w-80 mx-auto"></div>
          <div className="h-12 bg-gray-400 rounded-full w-48 mx-auto"></div>
        </div>
      </div>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-4 animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
                <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
// This loading component provides a skeleton screen for the Get A Quote page,
// displaying a placeholder hero section with animated pulsing effects.