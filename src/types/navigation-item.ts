export type NavigationItem = {
  id: string;
  name: string;
  link: string;
  type: "item" | "form";
  children?: NavigationItem[];
};
