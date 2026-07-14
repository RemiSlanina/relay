/**
 * Represents the context for an optional disclosure the user can show
 * f.e.: "I am autistic." or "I have a health condition"
 *
 * returns a context provider and use disclosure
 */

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

// if I wanted to update the original array, i would do it like this:
//
// const [disclosures, setDisclosures] = useState<Disclosure[]>(DISCLOSURE_TEMPLATES);

// // Add a new disclosure
// const addDisclosure = (newDisclosure: Disclosure) => {
//   setDisclosures([...disclosures, newDisclosure]);
// };

// however, i want to save any updates in storage. i actually will want to modify my app later on:
// the original array of templates should only be shown upon shipping to let the users decide which templates to keep
// the items in the storage will then be loaded upon startup, and the templates will still be accessible in the background
// (in case the users decide to use some of the templates later)
