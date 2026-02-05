import { useCardsStore } from "@/cards/cards.store";
import CardView from "@/components/CardView";
import { useLocalSearchParams } from "expo-router";

export default function CardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCardById } = useCardsStore();

  if (!id) {
    return <Text>Missing card id.</Text>;
  }

  const card = getCardById(id);

  if (!card) {
    return <Text>Card not found.</Text>;
  }

  return <CardView card={card} />;
}
