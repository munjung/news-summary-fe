function BaseLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <a href="/" className="text-base font-bold text-gray-900">
            📰 경제 뉴스 요약
          </a>
        </div>
      </header>
      <main className="page-container">
        {children}
      </main>
    </div>
  )
}

export default BaseLayout