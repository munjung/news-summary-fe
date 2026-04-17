function NewsCard({ news, onClick }) {
  return (
    <div
      onClick={onClick}
      className="news-card"
    >
      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-28 h-20 object-cover rounded-lg flex-shrink-0"
        />
      )}
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs text-blue-500 font-medium">{news.source}</span>
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{news.title}</h2>
        <p className="text-xs text-gray-500 line-clamp-2">{news.summary}</p>
        <span className="text-xs text-gray-400 mt-auto">
          {new Date(news.publishedAt).toLocaleDateString('ko-KR')}
        </span>
      </div>
    </div>
  )
}

export default NewsCard