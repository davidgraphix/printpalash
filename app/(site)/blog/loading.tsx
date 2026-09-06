export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16 animate-pulse">
          {[...Array(10)].map((_, i) => (
            <article key={i} className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
// This loading component provides a skeleton screen for the blog page,
// displaying a series of placeholder articles with animated pulsing effects.