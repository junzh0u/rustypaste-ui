import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { twMerge } from "tailwind-merge";
import { AiOutlineCloudUpload } from "react-icons/ai";

type UploadDropzoneProps = {
  uploadFile: (file: File) => Promise<void>
}

export function UploadDropzone({ uploadFile }: UploadDropzoneProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const acceptedFile of acceptedFiles) {
      void uploadFile(acceptedFile);
    }
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card {...getRootProps()} className={twMerge(
      "border-dashed cursor-pointer hover:bg-slate-50 transition-colors",
      isDragActive && "bg-slate-100 border-slate-500",
    )}>
      <CardContent className="flex flex-col items-center justify-center h-32 gap-2">
        <input {...getInputProps()} />
        <AiOutlineCloudUpload className="size-10" />
        <p className="text-sm text-center">
          {isDragActive
           ? <>Drop & Drop files here...</>
           : <>Drop & Drop or click to upload files.</>}
        </p>
      </CardContent>
    </Card>
  );
}
