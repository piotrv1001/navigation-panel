import { NavigationItem } from "@/types/navigation-item";
import React from "react";
import NavigationItemCard from "./navigation-item-card";
import NavigationForm, { NavigationFormData } from "./navigation-form";
import SortableItem from "./sortable-item";

type NavigationListProps = {
  items: NavigationItem[];
  onSubmit: (data: NavigationFormData) => void;
  onCancel: (id: string) => void;
  level?: number;
};

export default function NavigationList({
  items,
  onSubmit,
  onCancel,
  level = 0,
}: NavigationListProps) {
  return (
    <div>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === "item" ? (
            <SortableItem itemId={item.id}>
              <NavigationItemCard navigationItem={item} level={level} />
            </SortableItem>
          ) : (
            <div
              className="p-3 border-b"
              style={{
                paddingLeft: `${level * 24 + 12}px`,
              }}
            >
              <NavigationForm
                onSubmit={onSubmit}
                navigationItem={item}
                onCancel={onCancel}
              />
            </div>
          )}
          <NavigationList
            items={item.children ?? []}
            level={level + 1}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
