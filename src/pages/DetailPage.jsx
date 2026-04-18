import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchNewsDetail } from '@/api/newsApi'
import BaseLayout from '@/components/BaseLayout'
import { useVocab } from '@/hooks/useVocab'

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState(null) // { word, x, y }
  const { addWord } = useVocab()
  const popupRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopup(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showPopupFromSelection = () => {
    const selection = window.getSelection()
    const word = selection?.toString().trim()
    if (!word) {
      setPopup(null)
      return
    }
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    setPopup({ word, x: rect.left + rect.width / 2, y: rect.top - 8 })
  }

  const handleAddVocab = () => {
    if (!popup) return
    addWord(popup.word)
    setPopup(null)
    window.getSelection()?.removeAllRanges()
  }

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

      <div className="summary-box mb-6" onMouseUp={showPopupFromSelection} onTouchEnd={showPopupFromSelection}>
        <p className="summary-title">AI 요약</p>
        <p className="summary-content select-text">{news.summary}</p>
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

      {popup && (
        <div
          ref={popupRef}
          style={{
            position: 'fixed',
            top: popup.y,
            left: popup.x,
            transform: 'translate(-50%, -100%)',
            zIndex: 50,
          }}
          className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg cursor-pointer hover:bg-gray-700 whitespace-nowrap"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleAddVocab}
        >
          단어장 추가 +
        </div>
      )}
    </BaseLayout>
  )
}

export default DetailPage
