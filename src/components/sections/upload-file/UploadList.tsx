import type { UploadState } from "@/components/sections/upload-file/useFileUploads.ts";
import { Button } from "@/components/ui/button.tsx";
import { filesize } from "filesize";
import { IoClose } from "react-icons/io5";
import { Spinner } from "@/components/ui/spinner.tsx";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { TbCancel } from "react-icons/tb";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Progress } from "@/components/ui/progress.tsx";
import { twMerge } from "tailwind-merge";
import { Input } from "@/components/ui/input.tsx";
import { CopyButton } from "@/components/sections/upload-file/CopyButton.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";

type UploadListProps = {
  files: readonly UploadState[]
  removeFile: (id: number) => void
}

export function UploadList({ files, removeFile }: UploadListProps) {
  const queued = files.filter(f => f.state === "queued" || f.state === "uploading");
  const completed = files.filter(f => f.state === "uploaded" || f.state === "errored" || f.state === "canceled");
  const showHeaders = queued.length > 0 && completed.length > 0;

  return (
    <>
      <section>
        {showHeaders && <h2 className="font-medium mb-1">Queue</h2>}
        <ol>
          {queued.map((file) => (
            <UploadedItem key={file.id} upload={file} removeFile={removeFile} />
          ))}
        </ol>
      </section>
      <section>
        {showHeaders && <h2 className="font-medium mb-1">Completed</h2>}
        <ol>
          {completed.map((file) => (
            <UploadedItem key={file.id} upload={file} removeFile={removeFile} />
          ))}
        </ol>
      </section>
    </>
  );
}

function UploadedItem({ upload, removeFile }: { upload: UploadState, removeFile: (id: number) => void }) {

  // if (1 + 1 == 2) {
  //   upload = {
  //     ...upload,
  //     state: "queued",
  //     abort: new AbortController(),
  //   };
  // }

  return (
    <li
      className={twMerge(
        "mb-2",
        "relative flex items-center border text-sm rounded-md flex-wrap outline-none",
        "transition-colors duration-100",
        "p-4 gap-4",
      )}>
      <div className="flex flex-1 flex-col gap-1 w-full overflow-hidden">
        <div className="flex gap-2 w-full items-center">
          <div>
            {(upload.state == "queued" || upload.state === "uploading") && (
              <Spinner className="size-6" />
            )}
            {upload.state == "uploaded" && (
              <IoIosCheckmarkCircleOutline className="size-6" />
            )}
            {upload.state == "canceled" && (
              <TbCancel className="size-6" />
            )}
            {upload.state == "errored" && (
              <MdOutlineErrorOutline className="size-6 text-red-600" />
            )}
          </div>
          <div className="text-sm leading-snug font-medium truncate me-4">
            {upload.file.name}
          </div>
        </div>
        <div className={twMerge(
          "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        )}>
          {upload.state == "canceled" && (
            <span className="text-slate-400">Canceled</span>
          )}
          {upload.state == "errored" && (
            <span className="text-red-600 text-xs">Error: {upload.error}</span>
          )}
          {upload.state == "uploaded" && (
            <div className="p-1 flex flex-col sm:flex-row gap-2 items-center">
              <Input type="text" value={upload.url} readOnly />
              <CopyButton text={upload.url} />
            </div>
          )}
          {(upload.state == "uploading" || upload.state === "queued") && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <Progress value={upload.state === "uploading" ? upload.progress * 100 : 0} />
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => {
                        upload.abort.abort("Canceled by user.");
                      }}
                      aria-label="Cancel in-progress upload">
                      <TbCancel />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Cancel upload.
                  </TooltipContent>
                </Tooltip>
              </div>
              {upload.state === "queued" && (
                <div className="text-xs flex flex-col">
                  <div>
                    Queued...
                  </div>
                  <div className="flex">
                    {filesize(Math.round(upload.file.size))}
                  </div>
                </div>
              )}
              {upload.state === "uploading" && (
                <div className="text-xs flex flex-col">
                  <div>
                    {upload.bytesPerSecond ? filesize(Math.round(upload.bytesPerSecond), { bits: true, standard: "jedec" }) + "/s" : "Starting..."}
                    {!!upload.estimatedSecondsRemaining && (
                      <>
                        , {Math.round(upload.estimatedSecondsRemaining)}s remaining
                      </>
                    )}
                  </div>
                  <div className="flex">
                    {filesize(Math.round(upload.progress * upload.file.size))}
                    <span className="mx-1">of</span>
                    {filesize(upload.file.size)} uploaded
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(upload.state === "canceled" || upload.state === "errored" || upload.state === "uploaded") && (
        <div className="absolute top-1 right-1">
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="link"
                size="sm"
                className="opacity-60 hover:opacity-100"
                onClick={() => {
                  removeFile(upload.id);
                }}
                aria-label="Remove from list">
                <IoClose />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Remove up from this list.
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </li>
  );
}
