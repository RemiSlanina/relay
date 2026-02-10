import CardView from "@/components/CardView";
import { useCards } from "@/domain/cards/CardsContext";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";

export default function CardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCardById } = useCards();

  if (!id) {
    return <Text>Missing card id.</Text>;
  }

  const card = getCardById(id);

  if (!card) {
    return <Text>Card not found.</Text>;
  }

  return <CardView card={card} />;
}
