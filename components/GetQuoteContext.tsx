"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import GetQuoteModal from "./GetQuoteModal";

const UNLOCK_KEY = "amaya-quote-unlocked";

type GetQuoteContextValue = {
  /** True once the visitor has verified their number once this session — prices stay visible for every unit after that, not just the one they first asked about. */
  unlocked: boolean;
  openQuote: (residenceType: string) => void;
};

const GetQuoteContext = createContext<GetQuoteContextValue | null>(null);

export function useGetQuote() {
  const ctx = useContext(GetQuoteContext);
  if (!ctx) {
    throw new Error("useGetQuote must be used within GetQuoteProvider");
  }
  return ctx;
}

export default function GetQuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [residenceType, setResidenceType] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — just re-verify each visit.
    }
  }, []);

  const openQuote = useCallback(
    (type: string) => {
      if (unlocked) return;
      setResidenceType(type);
      setIsOpen(true);
    },
    [unlocked]
  );

  const close = useCallback(() => setIsOpen(false), []);

  const handleUnlocked = useCallback(() => {
    setUnlocked(true);
    setIsOpen(false);
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      // Non-fatal — worst case they verify again next time they click.
    }
  }, []);

  return (
    <GetQuoteContext.Provider value={{ unlocked, openQuote }}>
      {children}
      <GetQuoteModal
        isOpen={isOpen}
        residenceType={residenceType}
        onClose={close}
        onUnlocked={handleUnlocked}
      />
    </GetQuoteContext.Provider>
  );
}
