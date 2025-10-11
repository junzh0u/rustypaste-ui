import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadFileSection } from "@/components/sections/upload-file/UploadFileSection.tsx";
import { ShortenUrlSection } from "@/components/sections/shorten-url/ShortenUrlSection.tsx";

export function Sections() {
  return (
    <Tabs defaultValue="files" className="flex flex-col max-w-md w-full mt-4">
      <TabsList className="w-full hidden">
        <TabsTrigger value="files">Files</TabsTrigger>
        <TabsTrigger value="url">URL</TabsTrigger>
      </TabsList>
      <TabsContent value="files">
        <UploadFileSection />
      </TabsContent>
      <TabsContent value="url">
        <ShortenUrlSection />
      </TabsContent>
    </Tabs>
  );
}
