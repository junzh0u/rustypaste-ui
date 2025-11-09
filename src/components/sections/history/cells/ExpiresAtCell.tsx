import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { LuCalendarClock } from "react-icons/lu";
import { format, formatDistanceToNow } from "date-fns";

export function ExpiresAtCell({ value }: { value: Date | null }) {
  return value ? (
    <Tooltip>
      <TooltipTrigger className="flex gap-2 items-center">
        <LuCalendarClock />
        <span>in {formatDistanceToNow(value)}</span>
      </TooltipTrigger>
      <TooltipContent>
        {format(value, "Pp (O)")}
      </TooltipContent>
    </Tooltip>
  ) : "Never";
}
