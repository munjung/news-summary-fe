import BaseLayout from "@/components/BaseLayout";

function VocabPage() {
  return (
    <BaseLayout>
      <h1 className="page-title mb-6">단어장</h1>
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <span style={{ fontSize: "40px" }}>📖</span>
        <p className="text-sm text-gray-400">단어장 기능을 준비 중이에요.</p>
      </div>
    </BaseLayout>
  );
}
export default VocabPage;
