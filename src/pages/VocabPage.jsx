import { useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { useVocab } from "@/hooks/useVocab";

function VocabItem({ item, onRemove, onUpdateNote }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(item.note || '')

  const handleSave = () => {
    onUpdateNote(item.word, draft)
    setEditing(false)
  }

  return (
    <li className="px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{item.word}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(item.date).toLocaleDateString('ko-KR')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing((v) => !v)}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            {editing ? '취소' : '메모'}
          </button>
          <button
            onClick={() => onRemove(item.word)}
            className="text-gray-300 hover:text-red-400 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>

      {!editing && item.note && (
        <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 whitespace-pre-wrap">
          {item.note}
        </p>
      )}

      {editing && (
        <div className="mt-2 flex flex-col gap-2">
          <textarea
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-gray-400"
            rows={3}
            placeholder="공부한 내용을 적어보세요"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="self-end text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700"
          >
            저장
          </button>
        </div>
      )}
    </li>
  )
}

function VocabPage() {
  const { vocabList, removeWord, updateNote } = useVocab()

  return (
    <BaseLayout>
      <h1 className="page-title mb-6">단어장</h1>

      {vocabList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <span style={{ fontSize: "40px" }}>📖</span>
          <p className="text-sm text-gray-400">뉴스를 읽으면서 단어를 추가해보세요.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {vocabList.map((item) => (
            <VocabItem
              key={item.word}
              item={item}
              onRemove={removeWord}
              onUpdateNote={updateNote}
            />
          ))}
        </ul>
      )}
    </BaseLayout>
  );
}

export default VocabPage;
