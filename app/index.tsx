import { useCards } from "@/domain/cards/CardsContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function IndexScreen() {
  const router = useRouter();
  const { cards } = useCards();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cards</Text>

      <FlatList
        data={cards ?? []}
        keyExtractor={(item) => String(item.id)} // it's a string, but to be safe
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/cards/${item.id}`)}
            style={styles.cardItem}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
          </Pressable>
        )}
      />
      
      {/* Add Card Button - Fixed at bottom right */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/cards/create")}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    position: "relative"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16
  },
  cardItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  cardTitle: {
    fontSize: 18
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  }
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
