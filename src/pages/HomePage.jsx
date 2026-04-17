import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchNewsList } from '@/api/newsApi'
import NewsCard from '@/components/NewsCard'
import BaseLayout from '@/components/BaseLayout'

function HomePage() {
  const [newsList, setNewsList] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetchNewsList(page)
        setNewsList(res.data.data.content)
        setTotalPages(res.data.data.totalPages)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page])

  return (
    <BaseLayout>
      <h1 className="page-title mb-6">오늘의 경제 뉴스</h1>

      {loading ? (
        <div className="text-center text-gray-400 py-20">불러오는 중...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {newsList.map(news => (
            <NewsCard
              key={news.id}
              news={news}
              onClick={() => navigate(`/news/${news.id}`)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0}
          className="btn-primary"
        >
          이전
        </button>
        <span className="text-sm text-gray-500">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= totalPages - 1}
          className="btn-primary"
        >
          다음
        </button>
      </div>
    </BaseLayout>
  )
}

export default HomePage