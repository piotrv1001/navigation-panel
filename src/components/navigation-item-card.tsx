"use client";

import { NavigationItem } from "@/types/navigation-item";
import { MoveIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigationContext } from "@/contexts/navigation-context";

type NavigationItemCardProps = {
  navigationItem: NavigationItem;
  level: number;
};

export default function NavigationItemCard({
  navigationItem,
  level,
}: NavigationItemCardProps) {
  const { onAddMenuItemClick, onEditClick, onDeleteClick } =
    useNavigationContext();
  return (
    <div
      style={{
        marginLeft: `${level * 16}px`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <MoveIcon className="size-5 text-[#475467]" />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-[#101828] text-sm font-semibold">
              {navigationItem.name}
            </h1>
            <p className="text-[#475467] text-sm">{navigationItem.link}</p>
          </div>
        </div>
        <div className="flex">
          <Button
            variant="outline"
            className="rounded-r-none"
            onClick={() => onDeleteClick(navigationItem.id)}
          >
            Usuń
          </Button>
          <Button
            variant="outline"
            className="rounded-none"
            onClick={() => onEditClick(navigationItem.id)}
          >
            Edytuj
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none"
            onClick={() => onAddMenuItemClick(navigationItem.id)}
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>
    </div>
  );
}
