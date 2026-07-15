import CardForm from "@/components/CardForm";
import { Colors } from "@/constants/theme";
import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";
import { Card, useCards, QuickAccessPolicy, SharingPolicy } from "@/domain/cards";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useColorScheme } from "react-native";

export default function CreateCardScreen() {
  const router = useRouter();
  const { addCard } = useCards();
  const { disclosures } = useDisclosure();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDisclosureId, setSelectedDisclosureId] = useState<
    string | null
  >(null);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  const { settings } = useAccessibility();

  // Use motion setting from accessibility context
  const shouldAnimate = settings.motion !== "none";

  // const handleSave = () => {
  //   if (!title.trim() || !message.trim()) {
  //     alert("Please fill in both title and message");
  //     return;
  //   }

  //   // const newCard: Card = {
  //   //   id:
  //   //     "usr:" +
  //   //     Math.random().toString(36).substring(2, 15) +
  //   //     Math.random().toString(36).substring(2, 15),
  //   //   category: "support", // default category
  //   //   priority: 0, // default priority
  //   //   lang: "en", // default language
  //   //   title: title.trim(),
  //   //   disclosureIds: selectedDisclosureId ? [selectedDisclosureId] : [],
  //   //   message: message.trim(),
  //   //   sharing: SharingPolicy.INHERIT, // default sharing policy
  //   //   quickAccess: QuickAccessPolicy.INHERIT, // default quick access
  //   //   source: "user", // mark as user-created // maybe refactor this property later
  //   //   lastEditedAt: new Date().toISOString(),
  //   //   intent: "",
  //   //   tone: "neutral",
  //   //   list: [],
  //   //   media: [],
  //   // };

  //   // addCard(newCard);
  //   // router.back();
  // };

  const getDisclosureText = () => {
    if (!selectedDisclosureId) return "None";
    const disclosure = disclosures.find((d) => d.id === selectedDisclosureId);
    return disclosure ? disclosure.text : "None";
  };

  return (
    <CardForm
      onCancel={() => router.back()}
      onSubmit={(values) => {
        console.log(values);

        const newCard: Card = {
          id:
            "usr:" +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          category: "support", // default category
          priority: 0, // default priority
          lang: "en", // default language
          title: values.title.trim(),
          disclosureIds: selectedDisclosureId ? [selectedDisclosureId] : [],
          message: values.message.trim(),
          sharing: SharingPolicy.INHERIT, // default sharing policy
          quickAccess: QuickAccessPolicy.INHERIT, // default quick access
          source: "user", // mark as user-created // maybe refactor this property later
          lastEditedAt: new Date().toISOString(),
          intent: "",
          tone: "neutral",
          list: [],
          media: [],
        };

        addCard(newCard);
        // console.log(newCard.lastEditedAt);
        router.back();
      }}
    />
  );
}
