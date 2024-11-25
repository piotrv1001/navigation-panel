"use client";

import { NavigationItem } from "@/types/navigation-item";
import CardWrapper from "./card-wrapper";
import NavigationForm, { NavigationFormData } from "./navigation-form";
import NoDataPlaceholder from "./no-data-placeholder";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NavigationItemCard from "./navigation-item-card";

export default function NavigationPanel() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<NavigationItem | null>(null);

  const handleFormSubmit = (data: NavigationFormData) => {
    if (selectedNavigationItem) {
      setNavigationItems((prev) =>
        prev.map((item) =>
          item.id === selectedNavigationItem.id
            ? {
                id: item.id,
                ...data,
              }
            : item
        )
      );
    } else {
      const id = uuidv4();
      const newItem = { ...data, id };
      setNavigationItems((prev) => [...prev, newItem]);
    }
    setSelectedNavigationItem(null);
  };

  const handleEditNavigationItem = (id: string) => {
    const item = navigationItems.find((item) => item.id === id);
    if (item) {
      setSelectedNavigationItem(item);
    }
  };

  const handleDeleteNavigationItem = (id: string) => {
    setNavigationItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddNavigationItem = () => {
    // TODO
  };

  return (
    <div className="p-3 space-y-4">
      <NoDataPlaceholder onAddMenuItemClick={() => console.log("click")} />
      <CardWrapper>
        {selectedNavigationItem ? (
          <NavigationForm
            key="edit"
            onSubmit={handleFormSubmit}
            navigationItem={selectedNavigationItem}
          />
        ) : (
          <NavigationForm key="add" onSubmit={handleFormSubmit} />
        )}
      </CardWrapper>
      {navigationItems.map((item) => (
        <NavigationItemCard
          key={item.id}
          navigationItem={item}
          onAddMenuItemClick={handleAddNavigationItem}
          onEditClick={() => handleEditNavigationItem(item.id)}
          onDeleteClick={() => handleDeleteNavigationItem(item.id)}
        />
      ))}
    </div>
  );
}
