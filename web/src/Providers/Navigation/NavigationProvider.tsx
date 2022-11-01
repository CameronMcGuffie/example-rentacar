import React, { createContext, useContext, useState } from 'react';

interface NavigationContextProps {
  currentPage: string;
  selectPage(page: string): void;
}

type Props = {
  children?: React.ReactNode;
};

export const NavigationContext = createContext<NavigationContextProps>({
  currentPage: '',
  selectPage(page: string) {},
});

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within PageContext');
  }

  return context;
};

export default function NavigationProvider({ children }: Props) {
  const [currentPage, setCurrentPage] = useState('');

  function selectPage(page: string) {
    setCurrentPage(page);
  }

  return (
    <NavigationContext.Provider value={{ currentPage, selectPage }}>
      {children}
    </NavigationContext.Provider>
  );
}
