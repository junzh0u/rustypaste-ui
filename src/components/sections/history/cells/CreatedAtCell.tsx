import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { LuCalendar } from "react-icons/lu";
import { format, formatDistanceToNow } from "date-fns";

export function CreatedAtCell({ value }: { value: Date | null }) {
  return value ? (
    <Tooltip>
      <TooltipTrigger className="flex gap-2 items-center">
        <LuCalendar />
        <span>{formatDistanceToNow(value)} ago</span>
      </TooltipTrigger>
      <TooltipContent>
        {format(value, "Pp (O)")}
      </TooltipContent>
    </Tooltip>
  ) : "Unknown";
}
