import { createContext, useContext } from "react";

const NavigationContext = createContext<Handlers | null>(null);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

type Handlers = {
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onAddMenuItemClick: (id: string) => void;
};

type NavigationProviderProps = {
  children: React.ReactNode;
  handlers: Handlers;
};

export const NavigationProvider = ({
  children,
  handlers,
}: NavigationProviderProps) => (
  <NavigationContext.Provider value={handlers}>
    {children}
  </NavigationContext.Provider>
);
