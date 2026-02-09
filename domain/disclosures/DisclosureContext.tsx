import { createContext, useContext, useState } from "react";
import { Disclosure } from "./Disclosure";
import { DISCLOSURE_TEMPLATES } from "./disclosure.templates";

type DisclosureStoreValue = {
  disclosures: Disclosure[];
  getDisclosureById: (id: string) => Disclosure | undefined;
};

const DisclosureStoreContext = createContext<DisclosureStoreValue | null>(null);

export function DisclosureStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [disclosures] = useState<Disclosure[]>(DISCLOSURE_TEMPLATES);

  function getDisclosureById(id: string) {
    return disclosures.find((discl) => discl.id === id);
  }

  return (
    <DisclosureStoreContext.Provider value={{ disclosures, getDisclosureById }}>
      {children}
    </DisclosureStoreContext.Provider>
  );
}

export function useDisclosureStore() {
  const ctx = useContext(DisclosureStoreContext);
  if (!ctx) {
    throw new Error(
      "useDisclosureStore must be used inside DisclosureStoreProvider",
    );
  }
  return ctx;
}
