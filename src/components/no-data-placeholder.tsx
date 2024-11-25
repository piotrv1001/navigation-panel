"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CirclePlusIcon } from "lucide-react";

type NoDataPlaceholderProps = {
  className?: string;
  onAddMenuItemClick: () => void;
};

export default function NoDataPlaceholder({
  className,
  onAddMenuItemClick,
}: NoDataPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-[#F9FAFB] border-[#EAECF0] px-4 py-6 flex flex-col items-center rounded-md",
        className
      )}
    >
      <div className="space-y-1 flex flex-col items-center">
        <h1 className="text-[#101828] text-base font-semibold">
          Menu jest puste
        </h1>
        <p className="text-[#475467] text-sm">
          W tym menu nie ma jeszcze żadnych linków
        </p>
      </div>
      <Button className="mt-4" onClick={onAddMenuItemClick}>
        <CirclePlusIcon className="w-5 h-5" />
        Dodaj pozycję menu
      </Button>
    </div>
  );
}
