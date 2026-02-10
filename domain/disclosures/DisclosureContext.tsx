import { createContext, useContext, useState } from "react";
import { Disclosure } from "./Disclosure";
import { DISCLOSURE_TEMPLATES } from "./disclosure.templates";

type DisclosureValue = {
  disclosures: Disclosure[];
  getDisclosureById: (id: string) => Disclosure | undefined;
};

const DisclosureContext = createContext<DisclosureValue | null>(null);

export function DisclosureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [disclosures] = useState<Disclosure[]>(DISCLOSURE_TEMPLATES);

  function getDisclosureById(id: string) {
    return disclosures.find((discl) => discl.id === id);
  }

  return (
    <DisclosureContext.Provider value={{ disclosures, getDisclosureById }}>
      {children}
    </DisclosureContext.Provider>
  );
}

export function useDisclosure() {
  const ctx = useContext(DisclosureContext);
  if (!ctx) {
    throw new Error("useDisclosure must be used inside DisclosureProvider");
  }
  return ctx;
}
