import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";

export function CopyButton({ text }: { text: string }) {
  const DEFAULT = "Copy";
  const COPIED = "Copied!";
  const [buttonText, setButtonText] = useState(DEFAULT);
  const run = useCallback(async () => {
    try {
      await copy(text);
    } catch {
      setButtonText("Error!");
    }
    setButtonText(COPIED);
    setTimeout(() => {
      setButtonText(DEFAULT);
    }, 1_000);
  }, [text]);
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button className="relative flex" onClick={run}>
          <div className="opacity-0 flex items-center justify-center gap-1" aria-hidden>
            <FaRegCopy />
            {COPIED}
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {buttonText === DEFAULT && <FaRegCopy />}
            {buttonText}
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Copy link to your clipboard.
      </TooltipContent>
    </Tooltip>
  );
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy to clipboard, ", error);
    throw error;
  }
}
