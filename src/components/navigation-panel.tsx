"use client";

import { NavigationItem } from "@/types/navigation-item";
import { NavigationResult } from "./navigation-form";
import NoDataPlaceholder from "./no-data-placeholder";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NavigationList from "./navigation-list";
import { NavigationProvider } from "@/contexts/navigation-context";
import CardWrapper from "./card-wrapper";
import { Button } from "./ui/button";

const findElement = (
  items: NavigationItem[],
  id: string
): NavigationItem | null => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findElement(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const findParent = (
  items: NavigationItem[],
  id: string
): NavigationItem | null => {
  for (const item of items) {
    if (item.children) {
      const found = item.children.find((child) => child.id === id);
      if (found) {
        return item;
      }
      const parent = findParent(item.children, id);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
};

export default function NavigationPanel() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  const handleFormSubmit = (data: NavigationResult) => {
    if (!data.id) return;
    const element = findElement(navigationItems, data.id);
    if (element) {
      element.type = "item";
      element.name = data.name;
      element.link = data.link;
      setNavigationItems((prev) => [...prev]);
    }
  };

  const handleEditNavigationItem = (id: string) => {
    const element = findElement(navigationItems, id);
    if (element) {
      element.type = "form";
      setNavigationItems((prev) => [...prev]);
    }
  };

  const handleDeleteNavigationItem = (id: string) => {
    const parent = findParent(navigationItems, id);
    if (parent) {
      parent.children = parent.children?.filter((child) => child.id !== id);
      setNavigationItems((prev) => [...prev]);
    } else {
      setNavigationItems(navigationItems.filter((item) => item.id !== id));
    }
  };

  const handleAddNavigationItem = (parentId: string) => {
    const parent = findElement(navigationItems, parentId);
    if (parent) {
      parent.children = parent.children ?? [];
      parent.children.push({ id: uuidv4(), type: "form", name: "", link: "" });
      setNavigationItems((prev) => [...prev]);
      return;
    }
    setNavigationItems((prev) => [
      ...prev,
      { id: uuidv4(), type: "form", name: "", link: "" },
    ]);
  };

  const handleAddRootLevelNavigationItem = () => {
    const containsForm = navigationItems.some(
      (item) => item.type === "form" && !item.name
    );
    if (containsForm) return;
    setNavigationItems((prev) => [
      ...prev,
      { id: uuidv4(), type: "form", name: "", link: "" },
    ]);
  };

  const handleCancelForm = (id: string) => {
    const element = findElement(navigationItems, id);
    if (element) {
      if (element.type === "form" && !element.name) {
        handleDeleteNavigationItem(id);
      } else {
        element.type = "item";
        setNavigationItems((prev) => [...prev]);
      }
    }
  };

  const handleAddFirstMenuItem = () => {
    setNavigationItems([{ id: uuidv4(), type: "form", name: "", link: "" }]);
  };

  const handlers = {
    onEditClick: handleEditNavigationItem,
    onDeleteClick: handleDeleteNavigationItem,
    onAddMenuItemClick: handleAddNavigationItem,
  };

  const containsOnlyEmptyForms = navigationItems.every(
    (item) => item.type === "form" && !item.name
  );

  const showNoDataPlaceholder =
    navigationItems.length === 0 || containsOnlyEmptyForms;

  const showAddRootLevelNavigationItemButton =
    navigationItems.length > 0 && !containsOnlyEmptyForms;

  return (
    <NavigationProvider handlers={handlers}>
      <div className="p-3 space-y-4">
        {showNoDataPlaceholder && (
          <NoDataPlaceholder onAddMenuItemClick={handleAddFirstMenuItem} />
        )}
        {navigationItems.length > 0 && (
          <CardWrapper className="overflow-hidden">
            <NavigationList
              items={navigationItems}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
            />
            {showAddRootLevelNavigationItemButton && (
              <div className="py-5 px-6 bg-[#f5f5f5]">
                <Button
                  variant="outline"
                  onClick={handleAddRootLevelNavigationItem}
                >
                  Dodaj pozycję menu
                </Button>
              </div>
            )}
          </CardWrapper>
        )}
      </div>
    </NavigationProvider>
  );
}
