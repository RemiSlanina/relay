import { useCards } from "@/domain/cards/CardsContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const { cards } = useCards();
  return (
    <View style={styles.container}>
      <Text>Cards</Text>

      <FlatList
        data={cards ?? []}
        keyExtractor={(item) => String(item.id)} // it's a string, but to be safe
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/cards/${item.id}`)}
            style={{ paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, borderBottomWidth: 1, borderColor: "#ccc" },
});

// ScrollView: (don't forget IMPORT!)
// export default function IndexScreen() {
//   const router = useRouter();
//   const { cards } = useCards();

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text>Cards</Text>
//       {cards.map((card) => (
//         <Pressable
//           key={card.id}
//           onPress={() => router.push(`/cards/${card.id}`)}
//           style={{ paddingVertical: 12 }}
//         >
//           <Text style={{ fontSize: 18 }}>{card.title}</Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );
// }
