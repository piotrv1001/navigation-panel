import { NavigationItem } from "@/types/navigation-item";
import CardWrapper from "./card-wrapper";
import { MoveIcon } from "lucide-react";
import { Button } from "./ui/button";

type NavigationItemCardProps = {
  navigationItem: NavigationItem;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onAddMenuItemClick: () => void;
};

export default function NavigationItemCard({
  navigationItem,
  onDeleteClick,
  onEditClick,
  onAddMenuItemClick,
}: NavigationItemCardProps) {
  return (
    <CardWrapper>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <MoveIcon className="size-5 text-[#475467]" />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-[#101828] text-sm font-semibold">{navigationItem.name}</h1>
            <p className="text-[#475467] text-sm">{navigationItem.link}</p>
          </div>
        </div>
        <div className="flex">
          <Button
            variant="outline"
            className="rounded-r-none"
            onClick={onDeleteClick}
          >
            Usuń
          </Button>
          <Button
            variant="outline"
            className="rounded-none"
            onClick={onEditClick}
          >
            Edytuj
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none"
            onClick={onAddMenuItemClick}
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
}
