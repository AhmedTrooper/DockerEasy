"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DataContextType = {
  dockerVersion: string | "";
  setDockerVersion: (dockerVersion: string | "") => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dockerVersion, setDockerVersion] = useState<string | "">("");

  return (
    <DataContext.Provider value={{ dockerVersion, setDockerVersion }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
