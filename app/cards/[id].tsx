import CardView from "@/components/CardView";
import { useCards } from "@/domain/cards/CardsContext";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function CardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCardById } = useCards();
  const navigation = useNavigation();

  const card = id ? getCardById(id) : null;

  // Set the navigation title to the card's title
  useLayoutEffect(() => {
    if (card) {
      navigation.setOptions({ title: card.title });
    }
    // navigation.setOptions({ title: card.title });
  }, [card, navigation]);

  if (!id) {
    return <Text>Missing card id.</Text>;
  }

  if (!card) {
    return <Text>Card not found.</Text>;
  }

  return <CardView card={card} />;
}
