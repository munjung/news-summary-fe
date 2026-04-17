import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNewsList } from "@/api/newsApi";
import NewsCard from "@/components/NewsCard";
import BaseLayout from "@/components/BaseLayout";
import PeriodFetchModal from "@/components/PeriodFetchModel";
import SkeletonCard from "@/components/SkeletonCard";

function HomePage() {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [listLoading, setListLoading] = useState(false);

  const navigate = useNavigate();

  const loadNews = async (p = 0) => {
    setListLoading(true);
    try {
      const res = await fetchNewsList(p);
      setNewsList(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadNews(page);
  }, [page]);

  const handleSuccess = (message) => {
    setSuccessMsg(message);
    loadNews(0); // 목록 새로고침
    setPage(0);
    setTimeout(() => setSuccessMsg(""), 3000); // 3초 후 메시지 사라짐
  };

  return (
    <BaseLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">오늘의 경제 뉴스</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          뉴스 가져오기
        </button>
      </div>

      {successMsg && (
        <div className="mb-4 px-4 py-3 bg-green-50 text-green-700 text-sm rounded-xl">
          {successMsg}
        </div>
      )}

      {listLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {newsList.map((news) => (
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
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
          className="btn-primary"
        >
          이전
        </button>
        <span className="text-sm text-gray-500">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages - 1}
          className="btn-primary"
        >
          다음
        </button>
      </div>

      {showModal && (
        <PeriodFetchModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </BaseLayout>
  );
}

export default HomePage;
