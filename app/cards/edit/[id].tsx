import CardForm from "@/components/CardForm";
import { Colors } from "@/constants/theme";
import { useCards } from "@/domain/cards/CardsContext";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Text, useColorScheme } from "react-native";

export default function EditCardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCardById } = useCards();
  const navigation = useNavigation();
  const router = useRouter();
  const { updateCard } = useCards();
  const { disclosures } = useDisclosure();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const card = id ? getCardById(id) : null;

  // const [title, setTitle] = useState("");
  // const [message, setMessage] = useState("");

  const [selectedDisclosureId, setSelectedDisclosureId] = useState<
    string | null
  >(null);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  // const { settings } = useAccessibility();

  // Use motion setting from accessibility context
  // const shouldAnimate = settings.motion !== "none";

  const getDisclosureText = () => {
    if (!selectedDisclosureId) return "None";
    const disclosure = disclosures.find((d) => d.id === selectedDisclosureId);
    return disclosure ? disclosure.text : "None";
  };

  useLayoutEffect(() => {
    if (card) {
      navigation.setOptions({ title: card.title });
    }
  }, [card, navigation]);

  if (!id) {
    return <Text>Missing card id.</Text>;
  }

  if (!card) {
    return <Text>Card not found.</Text>;
  }
  return (
    <CardForm
      initialValues={{
        title: card.title,
        message: card.message,
      }}
      onCancel={() => router.back()}
      onSubmit={(values) => {
        console.log(values);

        updateCard({
          ...card,
          ...values,
          lastEditedAt: new Date().toISOString(),
        });
        // console.log(getCardById(card.id)?.lastEditedAt);
        router.back();
      }}
    />
  );
}
