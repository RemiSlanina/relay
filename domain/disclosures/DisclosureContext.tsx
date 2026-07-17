/**
 * Represents the context for an optional disclosure the user can show
 * f.e.: "I am autistic." or "I have a health condition"
 *
 * returns a context provider and use disclosure
 */

import { createContext, useContext, useEffect, useState } from "react";
import { Disclosure } from "./Disclosure";
import { DisclosureStorage } from "./disclosure.storage";
import { initializeDisclosures } from "./disclosures.import";

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
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Init Disclosures on mount
  useEffect(() => {
    const loadDisclosures = async () => {
      const initializedDisclosures = await initializeDisclosures();
      console.log(
        "inside DisclosureProvider useEffect, just called initializeDisclosures",
      );
      console.log(`initialized disclosures `, initializedDisclosures);

      setDisclosures(initializedDisclosures);
      setLoaded(true);
    };

    loadDisclosures();
  }, []);

  // useEffect(() => {
  //   const clear = async () => {
  //     await AsyncStorage.clear();
  //     console.log("AsyncStorage cleared");
  //     await AsyncStorage.clear();

  //     const keys = await AsyncStorage.getAllKeys();
  //     console.log("keys after clear:", keys);
  //   };

  //   clear();
  // }, []);

  // Automatically persist cards whenever they change (after initial load).
  useEffect(() => {
    if (!loaded) return;
    if (disclosures.length === 0) return;

    console.log("disclosures inside useEffect: ", disclosures);

    const persistDisclosures = async () => {
      setHasUnsavedChanges(true);
      try {
        const ok = await DisclosureStorage.saveDisclosures(disclosures);

        if (!ok) {
          console.error("saveDisclosures reported a failure.");
          setPersistenceError("Could not save changes");
        } else {
          setPersistenceError(null);
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        console.error("saveDisclosures threw: ", error);
        setPersistenceError("Could not save changes.");
      }
    };
    persistDisclosures();
  }, [disclosures, loaded]);

  function getDisclosureById(id: string) {
    return disclosures.find((discl) => discl.id === id);
  }
  function addDisclosure(disclosure: Disclosure) {
    setDisclosures((prev) => [...prev, disclosure]);
  }
  function deleteDisclosure(disclossureId: string) {
    setDisclosures((prev) => prev.filter((d) => d.id === disclossureId));
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
