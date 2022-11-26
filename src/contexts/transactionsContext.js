import React, { createContext } from "react";

export const TransactionContext = createContext({});

export default function TransactionProvider({ children }) {
  return (
    <TransactionContext.Provider value={{ transaction: "hello" }}>
      {children}
    </TransactionContext.Provider>
  );
}
