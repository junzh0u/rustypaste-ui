import type { CellContext } from "@tanstack/react-table";
import type { ListItem } from "@/api/getList.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { filesize } from "filesize";

type FileSizeCellProps = CellContext<ListItem, number | null>

export function FileSizeCell(props: FileSizeCellProps) {
  const value = props.getValue();
  return value
         ? (
           <Tooltip>
             <TooltipTrigger className="truncate max-w-56">
               {filesize(value, { round: 1, pad: true, standard: "iec" })}
             </TooltipTrigger>
             <TooltipContent>
               {value} bytes
             </TooltipContent>
           </Tooltip>
         )
         : "-";
}
