import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadFileSection } from "@/components/sections/upload-file/UploadFileSection.tsx";
import { ShortenUrlSection } from "@/components/sections/shorten-url/ShortenUrlSection.tsx";
import { HistorySection } from "@/components/sections/history/HistorySection.tsx";

export function Sections() {
  return (
    <Tabs defaultValue="history" className="flex flex-col items-center w-full mt-4">
      <TabsList className="w-full max-w-md">
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="files">Upload</TabsTrigger>
        <TabsTrigger value="url" className="hidden">URL</TabsTrigger>
      </TabsList>
      <TabsContent value="files"  className="w-full max-w-md">
        <UploadFileSection />
      </TabsContent>
      <TabsContent value="url"  className="w-full max-w-md">
        <ShortenUrlSection />
      </TabsContent>
      <TabsContent value="history" className="w-full max-w-5xl">
        <HistorySection />
      </TabsContent>
    </Tabs>
  );
}
