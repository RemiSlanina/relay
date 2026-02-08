import { useCardsStore } from "@/cards/cards.store";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const { cards } = useCardsStore();
  return (
    <View style={styles.container}>
      <Text>Cards</Text>
      {cards.map(
        // templates on first call -> add user cards later!!
        (card) => (
          <Pressable
            key={card.id}
            onPress={() => router.push(`/cards/${card.id}`)}
            // onPress={() => router.push(`/card?id=${card.id}`)} //f.erouter.push("/card?id=finding-tickets-en")
            style={{ paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 18 }}>{card.title}</Text>
          </Pressable>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, borderBottomWidth: 1, borderColor: "#ccc" },
});
