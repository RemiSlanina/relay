import CardView from "@/components/CardView";
import { DUMMY_CARDS } from "@/constants/cards";
import { useLocalSearchParams } from "expo-router";

export default function CardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const card = DUMMY_CARDS.find((c) => c.id == id);

  if (!card) {
    return <Text>Card not found.</Text>;
  }
  return <CardView card={card}></CardView>;
}
