"use client";

import { ImageInterface } from "@/interfaces/Image";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type DataContextType = {
  dockerVersion: string | "";
  setDockerVersion: (dockerVersion: string | "") => void;
  imageArr:ImageInterface[];
  setImageArr:Dispatch<SetStateAction<ImageInterface[] | []>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dockerVersion, setDockerVersion] = useState<string | "">("");
  const [imageArr, setImageArr] = useState<[] | ImageInterface[]>([]);

  return (
    <DataContext.Provider value={{ dockerVersion, setDockerVersion,imageArr, setImageArr }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
