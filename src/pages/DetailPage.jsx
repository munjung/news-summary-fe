import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchNewsDetail } from '@/api/newsApi'
import BaseLayout from '@/components/BaseLayout'

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetchNewsDetail(id)
        setNews(res.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading || !news) return (
    <BaseLayout>
      <div className="text-center text-gray-400 py-20">불러오는 중...</div>
    </BaseLayout>
  )

  return (
    <BaseLayout>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
      >
        ← 목록으로
      </button>

      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-52 object-cover rounded-xl mb-6"
        />
      )}

      <span className="source-label">{news.source}</span>
      <h1 className="text-xl font-bold text-gray-900 mt-1 mb-4">{news.title}</h1>

      <div className="summary-box mb-6">
        <p className="summary-title">AI 요약</p>
        <p className="summary-content">{news.summary}</p>
      </div>

      <a
        href={news.url}
        target="_blank"
        rel="noreferrer"
        className="btn-dark"
      >
        원문 보기 →
      </a>

      <p className="date-label text-center mt-4">
        {new Date(news.publishedAt).toLocaleDateString('ko-KR')}
      </p>
    </BaseLayout>
  )
}

export default DetailPage