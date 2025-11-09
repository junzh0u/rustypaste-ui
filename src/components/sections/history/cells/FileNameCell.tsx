import type { CellContext } from "@tanstack/react-table";
import type { ListItem } from "@/api/getList.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { MdOutlineInsertDriveFile } from "react-icons/md";

type FileNameCellProps = CellContext<ListItem, string>

export function FileNameCell(props: FileNameCellProps) {
  const value = props.getValue();
  const url = props.row.original.url;
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-2">
        <MdOutlineInsertDriveFile />
        <a className="truncate max-w-72 hover:underline active:underline focus:underline"
           href={url}
           target="_blank"
           rel="noreferrer noopener">
          {value}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        {value}
      </TooltipContent>
    </Tooltip>
  );
}
