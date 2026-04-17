import { useState } from "react";
import { fetchNewsByPeriod } from "@/api/newsApi";

function PeriodFetchModal({ onClose, onSuccess }) {
  const today = new Date();
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const toStr = (d) => d.toISOString().split("T")[0];

  const [from, setFrom] = useState(toStr(oneMonthAgo));
  const [to, setTo] = useState(toStr(today));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDates = () => {
    const dates = [];
    const cursor = new Date(oneMonthAgo);
    while (cursor <= today) {
      dates.push(toStr(new Date(cursor)));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  };

  const dates = getDates();

  const formatLabel = (str) => {
    const d = new Date(str);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const handleSubmit = async () => {
    if (!from || !to) {
      setError("날짜를 모두 선택해주세요.");
      return;
    }
    if (from > to) {
      setError("시작일이 종료일보다 늦을 수 없어요.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetchNewsByPeriod(from, to);
      onSuccess(res.data.data);
      onClose();
    } catch (e) {
      setError("뉴스를 가져오는 데 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 className="modal-title">기간별 뉴스 가져오기</h2>

        <div className="flex flex-col gap-2">
          <label className="form-label">시작일</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="form-select"
          >
            {dates.map((d) => (
              <option key={d} value={d}>
                {formatLabel(d)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="form-label">종료일</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="form-select"
          >
            {dates.map((d) => (
              <option key={d} value={d}>
                {formatLabel(d)}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button onClick={onClose} className="btn-cancel">
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-submit"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                가져오는 중...
              </span>
            ) : (
              "가져오기"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeriodFetchModal;
