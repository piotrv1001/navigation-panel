import { NavigationItem } from "@/types/navigation-item";
import React from "react";
import NavigationItemCard from "./navigation-item-card";
import NavigationForm, { NavigationFormData } from "./navigation-form";

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
            <>
              <NavigationItemCard navigationItem={item} level={level} />
            </>
          ) : (
            <div
              style={{
                marginLeft: `${level * 16}px`,
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
