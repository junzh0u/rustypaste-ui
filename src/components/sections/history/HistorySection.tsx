import { useList } from "@/components/sections/history/useList.ts";
import { HistoryTable } from "@/components/sections/history/HistoryTable.tsx";

export function HistorySection() {

  const { list, isLoading } = useList();

  return (
    <div className="flex flex-col gap-4 mt-4">
      <HistoryTable data={list} isLoading={isLoading} />
    </div>
  );
}
